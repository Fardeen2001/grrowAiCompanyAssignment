import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/Navbar";
import Providers from "@/Redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GRROW AI",
  description: "GRROW AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
