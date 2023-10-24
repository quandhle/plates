import React, { Fragment, ReactElement } from 'react';
import Item from './Item'
import { type Item as ItemType } from '../../../util';
import { AddItemModal } from '../../Modals';

const Items = ({
  showAddItemModal,
  setShowAddItemModal,
  taxPercent,
  items,
  addItem,
  deleteItem
}: {
  showAddItemModal: boolean,
  setShowAddItemModal: (show: boolean) => void,
  taxPercent: number,
  items: ItemType[],
  addItem: (cost: number, name: string, people: string[]) => void
  deleteItem: (id: string) => void;
}): ReactElement => {
  return (
    <Fragment>
      <AddItemModal
        handleSubmit={addItem}
        showModal={showAddItemModal}
        setShowModal={setShowAddItemModal}
      />
      <div className="flex-col items-center">
        <div className="flex items-center justify-between relative">
          <header className='w-full text-center'>Items</header>
          <div className='absolute right-0'>
            <button
              onClick={() => {
                setShowAddItemModal(true);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div>
          {items.length > 0 &&
            <div className="flex items-center justify-between w-full">
              <p className="w-1/4">Item</p>
              <p>Cost</p>
              <p>Cost w/ Tax</p>
              <p>Cost pp</p>
              <p className="w-1/4">Split</p>
            </div>
          }
          {items.map(item => (
            <Item
              key={item.label}
              info={item}
              deleteItem={deleteItem}
              taxPercent={taxPercent}
            />
          ))}
        </div>
      </div>
    </Fragment>

  )
}

export default Items
