"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./WatchCarousel.css";
import Image from "next/image";
import { watchItem } from "@/modals/watch";
import debounce from "lodash.debounce";
import { useIsTabletOrSmaller } from "@/utils/view";

type Item = watchItem;

type CardElement = HTMLLIElement | null;
type GalleryElement = HTMLDivElement | null;

interface WatchCarouselProps {
  items: Item[];
  staticItem: Item;
  staticInFront: boolean;
  onSelect: (item: Item) => void;
  initialSelectedItem?: Item;
}

const WatchCarousel: React.FC<WatchCarouselProps> = ({
  items,
  staticItem,
  staticInFront,
  onSelect,
  initialSelectedItem = items[0],
}) => {
  const cardsRef = useRef<CardElement[]>([]);
  const galleryRef = useRef<GalleryElement>(null);
  const [currentCard, setCurrentCard] = useState<number>(
    items.indexOf(initialSelectedItem)
  );

  const isTabletOrSmaller = useIsTabletOrSmaller();

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
      const initialIndex = items.indexOf(initialSelectedItem);
      const initialCard = cardsRef.current[initialIndex];

      if (initialCard) {
        const centerOffset =
          initialCard.offsetLeft -
          galleryRef.current.clientWidth / 2 +
          initialCard.offsetWidth / 2;

        galleryRef.current.scrollLeft = centerOffset;
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
  }, [items]);

  useEffect(() => {
    onSelect(items[currentCard]);
  }, [currentCard, onSelect, items]);

  useEffect(() => {
    const index = items.indexOf(initialSelectedItem);
    setCurrentCard(index);
    if (galleryRef.current) {
      const initialCard = cardsRef.current[index];
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
    }
  }, [initialSelectedItem, items]);

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
          {items.map((item, i) => (
            <li
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onClick={() => handleCardClick(i)}
              className="cursor-pointer"
              style={{
                width: isTabletOrSmaller ? "230px" : "300px",
              }}
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={500}
                height={500}
                style={{
                  width: isTabletOrSmaller ? "350px" : "450px",
                  height: isTabletOrSmaller ? "350px" : "450px",
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="static-item"
        style={{
          zIndex: staticInFront ? 2 : 0,
          pointerEvents: staticInFront ? "none" : "auto",
        }}
      >
        <Image
          src={staticItem.imageUrl}
          alt={staticItem.name}
          width={isTabletOrSmaller ? 350 : 450}
          height={500}
        />
      </div>

      {!isTabletOrSmaller && currentCard > 0 && (
        <button
          className="prev bg-[#e8e8ed] p-1 rounded-full absolute top-1/2 left-2 z-50 transform -translate-y-1/2"
          onClick={handlePrev}
        >
          <svg
            className="w-6 h-6"
            viewBox="8 5 19 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"></path>
          </svg>
        </button>
      )}

      {!isTabletOrSmaller && currentCard < items.length - 1 && (
        <button
          className="next bg-[#e8e8ed] p-1 rounded-full absolute top-1/2 right-2 z-50 transform -translate-y-1/2"
          onClick={handleNext}
        >
          <svg
            className="w-6 h-6"
            viewBox="8 5 19 25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default WatchCarousel;
