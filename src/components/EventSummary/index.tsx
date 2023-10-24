import React, { ReactElement, useState } from 'react';
import Items from './Items';
import { Item } from '../../util';

const EventSummary = ({
  eventName,
  taxPercent,
  items,
  addItem,
  deleteItem,
}: {
  eventName: string;
  taxPercent: number;
  items: Item[];
  addItem: (cost: number, name: string, people: string[]) => void
  deleteItem: (id: string) => void;
}): ReactElement => {
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);

  return (
    <div className="flex-col align-middle items-center w-1/2 h-full bg-zinc-300 p-4">
      <div className="flex items-center">
        <header className="text-2xl pb-4">Event: {eventName}</header>
        {/*TODO add edit functionality for even name*/}
        {/*<button onClick={() => {}} className="pl-4">*/}
        {/*  Edit*/}
        {/*</button>*/}
      </div>
      <Items
        taxPercent={taxPercent}
        showAddItemModal={showAddItemModal}
        setShowAddItemModal={setShowAddItemModal}
        items={items}
        addItem={addItem}
        deleteItem={deleteItem}
      />
    </div>
  );
};

export default EventSummary;
