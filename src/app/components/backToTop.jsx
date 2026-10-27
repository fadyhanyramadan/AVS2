"use client";
import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 lg:p-4 rounded-full bg-main text-white shadow-lg hover:bg-white hover:text-main transition-all duration-300"
          aria-label="Back to top"
        >
          <FiArrowUp size={24} />
        </button>
      )}
    </>
  );
}

export default BackToTop;
