import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AllPageList from "@/components/AllPageList";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`px-2.5 sm:px-8 md:px-10 lg:px-16 min-h-screen  ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <div className="sm:hidden block">

          <AllPageList />
          </div>
          <main className='flex-grow'>{children}</main>
        </div>
      </body>
    </html>
  );
}
