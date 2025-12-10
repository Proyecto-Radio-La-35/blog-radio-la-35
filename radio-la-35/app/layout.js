import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BarraNavegacion from "./components/BarraNavegacion";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Radio La 35",
  description: "Sitio web de la radio de la Escuela Técnica N° 35",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BarraNavegacion />
        {children}
        <Footer />
      </body>
    </html>
  );
}
