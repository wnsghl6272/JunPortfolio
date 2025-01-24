import { Inter } from "next/font/google";
import "./globals.css";
import Sidenav from '@/components/Sidenav';
import ChatBot from "@/components/ChatBot";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dennis Cha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="font-mj w-full min-w-96 max-w-screen-xl min-h-screen mx-auto px-5 md:px-8 xl:px-20 flex flex-col xl:flex-row xl:gap-12 xl:items-start">
        <Sidenav />
        {children}
        </div>
      </body>
    </html>
  );
}
