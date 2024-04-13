import type { Metadata } from "next";
import localFont from "next/font/local";
import Cursor from "#/components/Cursor";

import "./globals.css";
import { cn } from "#/lib/utils";
import { TailwindIndicator } from "#/components/TailwindIndicator";

const font = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Bold.otf",
      weight: "bold",
    },
    {
      path: "../public/fonts/Satoshi-Regular.otf",
      weight: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.otf",
    },
  ],
});
export const metadata: Metadata = {
  title: {
    default: "Ayo, I'm Folk!",
    template: `%s | folkmoz`,
  },
  description: "Jirantanapat Kaeosomboon's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          font.className,
          "relative flex min-h-screen flex-col overflow-x-hidden",
        )}
      >
        {children}
        <Cursor />
        <TailwindIndicator />
      </body>
    </html>
  );
}
