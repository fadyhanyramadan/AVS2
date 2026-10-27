"use client";
import { Link } from "@/i18n/navigation";
import { useEmail } from "@/stores/email-store";
import { useSiteSettings } from "@/stores/site-setting";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import Social from "./social";

function Footer() {
  const t = useTranslations('footer');
  const { siteEmail } = useEmail();
  const { siteSettings } = useSiteSettings();

  return (
    <div className=" bg-light-black  text-gray-400 ">
      <div className=" container p-10    space-y-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-baseline gap-4">
        {/* our definition */}
        <div className=" space-y-4">
          <div>
            <Link href={"/"}>
              <Image
                className=" object-contain w-2/5"
                src={siteSettings?.site_logo || "/assets/footer.png"}
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          {/* <p className=" font-bold text-main text-2xl">Audio Video System</p> */}
          <p className=" w-3/4">{siteSettings?.site_description || ""}</p>
          <Social />
        </div>

        {/* contact */}
        <div className=" space-y-4">
          <p className="capitalize font-bold text-main text-2xl">
            {t('getInTouch')}
          </p>

          <span
            className=" flex items-center gap-2 text-sm hover:gap-3  transition-all duration-300"
          >
            <IoLocation className="  text-main size-5" />
            {siteSettings?.site_address || ""}
          </span>
          {siteEmail && (
            <p
              className="  flex items-center gap-2 "
            >
              <FaEnvelope className=" text-main " />
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteEmail)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-main transition-colors duration-300"
              >
                {siteEmail || ""}
              </a>
            </p>
          )}
          {siteSettings?.phone_contact && (
            <div
              className="  flex items-center gap-2"
            >
              <p className=" flex items-center gap-2 text-main text-xs">
                <FaPhoneAlt />
                {t('contactUs')}
              </p>
              {siteSettings?.phone_contact || ""}
            </div>
          )}
          {siteSettings?.phone_order && (
            <div
              className=" flex items-center gap-2"
            >
              <p className=" flex items-center gap-2 text-main text-xs">
                <FaPhoneAlt />
                {t('contactForOrder')}{" "}
              </p>
              {siteSettings?.phone_order || ""}
            </div>
          )}
          {siteSettings?.phone_project && (
            <div
              className=" flex items-center gap-2"
            >
              <p className=" flex items-center gap-2 text-main text-xs">
                <FaPhoneAlt />
                {t('contactForProject')}
              </p>
              {siteSettings?.phone_project || ""}
            </div>
          )}

        </div>

        {/* links */}
        <div className=" space-y-4">
          <div>
            <p className="capitalize font-bold text-main text-2xl">
              {t('importantLinks')}
            </p>
          </div>
          <div className=" flex  gap-8">
            <div className=" capitalize space-y-4 flex flex-col">
              <Link
                className=" hover:text-main transition-all duration-300"
                href="/"
              >
                {t('home')}
              </Link>
              <Link
                className=" hover:text-main transition-all duration-300"
                href="/aboutus"
              >
                {t('about')}
              </Link>
              <Link
                className=" hover:text-main transition-all duration-300"
                href="/blogs"
              >
                {t('blogs')}
              </Link>
              <Link
                className=" hover:text-main transition-all duration-300"
                href="/contact"
              >
                {t('contact')}
              </Link>
            </div>
            <div className=" capitalize space-y-4 flex flex-col">
              <Link
                className=" hover:text-main transition-all duration-300"
                href="/products"
              >
                {t('products')}
              </Link>
              <Link
                className=" hover:text-main transition-all duration-300"
                href="/projects"
              >
                {t('projects')}
              </Link>
              <Link
                className=" hover:text-main transition-all duration-300"
                href="/cart"
              >
                {t('cart')}
              </Link>

            </div>
          </div>
        </div>
      </div>
      <div className=" container border-t border-main/50 py-6">
        <p className=" text-center text-sm">
          {" "}
          © 2025{" "}
          <Link href="/" className=" text-main font-bold">
            AVS
          </Link>
          . {t('rightsReserved')}
        </p>
      </div>
    </div>
  );
}

export default Footer;
