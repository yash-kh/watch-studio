"use client";

import React, { useEffect, useRef, useState } from "react";
import "./WatchCarousel.css";
import Image from "next/image";
import { watchItem } from "@/modals/watch";
import { motion } from "framer-motion";

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

  const handleScroll = () => {
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
  };

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
    <motion.div
      className="gallery-wrapper"
      initial={{ opacity: 0, backgroundColor: "white" }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="gallery" ref={galleryRef}>
        <ul className="cards">
          {items.map((item, i) => (
            <li
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onClick={() => handleCardClick(i)}
              className="cursor-pointer"
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={500}
                height={500}
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
          width={450}
          height={500}
        />
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
    </motion.div>
  );
};

export default WatchCarousel;
