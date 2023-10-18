import React, { useState } from 'react';
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
  addItem: (item: Item) => void;
  deleteItem: (id: string) => void;
}): JSX.Element => {
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);

  return (
    <div className="flex-col align-middle items-center w-1/2 h-full bg-green-400">
      <div className="flex items-center">
        <div>{eventName}</div>
        <button onClick={() => {}} className="pl-4">
          Edit
        </button>
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
