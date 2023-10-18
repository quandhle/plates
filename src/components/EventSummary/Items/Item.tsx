
import React from 'react';
import { type Item as ItemType } from '../../../util'

const Item = ({ info, taxPercent, deleteItem }: { info: ItemType, taxPercent: number, deleteItem: (id: string) => void }): JSX.Element => {
  const { label, cost, split, id } = info;

  return (
    <div className="items-center flex align-center">
      <div className="flex items-center justify-between w-5/6" id={id}>
        <div>{label}</div>
        <div>{cost}</div>
        <div>{cost * taxPercent}</div>
        <div>{split.join(", ")}</div>
      </div>
      <div className='flex justify-end w-1/6'>
        {/* TODO add an edit functionality */}
        {/* <button onClick={() => {}}>Edit</button> */}
        <button onClick={() => deleteItem(id)}>-</button>
      </div>
    </div>
  )
}

export default Item
