import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import ReduxProvider from "@/components/common/ReduxProvider";
import UserInfoProvider from "@/components/common/UserInfoProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'MI-Kanchanaburi',
    template: '%s | MI-Kanchanaburi',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <UserInfoProvider>
            <ThemeRegistry>
              {children}
            </ThemeRegistry>
          </UserInfoProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
