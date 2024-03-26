import type { Metadata } from "next";
import { Antic_Didone } from "next/font/google";
import "./globals.css";
import Cursor from "#/components/Cursor";

const font = Antic_Didone({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Home",
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
    <html lang="en">
      <body className={font.className}>
        {children}
        <Cursor />
      </body>
    </html>
  );
}
