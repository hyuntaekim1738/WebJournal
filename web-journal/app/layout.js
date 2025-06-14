import { Share_Tech } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Providers from "./providers";

const shareTech = Share_Tech({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
  display: 'swap'
});

export const metadata = {
  title: "WebJournal",
  description: "Write journal entries!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${shareTech.variable} antialiased`}
      >
        <Providers>
          <NavBar />
          <main className="pt-20">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
