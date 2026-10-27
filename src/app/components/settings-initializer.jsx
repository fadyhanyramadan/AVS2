"use client";

import { useSiteSettings } from "@/stores/site-setting";
import { useEffect } from "react";

export default function SettingsInitializer({ initialSettings }) {
  const setSettings = useSiteSettings((state) => state.setSiteSettings);

  useEffect(() => {
    if (initialSettings) setSettings(initialSettings);
  }, [initialSettings, setSettings]);

  return null;
}