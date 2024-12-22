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

export function overlayAndDownloadImages(imgUrl1: string, imgUrl2: string) {
  const img1 = new Image();
  const img2 = new Image();

  img1.src = imgUrl1;
  img1.onload = () => {
    img2.src = imgUrl2;
    img2.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = Math.max(img1.width, img2.width);
      canvas.height = Math.max(img1.height, img2.height);

      ctx.drawImage(img1, 0, 0);
      ctx.drawImage(img2, 0, 0);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "combined-image.png";
      link.click();
    };
  };
}
