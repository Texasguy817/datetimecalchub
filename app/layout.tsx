import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TimeCalcHub",
  description: "Free time calculators",
  verification: {
    google: "WZgEyeBvp6G7iehCeTK41MP_Zq3gKgAOTNwGLjdlHFU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



  
  
  
  
    


  
  



    
    


