"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DETAIL_PAGE_PATTERN =
  /^\/(concepts|guides|patterns|frameworks)\/[^/]+$/;

export function ReadingProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  const isDetailPage = DETAIL_PAGE_PATTERN.test(pathname);

  useEffect(() => {
    if (!isDetailPage) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial value
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDetailPage]);

  if (!isDetailPage) return null;

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 h-[3px] z-[60]"
      style={{
        width: `${progress}%`,
        backgroundColor: "var(--color-accent)",
        transition: "width 100ms linear",
      }}
    />
  );
}
