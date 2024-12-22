import { useEffect, useState } from "react";

export const useIsTabletOrSmaller = () => {
  const isClient = typeof window !== "undefined";
  const initial = isClient ? window.innerWidth <= 768 : false;

  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(initial);

  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsTabletOrSmaller(mediaQuery.matches);

    handleResize();

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [isClient]);

  return isTabletOrSmaller;
};
