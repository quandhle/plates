import React, { ReactElement, useState } from 'react';
import Items from './Items';
import { Item } from '../../util';

const EventSummary = ({
  eventName,
  taxPercent,
  items,
  addItem,
  deleteItem,
  showReceiptModal
}: {
  eventName: string;
  taxPercent: number;
  items: Item[];
  addItem: (cost: number, name: string, people: string[]) => void
  deleteItem: (id: string) => void;
  showReceiptModal: (show: boolean) => void
}): ReactElement => {
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);

  return (
    <div className="flex-col align-middle items-center w-1/2 h-full bg-zinc-300 p-4">
      <div className="flex items-center pb-4">
        <header className="text-2xl">Event: {eventName}</header>
        <button
          onClick={() => {
            showReceiptModal(true)
          }}
          className="pl-4 text-xs"
        >
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
