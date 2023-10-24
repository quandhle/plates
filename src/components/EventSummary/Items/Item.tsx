import React, { useMemo } from 'react';
import { currencyFormat, type Item as ItemType } from '../../../util';

const Item = ({ info, taxPercent, deleteItem }: { info: ItemType, taxPercent: number, deleteItem: (id: string) => void }): JSX.Element => {
  const { label, cost, split, id } = info;

  const costWithTax = useMemo(() => {
    return cost * taxPercent;
  }, [cost, taxPercent]);

  const costPerPerson = useMemo(() => {
    return costWithTax / split.length;
  }, [costWithTax, split]);

  return (
    <div className="items-center flex align-center">
      <div className="flex items-center justify-between w-full" id={id}>
        <p className="w-1/4">{label}</p>
        <p>{currencyFormat(cost)}</p>
        <p>{currencyFormat(cost * taxPercent)}</p>
        <p>{currencyFormat(costPerPerson)}</p>
        <p className="w-1/4">{split.join(', ')}</p>
      </div>
      <div className='flex justify-end w-24'>
        {/* TODO add an edit functionality */}
        {/* <button onClick={() => {}}>Edit</button> */}
        <button onClick={() => deleteItem(id)}>-</button>
      </div>
    </div>
  )
}

export default Item
