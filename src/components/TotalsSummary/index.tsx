import React from 'react';
import PersonSummary from './PersonSummary';
import { Receipt } from '../../util';

const TotalsSummary = ({
  costPP,
  receipt,
}: {
  costPP: Record<string, number>;
  receipt: Receipt;
}): JSX.Element => {
  const { subtotal, tax, tip } = receipt;
  return (
    <div className="w-1/2 h-full flex-col">
      <div>Totals</div>
      <div className="flex-col">
        {Object.keys(costPP).map(person => {
          return (
            <PersonSummary key={person} name={person} total={costPP[person]} />
          );
        })}
      </div>
      <div>
        <p>Subtotal: {subtotal}</p>
        <p>Tax: {tax}</p>
        <p>Tip: {tip}</p>
        <p>Total: {subtotal + tax + tip}</p>
      </div>
    </div>
  );
};

export default TotalsSummary;
