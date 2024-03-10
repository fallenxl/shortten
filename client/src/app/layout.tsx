"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AxiosInterceptor } from "@/interceptors";
import { AuthGuard } from "@/guards/auth.guard";
import { Toaster } from "@/components/ui/toaster";
AxiosInterceptor();
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AuthGuard>
            {children}
            <Toaster />
            </AuthGuard>
        </Provider>
      </body>
    </html>
  );
}
