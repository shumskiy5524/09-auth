import "./globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}