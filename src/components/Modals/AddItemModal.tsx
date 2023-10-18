/* eslint-disable no-console */
/* eslint-disable no-debugger */
import React, { useState } from 'react';
import Modal from './Modal';
import { Item } from '../../util';
import { generateUUID } from '../../util';

const AddItemModal = ({
  showModal,
  setShowModal,
  addItem,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  addItem: (item: Item) => void;
}): JSX.Element => {
  const [label, setLabel] = useState<string>('');
  const [cost, setCost] = useState<number>();
  const [split, setSplit] = useState<string[]>([]);

  const handleReset = () => {
    setLabel('');
    setCost(0);
    setSplit([]);
    setShowModal(false);
  };

  return (
    <Modal showModal={showModal}>
      <div className="flex-col items-center justify-between">
        <div className="flex items-center justify-between">
          <input
            placeholder="Label"
            name="label"
            onChange={e => {
              setLabel(e.currentTarget.value);
            }}
            value={label || ''}
            type="string"
            required
          />
          <input
            placeholder="Cost"
            name="cost"
            onChange={e => {
              setCost(parseFloat(e.currentTarget.value) || 0);
            }}
            value={cost}
            required
          />
          <input
            placeholder="People"
            name="people"
            onChange={e => {
              setSplit(e.target.value.split(', '));
            }}
            value={split.join(', ')}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              handleReset();
            }}
            className="pr-5"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (label && cost && split) {
                addItem({ label, cost, split, id: generateUUID() });
                handleReset();
              }
            }}
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddItemModal;
