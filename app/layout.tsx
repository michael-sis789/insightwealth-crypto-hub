import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/seo";

const noto = Noto_Sans_TC({ subsets: ["latin"], weight: ["400", "500", "700", "900"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: "/assets/channel_logo_512.png", apple: "/assets/channel_logo_512.png" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7206423892750616" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7206423892750616" crossOrigin="anonymous" />
      </head>
      <body className={noto.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-BBPEST0DDW" />
      </body>
    </html>
  );
}
