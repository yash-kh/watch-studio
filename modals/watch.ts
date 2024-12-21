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
