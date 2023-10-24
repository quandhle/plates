import React, { Fragment, useMemo, useState } from 'react';
import './App.css';
import EventSummary from './components/EventSummary';
import TotalsSummary from './components/TotalsSummary';
import { ReceiptModal } from './components/Modals';
import { generateUUID, Item as ItemType, Receipt } from './util';

const App = (): JSX.Element => {
  const [eventName, setEventName] = useState<string>('');
  const [receipt, setReceipt] = useState<null | Receipt>(null);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [items, setItems] = useState<ItemType[]>([]);
  const [people, setPeople] = useState<string[]>([]);

  const addItem = (cost: number, name: string, people: string[]): void => {
    setItems([...items,
      {
        id: generateUUID(),
        label: name,
        cost: cost,
        split: people
      }
    ])
    setEventName(name);
    setPeople(people);
    setReceipt(receipt);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const taxPercent = useMemo(() => {
    if (receipt?.subtotal && receipt.tax) {
      return receipt.tax / receipt.subtotal;
    } else {
      return 0;
    }
  }, [receipt]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const costPerPerson = useMemo(() => {
    const costs: Record<string, number> = {};

    people.forEach(person => {
      costs[person] = 0;
    });

    items.forEach(item => {
      item.split.forEach(splitWith => {
        costs[splitWith] += item.cost / item.split.length;
      });
    });

    return costs;
  }, [people, items]);

  const handleSubmitReceipt = (
    receipt: Receipt,
    name: string,
    people: string[]
  ) => {
    setPeople(people);
    setReceipt(receipt);
    setEventName(name);
  };

  return (
    <div className="flex w-full h-screen relative">
      {receipt && (
        <Fragment>
          <EventSummary
            eventName={eventName}
            taxPercent={taxPercent}
            items={items}
            addItem={addItem}
            deleteItem={deleteItem}
          />
          <TotalsSummary costPP={costPerPerson} receipt={receipt} />
        </Fragment>
      )}
      <ReceiptModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmitReceipt}
      />
    </div>
  );
};

export default App;
