"use client";

import WatchCarousel from "@/components/WatchCarousel/WatchCarousel";
import SizeCarousel from "@/components/SizeCarousel/SizeCarousel";
import {
  staticData,
  watch,
  watchItem,
  watchSeries,
  watchSize,
} from "@/modals/watch";
import { useState } from "react";
import ButtonList from "@/components/ButtonList/ButtonList";
import Dropdown from "@/components/Dropdown/Dropdown";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/Loader/Loader";
import { useIsTabletOrSmaller } from "@/utils/view";

const series = staticData;

export default function Home() {
  const [view, setView] = useState<string>("home");
  const [isGetStarted, setIsGetStarted] = useState(true);
  const [isScaled, setIsScaled] = useState(true);
  const [selectedSize, setSelectedSize] = useState<watchSize>(
    series[0].sizes[1]
  );
  const [selectedSeries, setSelectedSeries] = useState<watchSeries>(series[0]);
  const [bands, setBands] = useState<watchItem[]>(series[0].sizes[1].bands);
  const [cases, setCases] = useState<watchItem[]>(series[0].sizes[1].cases);
  const [selectedCase, setSelectedCase] = useState<watchItem>(cases[0]);
  const [selectedBand, setSelectedBand] = useState<watchItem>(bands[0]);
  const [watchList, setWatchList] = useState<watch[]>([
    {
      case: selectedCase,
      band: selectedBand,
      size: selectedSize,
    },
  ]);
  const isTabletOrSmaller = useIsTabletOrSmaller();

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
      setView("a");
      setTimeout(() => setView("home"), 500);
      setSelectedSeries(s);
      selectSize(s.sizes[1] || s.sizes[0]);
      const size = s.sizes[1] || s.sizes[0];
      const band = size.bands[0];
      const casee = size.cases[0];
      setWatchList([
        {
          case: casee,
          band: band,
          size: size,
        },
      ]);
    }
  }

  function bandTypeChange(type: string) {
    const s = series.find((s) => s.name === selectedSeries.name);
    if (s) {
      const size = s.sizes.find((s) => s.name === selectedSize.name);
      if (size) {
        const band = size.bands.find((b) => b.type === type);
        if (band) {
          setSelectedBand(band);
        }
      }
    }
  }

  function caseTypeChange(type: string) {
    const s = series.find((s) => s.name === selectedSeries.name);
    if (s) {
      const size = s.sizes.find((s) => s.name === selectedSize.name);
      if (size) {
        const casee = size.cases.find((c) => c.type === type);
        if (casee) {
          setSelectedCase(casee);
        }
      }
    }
  }

  function watchSizeChange(sizeName: string) {
    const s = series.find((s) => s.name === selectedSeries.name);
    if (s) {
      const size = s.sizes.find((s) => s.name === sizeName);
      if (size) {
        selectSize(size);
      }
    }
  }

  function removeLeadingNumbers(input: string): string {
    return input.replace(/^\d+/, "");
  }

  const loadAssets = async (toView: string, watches?: watch[]) => {
    setView("loading");

    const promiseArr: Promise<void>[] = [];

    if (toView === "Case") {
      cases.forEach((b) => {
        const tempPromise = new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = b.imageUrl;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        promiseArr.push(tempPromise);
      });
    }

    if (toView === "Band") {
      bands.forEach((b) => {
        const tempPromise = new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = b.imageUrl;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        promiseArr.push(tempPromise);
      });
    }

    if (toView === "Watch") {
      watches?.forEach((w) => {
        const tempPromise = new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = w.band.imageUrl;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        const tempPromise1 = new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = w.case.imageUrl;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        promiseArr.push(tempPromise);
        promiseArr.push(tempPromise1);
      });
    }

    // Load all assets
    await Promise.all(promiseArr);

    // Set the view after loading
    setView(toView);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <main className="typography-body">
      <AnimatePresence>
        {isGetStarted && (
          <motion.div
            key="getStarted"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="absolute top-36 left-1/4 transform -translate-x-1/4 z-100"
          >
            <h1
              className="rf-designstudio-headline typography-headline-elevated"
              id="rf-designstudio-a11yoverlaydesc"
            >
              <div role="text">
                <div className="as-designstudio-intro-collectionname">
                  Apple Watch Studio
                </div>
                <div className="as-designstudio-intro-casemsg">
                  Choose a case.
                </div>
                <div className="as-designstudio-intro-bandmsg">
                  Pick a band.
                </div>
                <div className="as-designstudio-intro-stylemsg">
                  Create your own style.
                </div>
              </div>
            </h1>
            <button
              className="px-4 py-2 typography-body bg-[#0071e3] text-white rounded-2xl mt-7"
              onClick={() => {
                setIsScaled(false);
                setIsGetStarted(false);
              }}
            >
              get started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-between h-[6.875rem]">
        <span className="px-[2.0625rem] py-[2.0625rem] w-40">
          <Image src="/watch.jpeg" alt="logo" width={90} height={90} />
        </span>
        <span>
          {!isGetStarted && (
            <Dropdown
              options={series.map((s) => s.name)}
              onSelect={setSeries}
            />
          )}
        </span>
        <span className="px-[1.375rem] py-[1.375rem] w-40">
          {!isGetStarted && (
            <button className="button float-end px-4 py-2 typography-body bg-[#0071e3] text-white rounded-2xl">
              Save
            </button>
          )}
        </span>
      </div>
      <motion.div
        initial={{ scale: isTabletOrSmaller ? 1.25 : 2, translateY: 550 }}
        animate={{
          scale: isScaled ? (isTabletOrSmaller ? 1.25 : 2) : 1,
          translateY: isScaled ? 550 : 0,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
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
                watches={watchList}
                selectedSize={selectedSize}
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
                watches={watchList}
                selectedSize={selectedSize}
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
          {view === "loading" && (
            <motion.div key="loading">
              <div className="gallery-wrapper">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Loader />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {!isGetStarted && (
        <div className="text-center mt-[3rem]">
          <div className="rf-designstudio-productinfo typography-body-reduced">
            <div aria-live="polite" role="text">
              <div className="rf-designstudio-productcollection typography-caption">
                {selectedSeries.name}
              </div>
              <div className="rf-designstudio-producttitle typography-body-reduced">
                {selectedSize.name} {selectedCase?.name} with{" "}
                {selectedBand?.name}
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
      )}
      {!isGetStarted && (
        <div className="flex justify-center">
          <div className="flex gap-4 my-16 overflow-x-auto max-w-full hide-scroll-bar px-3">
            <span
              onClick={() => {
                const watches: watch[] = [];
                const bandName = removeLeadingNumbers(selectedBand.name);
                const caseName = removeLeadingNumbers(selectedCase.name);
                selectedSeries.sizes.forEach((size) => {
                  const band = size.bands.find(
                    (b) => removeLeadingNumbers(b.name) === bandName
                  );
                  const casze = size.cases.find(
                    (c) => removeLeadingNumbers(c.name) === caseName
                  );
                  if (band && casze) {
                    watches.push({ case: casze, band: band, size: size });
                  }
                });
                setWatchList(watches);
                loadAssets("Size", watches);
              }}
            >
              <ButtonList
                items={
                  view !== "Size"
                    ? ["Size"]
                    : selectedSeries.sizes.map((s) => s.name)
                }
                heightLightItem={selectedSize.name}
                typeChange={watchSizeChange}
              ></ButtonList>
            </span>
            <span onClick={() => loadAssets("Case")}>
              <ButtonList
                items={
                  view !== "Case"
                    ? ["Case"]
                    : [...new Set(cases.map((c) => c.type))]
                }
                heightLightItem={selectedCase.type}
                typeChange={caseTypeChange}
              ></ButtonList>
            </span>
            <span onClick={() => loadAssets("Band")}>
              <ButtonList
                items={
                  view !== "Band"
                    ? ["Band"]
                    : [...new Set(bands.map((b) => b.type))]
                }
                heightLightItem={selectedBand.type}
                typeChange={bandTypeChange}
              ></ButtonList>
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
