export type Product = {
  id: string;
  slug: string;
  nameBn: string;
  image: string;
  today: string;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};
