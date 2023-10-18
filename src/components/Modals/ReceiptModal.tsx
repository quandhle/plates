/* eslint-disable no-console */
/* eslint-disable no-debugger */
import React, { useMemo, useState } from 'react';
import { Receipt } from '../../util';
import Modal from './Modal';

const ReceiptModal = ({
  showModal,
  setShowModal,
  handleSubmit,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  handleSubmit: (receipt: Receipt, name: string, people: string[]) => void;
}): JSX.Element => {
  const [eventName, setEventName] = useState<string>('');
  const [subtotal, setSubtotal] = useState<number | null>(null);
  const [tax, setTax] = useState<number | null>(null);
  const [tip, setTip] = useState<number | null>(null);
  const [people, setPeople] = useState<string[]>([]);

  // TODO clean this up
  const total = useMemo(() => {
    const thisTotal = (subtotal || 0) + (tax || 0) + (tip || 0);

    return thisTotal;
  }, [subtotal, tax, tip]);

  const handleReset = () => {
    setEventName('');
    setSubtotal(null);
    setTax(null);
    setTip(null);
  };

  return (
    <Modal showModal={showModal}>
      <div className="flex items-center justify-between">
        <input
          placeholder="Event Name"
          name="name"
          onChange={e => {
            setEventName(e.target.value);
          }}
          value={eventName}
          required
        />
        <input
          placeholder="Subtotal"
          name="subtotal"
          onChange={e => {
            setSubtotal(parseFloat(e.target.value) || 0);
          }}
          value={subtotal || 0}
          type="number"
          required
        />
        <input
          placeholder="Tax"
          name="tax"
          onChange={e => {
            setTax(parseFloat(e.target.value) || 0);
          }}
          value={tax || 0}
          type="number"
        />
        <input
          placeholder="Tip"
          name="tip"
          onChange={e => {
            setTip(parseFloat(e.target.value) || 0);
          }}
          value={tip || 0}
          type="number"
        />
        <input
          placeholder="People"
          name="people"
          onChange={e => {
            setPeople(e.target.value.split(', '));
          }}
          value={people.join(', ')}
          required
        />
      </div>
      <div className="right-0">Total: {total}</div>
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
