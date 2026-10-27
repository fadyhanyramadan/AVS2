import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { getMessages } from 'next-intl/server';
import { Almarai, Poppins } from "next/font/google";
import BackToTop from '../components/backToTop';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { getData } from '@/api/fetch-data';
import SettingsInitializer from '../components/settings-initializer';
import { Toaster } from "@/components/ui/sonner"

export const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});


export async function generateMetadata({ params }) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const res = await getData({ url: "/site-settings" });
  const data = res?.code === 200 ? res?.data?.data : null;

  return {
    title: data?.site_name || "AVS",
    description: data?.site_description || "We provide creative digital solutions and professional services for our clients.",
    icons: {
      icon: data?.site_favicon || "/favicon.png",
    },
  };
}



export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 const res = await getData({ url: "/site-settings" });
  const data = res?.code === 200 ? res?.data?.data: null;

   const fontClass = locale === 'ar' ? almarai.className : poppins.className;
  return (
    <html lang={locale}>
      <body
         dir={locale === "ar" ? "rtl" : "ltr"}
        className={`${fontClass} antialiased bg-black `}
      >
        <NextIntlClientProvider messages={messages} locale={locale} >
                  <Toaster position="top-center" richColors expand={true} dir={locale === "ar" ? "rtl" : "ltr"}/>

          <SettingsInitializer initialSettings={data} />
          <Navbar/>
          {children}
          
          <BackToTop/>
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
