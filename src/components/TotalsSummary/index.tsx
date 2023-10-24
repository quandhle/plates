import React from 'react';
import PersonSummary from './PersonSummary';
import { capitalizeFirstLetter, currencyFormat, Receipt } from '../../util';

const TotalsSummary = ({
  costPP,
  receipt,
}: {
  costPP: Record<string, number>;
  receipt: Receipt;
}): JSX.Element => {
  const { subtotal, tax, tip } = receipt;
  return (
    <div className="w-1/2 h-full flex-col p-4">
      <header className="text-2xl pb-4">Totals</header>
      <div className="flex-col">
        {Object.keys(costPP).map(person => {
          return (
            <PersonSummary key={person} name={person} total={costPP[person]} />
          );
        })}
      </div>
      <div className="pt-4">
        {Object.keys(receipt).map((key, i) => {
          return (
            <p key={i} className="flex"><span className="w-1/4">{capitalizeFirstLetter(key)}: </span><span>{currencyFormat(receipt[key as never])}</span></p>
          )
        })}
        <p className="flex pt-2"><span className="w-1/4">Total: </span><span>{currencyFormat(subtotal + tax + tip)}</span></p>
      </div>
    </div>
  );
};

export default TotalsSummary;
