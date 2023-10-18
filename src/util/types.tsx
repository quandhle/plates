export interface Item {
  id: string;
  label: string;
  cost: number;
  split: string[];
}

export interface Receipt {
  subtotal: number;
  tax: number;
  tip: number;
}
