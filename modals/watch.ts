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
  {
    name: "Apple Watch SE",
    sizes: [
      {
        name: "40mm",
        bands: [
          {
            type: "Sport Loop",
            name: "SL 1",
            price: 100,
            imageUrl: "/strap/40_sl_1.jpeg",
          },
          {
            type: "Sport Loop",
            name: "SL 2",
            price: 200,
            imageUrl: "/strap/40_sl_2.jpeg",
          },
          {
            type: "Stainless Steel",
            name: "SS 1",
            price: 100,
            imageUrl: "/strap/40_ss_1.jpeg",
          },
          {
            type: "Stainless Steel",
            name: "SS 2",
            price: 200,
            imageUrl: "/strap/40_ss_2.jpeg",
          },
          {
            type: "Fine Woven",
            name: "FW 1",
            price: 100,
            imageUrl: "/strap/40_fv_1.jpeg",
          },
          {
            type: "Fine Woven",
            name: "FW 2",
            price: 200,
            imageUrl: "/strap/40_fv_2.jpeg",
          },
        ],
        cases: [
          {
            type: "Aluminum",
            name: "A 1",
            price: 100,
            imageUrl: "/case/40_se_a_1.png",
          },
          {
            type: "Aluminum",
            name: "A 2",
            price: 200,
            imageUrl: "/case/40_se_a_2.png",
          },
          {
            type: "Aluminum",
            name: "A 3",
            price: 100,
            imageUrl: "/case/40_se_a_3.png",
          },
        ],
      },
      {
        name: "44mm",
        bands: [
          {
            type: "Sport Loop",
            name: "SL 1",
            price: 100,
            imageUrl: "/strap/44_sl_1.jpeg",
          },
          {
            type: "Sport Loop",
            name: "SL 2",
            price: 200,
            imageUrl: "/strap/44_sl_2.jpeg",
          },
          {
            type: "Stainless Steel",
            name: "SS 1",
            price: 100,
            imageUrl: "/strap/44_ss_1.jpeg",
          },
          {
            type: "Stainless Steel",
            name: "SS 2",
            price: 200,
            imageUrl: "/strap/44_ss_2.jpeg",
          },
          {
            type: "Fine Woven",
            name: "FW 1",
            price: 100,
            imageUrl: "/strap/44_fv_1.jpeg",
          },
          {
            type: "Fine Woven",
            name: "FW 2",
            price: 200,
            imageUrl: "/strap/44_fv_2.jpeg",
          },
        ],
        cases: [
          {
            type: "Aluminum",
            name: "A 1",
            price: 100,
            imageUrl: "/case/44_se_a_1.png",
          },
          {
            type: "Aluminum",
            name: "A 2",
            price: 200,
            imageUrl: "/case/44_se_a_2.png",
          },
          {
            type: "Aluminum",
            name: "A 3",
            price: 100,
            imageUrl: "/case/44_se_a_3.png",
          },
        ],
      },
    ],
  },
  {
    name: "Apple Watch Hermès Series 10",
    sizes: [
      {
        name: "42mm",
        bands: [
          {
            type: "Satiné Grand H",
            name: "SG 1",
            price: 100,
            imageUrl: "/strap/42_sg_1.jpeg",
          },
          {
            type: "Hermès Kilim",
            name: "HK 1",
            price: 200,
            imageUrl: "/strap/42_hk_1.jpeg",
          },
          {
            type: "Hermès Kilim",
            name: "HK 2",
            price: 200,
            imageUrl: "/strap/42_hk_2.jpeg",
          },
          {
            type: "Hermès Torsade",
            name: "HT 1",
            price: 200,
            imageUrl: "/strap/42_ht_1.jpeg",
          },
          {
            type: "Hermès Torsade",
            name: "HT 2",
            price: 200,
            imageUrl: "/strap/42_ht_2.jpeg",
          },
          {
            type: "Hermès Toile H",
            name: "HTH 1",
            price: 200,
            imageUrl: "/strap/42_hth_1.jpeg",
          },
        ],
        cases: [
          {
            type: "Titanium",
            name: "T 1",
            price: 100,
            imageUrl: "/case/42_x_t_1.png",
          },
        ],
      },
      {
        name: "46mm",
        bands: [
          {
            type: "Satiné Grand H",
            name: "SG 1",
            price: 100,
            imageUrl: "/strap/46_sg_1.jpeg",
          },
          {
            type: "Hermès Kilim",
            name: "HK 1",
            price: 200,
            imageUrl: "/strap/46_hk_1.jpeg",
          },
          {
            type: "Hermès Kilim",
            name: "HK 2",
            price: 200,
            imageUrl: "/strap/46_hk_2.jpeg",
          },
          {
            type: "Hermès Torsade",
            name: "HT 1",
            price: 200,
            imageUrl: "/strap/46_ht_1.jpeg",
          },
          {
            type: "Hermès Torsade",
            name: "HT 2",
            price: 200,
            imageUrl: "/strap/46_ht_2.jpeg",
          },
          {
            type: "Hermès Toile H",
            name: "HTH 1",
            price: 200,
            imageUrl: "/strap/46_hth_1.jpeg",
          },
        ],
        cases: [
          {
            type: "Titanium",
            name: "T 1",
            price: 100,
            imageUrl: "/case/46_x_t_1.png",
          },
        ],
      },
    ],
  },
];
