"use client"
import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useEmail } from "@/stores/email-store";
import { getData } from "@/api/fetch-data";

export default function Social() {
    const {setSiteEmail} = useEmail();
    const [socials, setSocials] = useState([]);

    // Map social media names to their icons
    const socialIcons = {
        "Facebook": FaFacebookF,
        "Instagram": FaInstagram,
        "LinkedIn": FaLinkedinIn,
        "YouTube": FaYoutube,
        "X ": BsTwitterX, // with space
    };

    function formatUrl(url) {
        if (!url) return '';
        // If it already has http:// or https://, return as is
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        // If it starts with www. or a domain, add https://
        if (url.startsWith('www.') || url.includes('.')) return `https://${url}`;
        return url;
    }

    async function getSocials() {
        const res = await getData({ url: "/social-media" })
        if(res?.code === 200 && res?.data?.data) {
            // Process all social media items
            const socialData = res?.data?.data.map(social => {
                const isEmail = social.name === 'Gmail' || social.url?.includes('@');
                const processedUrl = isEmail 
                    ? social.url.replace(/^mailto:/i, '')
                    : formatUrl(social.url);
                
                // If it's an email, set it using setSiteEmail
                if (isEmail && processedUrl) {
                    setSiteEmail(processedUrl);
                }
                
                return {
                    ...social,
                    isEmail,
                    url: processedUrl
                };
            });
            
            setSocials(socialData);
        } else {
            setSocials([]);
        }
    }
    
    useEffect(() => {
        getSocials();
    }, []);
    
    return (
        <div className="flex items-center gap-4">
            {socials?.map((social) => {
                const Icon = socialIcons[social.name];
                
                // Only render if icon exists and URL is available
                if (!Icon || !social.url) return null;
                
                return social.isEmail ? (
                    <div key={social.id} className="flex items-center gap-2">
                        <Icon className="text-main size-6" />
                        <span>{social.url}</span>
                    </div>
                ) : (
                    <a 
                        key={social.id} 
                        href={social.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                    >
                        <Icon className="text-main size-6 hover:scale-110 transition-all duration-300" />
                    </a>
                );
            })}
        </div>
    )
}