"use client";

import WatchCarousel from "@/components/WatchCarousel/WatchCarousel";
import SizeCarousel from "@/components/SizeCarousel/SizeCarousel";
import { watchItem, watchSeries, watchSize } from "@/modals/watch";
import { useState } from "react";
import ButtonList from "@/components/ButtonList/ButtonList";
import Dropdown from "@/components/Dropdown/Dropdown";

const series = [
  {
    name: "Apple Watch Series 10",
    sizes: [
      {
        name: "42mm",
        bands: [
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
  const [view, setView] = useState<string>("sizes");
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

  return (
    <main>
      <div className="flex justify-between h-[110px]">
        <span>
          <h1 className="text-3xl font-bold">Watch Shop</h1>
        </span>
        <Dropdown options={series.map((s) => s.name)} onSelect={setSeries} />
        <span>
          <h1 className="text-3xl font-bold">Watch Shop</h1>
        </span>
      </div>
      {view === "sizes" && (
        <SizeCarousel
          sizes={selectedSeries.sizes}
          selectedSize={selectedSize}
          selectedCase={selectedCase || cases[0]}
          selectedBand={selectedBand || bands[0]}
          onSelect={selectSize}
        />
      )}
      {view === "bands" && (
        <WatchCarousel
          items={bands}
          staticItem={selectedCase || cases[0]}
          staticInFront={true}
          onSelect={setSelectedBand}
          initialSelectedItem={selectedBand || undefined}
        />
      )}
      {view === "cases" && (
        <WatchCarousel
          items={cases}
          staticItem={selectedBand || bands[0]}
          staticInFront={false}
          onSelect={setSelectedCase}
          initialSelectedItem={selectedCase || undefined}
        />
      )}
      {selectedSize.name +
        " " +
        selectedSeries.name +
        " " +
        selectedCase?.name +
        " " +
        selectedBand?.name}
      <span onClick={() => setView("sizes")}>
        <ButtonList
          items={
            view !== "sizes"
              ? ["sizes"]
              : selectedSeries.sizes.map((s) => s.name)
          }
        ></ButtonList>
      </span>
      <span onClick={() => setView("bands")}>
        <ButtonList
          items={view !== "bands" ? ["bands"] : bands.map((b) => b.name)}
        ></ButtonList>
      </span>
      <span onClick={() => setView("cases")}>
        <ButtonList
          items={view !== "cases" ? ["cases"] : cases.map((c) => c.name)}
        ></ButtonList>
      </span>
    </main>
  );
}
