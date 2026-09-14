import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const latin = Manrope({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "عينك على البحر | ورشة محاكاة استزراع المرجان والاستدامة البحرية",
  description:
    "برنامج تعليمي قائم على المحاكاة لتعريف الأطفال واليافعين بأهمية الشعاب المرجانية — A simulation-based marine education program for children and teens in Jeddah.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${latin.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
