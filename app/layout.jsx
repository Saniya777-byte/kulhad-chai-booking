import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { ToastProvider } from "@/components/toast";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";
export const metadata = {
  title: "Kulhad Chai - Restaurant Management",
  description: "QR code ordering system for Kulhad Chai restaurant - Order delicious chai and snacks with our easy-to-use QR menu",
  keywords: ["kulhad chai", "restaurant", "QR menu", "food ordering", "chai", "indian restaurant"],
  authors: [{
    name: "Kulhad Chai Restaurant"
  }],
  creator: "Kulhad Chai Restaurant",
  publisher: "Kulhad Chai Restaurant",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kulhad Chai"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kulhadchai.shop",
    title: "Kulhad Chai - Restaurant Management",
    description: "QR code ordering system for Kulhad Chai restaurant",
    siteName: "Kulhad Chai"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kulhad Chai - Restaurant Management",
    description: "QR code ordering system for Kulhad Chai restaurant"
  }
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [{
    media: "(prefers-color-scheme: light)",
    color: "#ea580c"
  }, {
    media: "(prefers-color-scheme: dark)",
    color: "#ea580c"
  }]
};
export default function RootLayout({
  children
}) {
  return <html lang="en">
      <head>
        {/* Additional mobile optimization meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kulhad Chai" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </ToastProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>;
}
