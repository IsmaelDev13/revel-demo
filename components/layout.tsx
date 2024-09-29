import { Barlow } from "next/font/google";
import { ReactNode } from "react";
import Header from "./Header";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <>
      <main className={barlow.className}>
        <Header />
        {children}
      </main>
    </>
  );
}
