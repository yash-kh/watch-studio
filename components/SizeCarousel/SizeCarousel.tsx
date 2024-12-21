"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./SizeCarousel.css";
import Image from "next/image";
import { watchItem, watchSize, watch } from "@/modals/watch";
import debounce from "lodash.debounce";

type CardElement = HTMLLIElement | null;
type GalleryElement = HTMLDivElement | null;

interface SizeCarouselProps {
  watches: watch[];
  selectedSize: watchSize;
  onSelect: (size: watchSize, band?: watchItem, caze?: watchItem) => void;
}

const SizeCarousel: React.FC<SizeCarouselProps> = ({
  watches,
  selectedSize,
  onSelect,
}) => {
  const cardsRef = useRef<CardElement[]>([]);
  const galleryRef = useRef<GalleryElement>(null);
  const [currentCard, setCurrentCard] = useState<number>(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    debounce(() => {
      if (!galleryRef.current) return;

      const galleryCenter =
        galleryRef.current.scrollLeft + galleryRef.current.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(galleryCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentCard(closestIndex);
    }, 200),
    []
  );

  const handleCardClick = (index: number) => {
    const selectedCard = cardsRef.current[index];
    if (selectedCard && galleryRef.current) {
      const centerOffset =
        selectedCard.offsetLeft -
        galleryRef.current.clientWidth / 2 +
        selectedCard.offsetWidth / 2;

      galleryRef.current.scrollTo({
        left: centerOffset,
        behavior: "smooth",
      });
      setCurrentCard(index);
    }
  };

  useEffect(() => {
    if (galleryRef.current) {
      let initialIndex = -1;
      for (let i = 0; i < watches.length; i++) {
        if (
          watches[i].case.name === watches[currentCard].case.name &&
          watches[i].band.name === watches[currentCard].band.name &&
          watches[i].size.name === selectedSize.name
        ) {
          initialIndex = i;
          break;
        }
      }
      if (initialIndex !== -1) {
        setCurrentCard(initialIndex);
      }
      const initialCard = cardsRef.current[initialIndex];

      if (initialCard) {
        const centerOffset =
          initialCard.offsetLeft -
          galleryRef.current.clientWidth / 2 +
          initialCard.offsetWidth / 2;

        galleryRef.current.scrollTo({
          left: centerOffset,
          behavior: "smooth",
        });
      }

      galleryRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (galleryRef.current) {
        // eslint-disable-next-line
        galleryRef.current.removeEventListener("scroll", handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watches]);

  useEffect(() => {
    onSelect(
      watches[currentCard].size,
      watches[currentCard].band,
      watches[currentCard].case
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard]);

  const handlePrev = () => {
    if (currentCard > 0) {
      const prevCard = cardsRef.current[currentCard - 1];
      if (prevCard) {
        const centerOffset =
          prevCard.offsetLeft -
          galleryRef.current!.clientWidth / 2 +
          prevCard.offsetWidth / 2;

        galleryRef.current!.scrollTo({
          left: centerOffset,
          behavior: "smooth",
        });
        setCurrentCard((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const handleNext = () => {
    if (currentCard < cardsRef.current.length - 1) {
      const nextCard = cardsRef.current[currentCard + 1];
      if (nextCard) {
        const centerOffset =
          nextCard.offsetLeft -
          galleryRef.current!.clientWidth / 2 +
          nextCard.offsetWidth / 2;

        galleryRef.current!.scrollTo({
          left: centerOffset,
          behavior: "smooth",
        });
        setCurrentCard((prev) =>
          Math.min(prev + 1, cardsRef.current.length - 1)
        );
      }
    }
  };

  return (
    <div className="gallery-wrapper">
      <div className="gallery hide-scroll-bar" ref={galleryRef}>
        <ul className="cards">
          {watches.map((item, i) => (
            <li
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onClick={() => handleCardClick(i)}
              className="cursor-pointer"
            >
              <Image
                src={item.band.imageUrl}
                alt={item.band.name}
                width={500}
                height={500}
              />
              <Image
                src={item.case.imageUrl}
                alt={item.case.name}
                width={500}
                height={500}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="actions hidden">
        <button className="prev" onClick={handlePrev}>
          Prev
        </button>
        <button className="next" onClick={handleNext}>
          Next
        </button>
        <div className="snapped-card">
          <p>Snapped card: {currentCard}</p>
        </div>
      </div>
    </div>
  );
};

export default SizeCarousel;
