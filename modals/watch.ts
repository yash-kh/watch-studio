export type watchItem = {
  type: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type watch = {
  case: watchItem;
  band: watchItem;
  size: watchSize;
};

export type watchSize = {
  name: string;
  bands: watchItem[];
  cases: watchItem[];
};

export type watchSeries = {
  name: string;
  sizes: watchSize[];
};

export const staticData = [
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
