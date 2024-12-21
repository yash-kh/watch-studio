"use client";

import WatchCarousel from "@/components/WatchCarousel/WatchCarousel";
import SizeCarousel from "@/components/SizeCarousel/SizeCarousel";
import { watchItem, watchSeries, watchSize } from "@/modals/watch";
import { useState } from "react";
import ButtonList from "@/components/ButtonList/ButtonList";
import Dropdown from "@/components/Dropdown/Dropdown";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const series = [
  {
    name: "Apple Watch Series 10",
    sizes: [
      {
        name: "42mm",
        bands: [
          {
            type: "Sport Band",
            name: "SB 1",
            price: 100,
            imageUrl: "/strap/42_sb_1.jpeg",
          },
          {
            type: "Sport Band",
            name: "SB 2",
            price: 200,
            imageUrl: "/strap/42_sb_2.jpeg",
          },
          {
            type: "Stainless Steel",
            name: "SS 1",
            price: 100,
            imageUrl: "/strap/42_ss_1.jpeg",
          },
          {
            type: "Stainless Steel",
            name: "SS 2",
            price: 200,
            imageUrl: "/strap/42_ss_2.jpeg",
          },
          {
            type: "Sport Loop",
            name: "SL 1",
            price: 100,
            imageUrl: "/strap/42_sl_1.jpeg",
          },
          {
            type: "Sport Loop",
            name: "SL 2",
            price: 200,
            imageUrl: "/strap/42_sl_2.jpeg",
          },
          {
            type: "Nike Sport Loop",
            name: "NSL 1",
            price: 100,
            imageUrl: "/strap/42_nsl_1.jpeg",
          },
          {
            type: "Nike Sport Loop",
            name: "NSL 2",
            price: 200,
            imageUrl: "/strap/42_nsl_2.jpeg",
          },
        ],
        cases: [
          {
            type: "Aluminum",
            name: "A 1",
            price: 100,
            imageUrl: "/case/42_wf_a_1.png",
          },
          {
            type: "Aluminum",
            name: "A 2",
            price: 200,
            imageUrl: "/case/42_wf_a_2.png",
          },
          {
            type: "Titanium",
            name: "T 1",
            price: 100,
            imageUrl: "/case/42_wf_t_1.png",
          },
          {
            type: "Titanium",
            name: "T 2",
            price: 200,
            imageUrl: "/case/42_wf_t_2.png",
          },
        ],
      },
      {
        name: "46mm",
        bands: [
          {
            type: "Sport Band",
            name: "SB 1",
            price: 100,
            imageUrl: "/strap/46_sb_1.jpeg",
          },
          {
            type: "Sport Band",
            name: "SB 2",
            price: 200,
            imageUrl: "/strap/46_sb_2.jpeg",
          },
          {
            type: "Stainless Steel",
            name: "SS 1",
            price: 100,
            imageUrl: "/strap/46_ss_1.jpeg",
          },
          {
            type: "Stainless Steel",
            name: "SS 2",
            price: 200,
            imageUrl: "/strap/46_ss_2.jpeg",
          },
          {
            type: "Sport Loop",
            name: "SL 1",
            price: 100,
            imageUrl: "/strap/46_sl_1.jpeg",
          },
          {
            type: "Sport Loop",
            name: "SL 2",
            price: 200,
            imageUrl: "/strap/46_sl_2.jpeg",
          },
          {
            type: "Nike Sport Loop",
            name: "NSL 1",
            price: 100,
            imageUrl: "/strap/46_nsl_1.jpeg",
          },
          {
            type: "Nike Sport Loop",
            name: "NSL 2",
            price: 200,
            imageUrl: "/strap/46_nsl_2.jpeg",
          },
        ],
        cases: [
          {
            type: "Aluminum",
            name: "A 1",
            price: 100,
            imageUrl: "/case/46_wf_a_1.png",
          },
          {
            type: "Aluminum",
            name: "A 2",
            price: 200,
            imageUrl: "/case/46_wf_a_2.png",
          },
          {
            type: "Titanium",
            name: "T 1",
            price: 100,
            imageUrl: "/case/46_wf_t_1.png",
          },
          {
            type: "Titanium",
            name: "T 2",
            price: 200,
            imageUrl: "/case/46_wf_t_2.png",
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const [view, setView] = useState<string>("home");
  const [selectedSize, setSelectedSize] = useState<watchSize>(
    series[0].sizes[1]
  );
  const [selectedSeries, setSelectedSeries] = useState<watchSeries>(series[0]);
  const [bands, setBands] = useState<watchItem[]>(series[0].sizes[1].bands);
  const [cases, setCases] = useState<watchItem[]>(series[0].sizes[1].cases);
  const [selectedCase, setSelectedCase] = useState<watchItem>(cases[0]);
  const [selectedBand, setSelectedBand] = useState<watchItem>(bands[0]);

  function selectSize(size: watchSize, band?: watchItem, caze?: watchItem) {
    setSelectedSize(size);
    setBands(size.bands);
    setCases(size.cases);
    setSelectedBand(band || size.bands[0]);
    setSelectedCase(caze || size.cases[0]);
  }

  function setSeries(name: string) {
    const s = series.find((s) => s.name === name);
    if (s) {
      setSelectedSeries(s);
      selectSize(s.sizes[1] || s.sizes[0]);
    }
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <main className="typography-body">
      <div className="flex justify-between h-[110px]">
        <span className="px-[33px] py-[33px] w-40">
          <Image src="/watch.jpeg" alt="logo" width={90} height={90} />
        </span>
        <Dropdown options={series.map((s) => s.name)} onSelect={setSeries} />
        <span className="px-[22px] py-[22px] w-40">
          <button className="button float-end px-4 py-2 typography-body bg-[#0071e3] text-white rounded-2xl">
            Save
          </button>
        </span>
      </div>
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            key="home"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <SizeCarousel
              sizes={[selectedSeries.sizes[1] || selectedSeries.sizes[0]]}
              selectedSize={selectedSize}
              selectedCase={selectedCase || cases[0]}
              selectedBand={selectedBand || bands[0]}
              onSelect={selectSize}
            />
          </motion.div>
        )}
        {view === "Size" && (
          <motion.div
            key="size"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <SizeCarousel
              sizes={selectedSeries.sizes}
              selectedSize={selectedSize}
              selectedCase={selectedCase || cases[0]}
              selectedBand={selectedBand || bands[0]}
              onSelect={selectSize}
            />
          </motion.div>
        )}
        {view === "Band" && (
          <motion.div
            key="band"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <WatchCarousel
              items={bands}
              staticItem={selectedCase || cases[0]}
              staticInFront={true}
              onSelect={setSelectedBand}
              initialSelectedItem={selectedBand || undefined}
            />
          </motion.div>
        )}
        {view === "Case" && (
          <motion.div
            key="case"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
          >
            <WatchCarousel
              items={cases}
              staticItem={selectedBand || bands[0]}
              staticInFront={false}
              onSelect={setSelectedCase}
              initialSelectedItem={selectedCase || undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center mt-12">
        <div className="rf-designstudio-productinfo typography-body-reduced">
          <div aria-live="polite" role="text">
            <div className="rf-designstudio-productcollection typography-caption">
              {selectedSeries.name}
            </div>
            <div className="rf-designstudio-producttitle typography-body-reduced">
              {selectedSize.name} {selectedCase?.name} with {selectedBand?.name}
            </div>
            <div className="rf-designstudio-productprice typography-body-reduced">
              <div className="rf-designstudio-pricepoint-fullPrice-comparative">
                From{" "}
                <span className="nowrap">
                  ${selectedBand?.price + selectedCase?.price}
                </span>
              </div>
              <div className="rf-designstudio-pricepoint-acmiPrice-comparative"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-16">
        <span onClick={() => setView("Size")}>
          <ButtonList
            items={
              view !== "Size"
                ? ["Size"]
                : selectedSeries.sizes.map((s) => s.name)
            }
            heightLightItem={selectedSize.name}
          ></ButtonList>
        </span>
        <span onClick={() => setView("Case")}>
          <ButtonList
            items={
              view !== "Case"
                ? ["Case"]
                : [...new Set(cases.map((c) => c.type))]
            }
            heightLightItem={selectedCase.type}
          ></ButtonList>
        </span>
        <span onClick={() => setView("Band")}>
          <ButtonList
            items={
              view !== "Band"
                ? ["Band"]
                : [...new Set(bands.map((b) => b.type))]
            }
            heightLightItem={selectedBand.type}
          ></ButtonList>
        </span>
      </div>
    </main>
  );
}
