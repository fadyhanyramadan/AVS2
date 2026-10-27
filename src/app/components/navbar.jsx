// Navbar.jsx
"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BsCart3 } from "react-icons/bs";
import { useSiteSettings } from "@/stores/site-setting";
import { useCartStore } from "@/stores/cart-store";

function Navbar() {
  const {items} = useCartStore();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const { siteSettings } = useSiteSettings();
  const t = useTranslations('nav');
  const nextLocale = locale === "en" ? "ar" : "en";
  return (
    <motion.nav
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="lg:container fixed lg:top-4 top-0 right-0 left-0 z-50 bg-white lg:rounded-full shadow-xl py-2 md:ps-8 md:pe-2 px-4 pe-2 flex items-center justify-between text-black"
    >
      {/* logo */}
      <Link href="/" className="block">
        <Image className="object-contain " src={siteSettings?.site_logo||"/assets/logo.jpeg"} alt="logo" width={100} height={100} />
      </Link>

      {/* navs */}
      <ul
        className={`lg:flex flex-col lg:flex-row items-center gap-6 text-lg absolute lg:static max-lg:text-white max-lg:text-center bg-black lg:bg-transparent w-full lg:w-auto top-16 lg:top-auto left-0 lg:left-auto px-4 lg:px-0 py-6 lg:py-0 transition-all duration-300 ease-in-out max-lg:space-y-6 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <li>
          <Link
            href="/"
            className="capitalize font-semibold hover:text-main transition-all duration-300"
          >
            {t('home')}
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="capitalize font-semibold hover:text-main transition-all duration-300"
          >
            {t('products')}
          </Link>
        </li>
        <li>
          <Link
            href="/aboutus"
            className="capitalize font-semibold hover:text-main transition-all duration-300"
          >
            {t('aboutUs')}
          </Link>
        </li>

        <li>
          <Link
            href="/projects"
            className="capitalize font-semibold hover:text-main transition-all duration-300"
          >
            {t('projects')}
          </Link>
        </li>

        <li>
          <Link
            href="/blogs"
            className="capitalize font-semibold hover:text-main transition-all duration-300"
          >
            {t('blogs')}
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="capitalize font-semibold hover:text-main transition-all duration-300"
          >
            {t('contactUs')}
          </Link>
        </li>

      </ul>

      <div className="flex items-center gap-2">
        <Link href={"/cart"} className="text-white bg-main relative font-semibold border-2 border-transparent hover:border-main hover:bg-transparent hover:text-main transition-all duration-300 lg:size-12 size-10 rounded-md lg:rounded-full flex items-center justify-center ">
        <BsCart3 className=" text-lg" />
        <span className="absolute -top-1 -start-1 bg-white text-main text-xs rounded-full w-5 h-5 border border-main flex items-center justify-center">{items?.length || 0}</span></Link>
        <Link
          href={pathname}
          locale={nextLocale}
          className="text-white bg-main font-semibold border-2 border-transparent hover:border-main hover:bg-transparent hover:text-main transition-all duration-300 lg:size-12 size-10 rounded-md lg:rounded-full flex items-center justify-center px-3"
        >
          {t('languageToggle.' + nextLocale)}
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white bg-main font-semibold border-2 border-transparent cursor-pointer hover:border-main hover:bg-white hover:text-main transition-all duration-300 lg:size-12 size-10 rounded-md lg:rounded-full flex items-center justify-center"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
    </motion.nav>
  );
}

export default Navbar;
