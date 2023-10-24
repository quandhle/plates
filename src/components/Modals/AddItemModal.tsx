import React, { ChangeEvent, ReactElement, useState } from 'react';
import { capitalizeFirstLetter } from '../../util';
import Modal from './Modal';

interface ITEM_FIELD {
  placeholder: string,
  name: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: unknown,
  type: string
}


const ReceiptModal = ({
                        showModal,
                        setShowModal,
                        handleSubmit,
                      }: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  handleSubmit: (cost: number, name: string, people: string[]) => void;
}): ReactElement => {
  const [item, setItem] = useState<string>('');
  const [cost, setCost] = useState<number | null>(null);
  const [split, setSplit] = useState<string[]>([]);

  const handleReset = () => {
    setItem('');
    setCost(null);
    setSplit([]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const ITEM_FIELDS: ITEM_FIELD[] = [
    {
      placeholder: 'Item',
      name: 'item',
      onChange: e => {
        setItem(e.target.value);
      },
      value: item,
      type: 'text',
    },
    {
      placeholder: 'Cost',
      name: 'cost',
      onChange: e => {
        setCost(parseFloat(e.target.value) || 0);
      },
      value: cost,
      type: 'number',
    },
    {
      placeholder: 'Split',
      name: 'split',
      onChange: e => {
        setSplit(e.target.value.split("[^\\p{L}0-9']+"));
      },
      value: split.join(', '),
      type: 'text',
    },
  ];

  return (
    <Modal showModal={showModal} title='Add Item'>
      <div className='flex-col items-center justify-between pb-2'>
        {ITEM_FIELDS.map(({ placeholder, name, onChange, value, type }) => {
          return (
            <div className='flex w-full'>
              <p className='pr-4 w-1/4'>{capitalizeFirstLetter(placeholder)}</p>
              <input
                className='w-full'
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value as never}
                required
                type={type}
              />
            </div>
          );
        })}
      </div>
      <div className='flex items-center justify-end'>
        <button onClick={handleCloseModal} className='pr-5'>
          Cancel
        </button>
        <button
          onClick={() => {
            if (cost && split && item) {
              handleSubmit(
                cost,
                item,
                split,
              );

              handleReset();
              handleCloseModal();
            }
          }}
        >
          Add
        </button>
      </div>
    </Modal>
  );
};

export default ReceiptModal;
