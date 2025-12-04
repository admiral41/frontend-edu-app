import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AlertDialogProvider } from "@/components/ui/alert-dialog-provider";

export const metadata = {
  title: "PadhaiHub - Nepal's #1 Online Learning Platform",
  description: "Quality education for SEE and +2 students across Nepal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <AlertDialogProvider>
          {children}
          <Toaster />
        </AlertDialogProvider>
      </body>
    </html>
  );
}
