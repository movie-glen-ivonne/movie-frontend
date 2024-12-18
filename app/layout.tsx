import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext"
import NavBar from './components/NavBar'
import 'swiper/css';
import { Toaster } from "sonner";
 
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "HAUSFLIX",
  description: "Movie management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <MovieProvider>
            <NavBar />
            {children}
            <Toaster />
          </MovieProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
