import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spendwise",
  description: "One Stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`${inter.className}`}>
    <Header/>
    <main className="min-h-screen">{children}</main>

    <footer className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Made with ❤ by Kopal Kotecha</p>
        </div>
    </footer>

    </body>
    </html>
  );
}
