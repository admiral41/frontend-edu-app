import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "PadhaiHub - Nepal's #1 Online Learning Platform",
  description: "Quality education for SEE and +2 students across Nepal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
