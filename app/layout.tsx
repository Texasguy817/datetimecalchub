import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://datetimecalchub.com"),
  title: { default: "TimeCalcHub", template: "%s | TimeCalcHub" },
  description: "Time and date calculators, countdown tools, work-hour tools, and sleep calculators built for fast answers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
