import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TITLE = "Furniro - Full stack e-commerce project.";
const DESCRIPTION =
  "Furniro is a full‑stack e‑commerce web application built with modern web technologies. It supports user authentication, product browsing with advanced filtering, cart and order management, and an admin dashboard for managing products and orders.";
const NAME = "Md Shakerullah Sourov";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: TITLE,
  description: DESCRIPTION,

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  creator: NAME,

  publisher: NAME,
};

export const viewport = {
  themeColor: "#b88e2f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
