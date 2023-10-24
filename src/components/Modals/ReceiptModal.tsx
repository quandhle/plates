import React, { ReactElement, useMemo, useState } from 'react';
import { capitalizeFirstLetter, currencyFormat, FieldInput, Receipt } from '../../util';
import Modal from './Modal';

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
  const [error, setError] = useState<string>('');

  const total = useMemo(() => {
    return (subtotal || 0) + (tax || 0) + (tip || 0);
  }, [subtotal, tax, tip]);

  const handleReset = () => {
    setEventName('');
    setSubtotal(null);
    setTax(null);
    setTip(null);
    setError('');
  };


  const RECEIPT_FIELDS: FieldInput[] = [
    {
      placeholder: 'Event Name',
      name: 'name',
      onChange: e => {
        setEventName(e.target.value);
      },
      value: eventName,
      type: 'text',
    },
    {
      placeholder: 'Subtotal',
      name: 'subtotal',
      onChange: e => {
        setSubtotal(parseFloat(e.target.value) || 0);
      },
      value: subtotal || 0,
      type: 'number',
    },
    {
      placeholder: 'Tax',
      name: 'tax',
      onChange: e => {
        setTax(parseFloat(e.target.value) || 0);
      },
      value: tax || 0,
      type: 'number',
    },
    {
      placeholder: 'Tip',
      name: 'tip',
      onChange: e => {
        setTip(parseFloat(e.target.value) || 0);
      },
      value: tax || 0,
      type: 'number',
    },
    {
      placeholder: 'People',
      name: 'people',
      onChange: e => {
        setPeople(e.target.value.split("[^\\p{L}0-9']+"));
      },
      value: people.join(', '),
      type: 'text',
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
      </div>
      {error && <div className='text-red-700 pt-2'>{error}</div>}
      <div className='pt-4 right-0'>Total: {currencyFormat(total)}</div>
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
              )
              setError("")
              setShowModal(false);
            } else {
              setError('Missing event name and/or subtotal');
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
