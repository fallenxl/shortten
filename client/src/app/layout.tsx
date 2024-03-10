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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ShorttEn</title>
        <meta name="description" content="Shortten es un acortador de URL que te permite crear enlaces cortos y fáciles de compartir. Con Shortten, puedes reducir la longitud de tus URLs largas
         y obtener estadísticas sobre el uso de tus enlaces acortados. ¡Prueba Shortten hoy mismo para simplificar tus enlaces!"/>

      </head>
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
