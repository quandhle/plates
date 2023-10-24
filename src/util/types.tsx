import { ChangeEvent } from 'react';

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

export interface FieldInput {
  placeholder: string,
  name: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: unknown,
  type: string
}