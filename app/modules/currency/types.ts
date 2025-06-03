export interface Currency {
  rate: number;
  high: number;
  low: number;
  vol: number | null;
  cap: number | null;
  sup: number | null;
  change: number;
  change_pct: number;
  icon?: string;
};

export interface State {
  events: { [key: string]: boolean; };
  list: {
    [key: string]: Currency;
  };
  favorites: {
    [key: string]: Currency;
  };
}