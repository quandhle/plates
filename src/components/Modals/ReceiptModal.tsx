/* eslint-disable no-console */
/* eslint-disable no-debugger */
import React, { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import { Receipt, capitalizeFirstLetter } from '../../util';
import Modal from './Modal';

interface Field {
  placeholder: string,
  name: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: unknown,
}

const ReceiptModal = ({
  showModal,
  setShowModal,
  handleSubmit,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  handleSubmit: (receipt: Receipt, name: string, people: string[]) => void;
}): ReactElement => {
  const [eventName, setEventName] = useState<string>('');
  const [subtotal, setSubtotal] = useState<number | null>(null);
  const [tax, setTax] = useState<number | null>(null);
  const [tip, setTip] = useState<number | null>(null);
  const [people, setPeople] = useState<string[]>([]);

  const total = useMemo(() => {
    return (subtotal || 0) + (tax || 0) + (tip || 0);
  }, [subtotal, tax, tip]);

  const handleReset = () => {
    setEventName('');
    setSubtotal(null);
    setTax(null);
    setTip(null);
  };


  const RECEIPT_FIELDS: Field[] = [
    {
      placeholder: 'Event Name',
      name: 'name',
      onChange: e => {
        setEventName(e.target.value);
      },
      value: eventName,
    },
    {
      placeholder: 'Subtotal',
      name: 'subtotal',
      onChange: e => {
        setSubtotal(parseFloat(e.target.value) || 0);
      },
      value: subtotal || 0,
    },
    {
      placeholder: 'Tax',
      name: 'tax',
      onChange: e => {
        setTax(parseFloat(e.target.value) || 0);
      },
      value: tax || 0,
    },
    {
      placeholder: 'Tax',
      name: 'tax',
      onChange: e => {
        setTip(parseFloat(e.target.value) || 0);
      },
      value: tax || 0,
    },
    {
      placeholder: 'People',
      name: 'people',
      onChange: e => {
        setPeople(e.target.value.split("[^a-zA-Z0-9']+"));
      },
      value: people.join(', '),
    },
  ];

  return (
    <Modal showModal={showModal} title='Event Information'>
      <div className='flex-col items-center justify-between w-full'>
        {RECEIPT_FIELDS.map(({ placeholder, name, onChange, value }) => {
          return (
            <div className="flex w-full">
              <p className="pr-4 w-1/4">{capitalizeFirstLetter(placeholder)}</p>
              <input
                className="w-full"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value as never}
                required
              />
            </div>

          );
        })}
        <div className="pt-4 right-0">Total: {total}</div>
      </div>
      <div className="flex items-center justify-end">
        <button onClick={handleReset} className="pr-5">
          Reset
        </button>
        <button
          onClick={() => {
            if (subtotal && eventName) {
              handleSubmit(
                { subtotal: subtotal || 0, tax: tax || 0, tip: tip || 0 },
                eventName,
                people
              );
              setShowModal(false);
            }
          }}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default ReceiptModal;
