import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { themeInitScript } from "@/lib/theme";

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "مبادرة تعليمية ومجتمعية ضمن برنامج التطوع والشراكة المجتمعية «لنبادر» بمحافظة جدة، تنمّي وعي الأطفال واليافعين بالبيئة البحرية وتعزز مشاركتهم في حماية البحر الأحمر وشعابه المرجانية.";

export const metadata: Metadata = {
  metadataBase: new URL("https://eyesonsea.mermates.club"),
  title: "عينك على البحر | Eyes on the Sea",
  description,
  keywords: ["عينك على البحر", "لنبادر", "محافظة جدة", "الشعاب المرجانية", "البحر الأحمر", "التطوع البيئي", "العلوم المجتمعية", "استزراع المرجان"],
  openGraph: {
    title: "عينك على البحر",
    description,
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    type: "website",
    images: [{ url: "/photos/hero-beach-group.jpg", width: 1600, height: 900 }],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
