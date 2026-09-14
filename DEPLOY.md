# Deployment plan — eyesonsea.mermates.club

Target: VPS `165.22.84.74` (Ubuntu 24.04, 2 vCPU / 7.8 GB RAM, 67 GB free, Docker 29 + Compose v5, host nginx + certbot).
Nothing on the VPS is changed by this plan except: one new directory, one new compose project, one new nginx vhost, one new certificate.

## What is already on the VPS (inspected 2026-09-14)

- **Reverse proxy:** host `nginx` on :80/:443, one vhost file per site in `/etc/nginx/sites-enabled/`, TLS via certbot in `/etc/letsencrypt/live/`.
- **Sibling site:** `liveaboard.mermates.club` → `dolphin-island-app` on `127.0.0.1:3010`. This plan copies its nginx pattern exactly.
- **Projects:** ~30 containers from 16 compose projects (`/root/<project>/`). Host ports in use:
  `3000 3002 3010 3030 3040 3050 3060 3061 4003 5004 5050 5056 5432 5433 5440 5555 5566 8000 8001 8011 8012 8080 8085 8090 8099 8443 8515 9000 9005 32773`.
- **DNS:** `eyesonsea.mermates.club` already exists, Cloudflare-proxied (same IPs as `liveaboard`). HTTPS currently returns **526** from Cloudflare = origin has no valid cert for the host. Once certbot issues one, it resolves.
- **Firewall:** `ufw` inactive. Docker publishes many ports on `0.0.0.0` — out of scope here, but noted.
- **SSH:** password root login, empty `authorized_keys`. Password was shared in chat → rotate it after setup (step 0).

## Isolation choices (why this cannot collide with other projects)

| Resource | Value | Why it's safe |
|---|---|---|
| Directory | `/root/eyesonsea/` | Does not exist; follows the `/root/<project>` convention. |
| Compose project / container | `eyesonsea` | No existing container or network uses this name. |
| Host port | `127.0.0.1:3070` | Not in the port list above. Localhost-only, so it is reachable only through nginx. |
| nginx vhost | `sites-available/eyesonsea.conf` | New file, new `server_name`; `nginx -t` is run before reload. |
| TLS cert | `/etc/letsencrypt/live/eyesonsea.mermates.club/` | Separate lineage; does not touch the 15 existing certs. |
| Docker network | `eyesonsea_default` (auto) | Compose-scoped bridge; no `network_mode: host`. |

## Steps

### 0. (Recommended) Key-based SSH, then rotate the password
```bash
# on your PC
ssh-keygen -t ed25519 -f ~/.ssh/eyesonsea_vps -N ""
type ~/.ssh/eyesonsea_vps.pub | plink -pw '<pw>' root@165.22.84.74 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
# on the VPS afterwards
passwd root
```

### 1. Ship the source
```bash
# on your PC, from the project folder (excludes node_modules/.next via .dockerignore-equivalent list)
tar --exclude=node_modules --exclude=.next --exclude=.git -czf eyesonsea.tgz .
scp -i ~/.ssh/eyesonsea_vps eyesonsea.tgz root@165.22.84.74:/root/
# on the VPS
mkdir -p /root/eyesonsea && tar -xzf /root/eyesonsea.tgz -C /root/eyesonsea && rm /root/eyesonsea.tgz
```
(Alternative: `git clone` if the repo is pushed somewhere.)

### 2. Set the admin key, then build and start the container
```bash
cd /root/eyesonsea
echo "ADMIN_KEY=$(openssl rand -hex 24)" > .env      # protects the CSV export
./deploy/deploy.sh
# expect: local :3070 -> 200
```
Form submissions are written to `/root/eyesonsea/data/submissions.jsonl` (Docker volume, survives rebuilds).
Export to Excel: `https://eyesonsea.mermates.club/api/submissions/export?key=<ADMIN_KEY>&kind=register` (or `kind=partnership`).

### 3. nginx vhost (HTTP only first, so certbot can validate)
```bash
cp /root/eyesonsea/deploy/nginx.eyesonsea.conf /etc/nginx/sites-available/eyesonsea.conf
# temporarily comment out the whole `server { listen 443 ... }` block (cert doesn't exist yet)
ln -s /etc/nginx/sites-available/eyesonsea.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 4. Certificate
```bash
certbot certonly --webroot -w /var/www/html -d eyesonsea.mermates.club
```
Cloudflare passes `/.well-known/acme-challenge/` over HTTP, which is how `liveaboard.mermates.club` got its cert on this box. Renewal is automatic via the existing certbot timer.

### 5. Enable HTTPS
Uncomment the 443 block, then:
```bash
nginx -t && systemctl reload nginx
curl -I https://eyesonsea.mermates.club   # expect 200 through Cloudflare
```

### 6. Verify nothing else moved
```bash
docker ps --format '{{.Names}}\t{{.Status}}' | grep -v eyesonsea | grep -vc Up   # 0 newly-down containers
curl -sI https://liveaboard.mermates.club | head -1                                # sibling still 200
```

## Updating later
```bash
# ship new source (step 1), then
cd /root/eyesonsea && ./deploy/deploy.sh
```
Zero nginx or cert changes needed for content updates.

## Rollback
```bash
cd /root/eyesonsea && docker compose down
rm /etc/nginx/sites-enabled/eyesonsea.conf && nginx -t && systemctl reload nginx
```
Leaves every other project untouched.

## Unrelated findings worth your attention (not part of this deploy)
- `sx.thetransformix.com` cert **expired** 2026-09-02; `nadeem.diomedea.ai` expires **today**; `qx2` in 18 days. Check `certbot renew --dry-run`.
- `nginx -t` warns: `dashboard.tafahom.thetransformix.com` is defined twice (one is ignored) and `go.thetransformix.com` has a duplicate vhost file.
- `docker system df`: 20 GB build cache (11.7 GB reclaimable) — `docker builder prune` would free it.
- `ufw` is inactive and many containers publish on `0.0.0.0` (Postgres 5433/5440/5056, pgAdmin 5555/5566, etc.) — those are reachable from the internet.
