import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
  ClerkProvider,
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton
} from '@clerk/nextjs'
import Footer from "@/components/footer";
import LandingPage from "@/components/landing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskify - Task Management & Collaboration",
  description: "Manage Your Tasks, Projects & Collaborate With Team members All In One Place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <SignedIn>
              <Navbar />
              <div className="flex flex-row h-full">
                <Sidebar />
                {children}
              </div>
              <Footer />
            </SignedIn>

            <SignedOut>
              <LandingPage />
            </SignedOut>
          </body>
        </html>
    </ClerkProvider>
  );
}
