import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';


const montserrat = Montserrat({  
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "KaraOKE - La aplicacion #1 de karaoke",
  description: "La aplicacion #1 de karaoke",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased overflow-hidden h-screen`}
      >
        <NextTopLoader height={2} showSpinner={true} speed={800} color="rgb(16, 185, 129)" />
        {children}
      </body>
    </html>
  );
}
