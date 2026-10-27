"use client";
import { Link } from "@/i18n/navigation";
import { useSiteSettings } from "@/stores/site-setting";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default  function ContactBtn() {
    const t = useTranslations("home");
    const {siteSettings} = useSiteSettings();
    const whatsappNumber = siteSettings?.phone_contact;

  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  return (
    <div>
      <Link
        href="/contact"
        className=" max-lg:m-auto w-fit flex items-center justify-center gap-2 bg-main rounded-full  text-sm px-5 py-3 hover:gap-3 duration-300 transition-all "
      >
        <FaPhoneAlt className=" text-sm" />
        {t("btn")}
      </Link>
    </div>
  );
}
