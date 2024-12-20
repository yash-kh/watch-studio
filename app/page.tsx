"use client";

import WatchCarousel from "@/components/WatchCarousel/WatchCarousel";
import { watchItem } from "@/modals/watch";
import { useState } from "react";

const bands = [
  {
    type: "Stainless Steel",
    name: "SS 1",
    price: 100,
    imageUrl: "/strap/ss_1.jpeg",
  },
  {
    type: "Stainless Steel",
    name: "SS 2",
    price: 200,
    imageUrl: "/strap/ss_2.jpeg",
  },
  {
    type: "Sport Loop",
    name: "SL 1",
    price: 100,
    imageUrl: "/strap/sl_1.jpeg",
  },
  {
    type: "Sport Loop",
    name: "SL 2",
    price: 200,
    imageUrl: "/strap/sl_2.jpeg",
  },
  {
    type: "Sport Band",
    name: "SB 1",
    price: 100,
    imageUrl: "/strap/sb_1.jpeg",
  },
  {
    type: "Sport Band",
    name: "SB 2",
    price: 200,
    imageUrl: "/strap/sb_2.jpeg",
  },
  {
    type: "Nike Sport Loop",
    name: "NSL 1",
    price: 100,
    imageUrl: "/strap/NSL_1.jpeg",
  },
  {
    type: "Nike Sport Loop",
    name: "NSL 2",
    price: 200,
    imageUrl: "/strap/NSL_2.jpeg",
  },
];

const cases = [
  {
    type: "Aluminum",
    name: "A 1",
    price: 100,
    imageUrl: "/case/wf_a_1.png",
  },
  {
    type: "Aluminum",
    name: "A 2",
    price: 200,
    imageUrl: "/case/wf_a_2.png",
  },
  {
    type: "Titanium",
    name: "T 1",
    price: 100,
    imageUrl: "/case/wf_t_1.png",
  },
  {
    type: "Titanium",
    name: "T 2",
    price: 200,
    imageUrl: "/case/wf_t_2.png",
  },
];

export default function Home() {
  const [view, setView] = useState<string>("bands");
  const [selectedCase, setSelectedCase] = useState<watchItem | null>(null);
  const [selectedBand, setSelectedBand] = useState<watchItem | null>(null);

  return (
    <main>
      <div className="h-[110px]"></div>
      {view === "bands" && (
        <>
          <WatchCarousel
            items={bands}
            staticItem={selectedCase || cases[0]}
            staticInFront={true}
            onSelect={setSelectedBand}
            initialSelectedItem={selectedBand || undefined}
          />
          {selectedBand && <p>{selectedBand.name}</p>}
        </>
      )}
      {view === "cases" && (
        <>
          <WatchCarousel
            items={cases}
            staticItem={selectedBand || bands[0]}
            staticInFront={false}
            onSelect={setSelectedCase}
            initialSelectedItem={selectedCase || undefined}
          />
          {selectedCase && <p>{selectedCase.name}</p>}
        </>
      )}
      <button onClick={() => setView("cases")}>Cases</button>
      <button onClick={() => setView("bands")}>Bands</button>
    </main>
  );
}
