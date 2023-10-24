import { Fragment } from 'react'
import Item from './Item'
import { type Item as ItemType, Receipt } from '../../../util';
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
}): JSX.Element => {

  // const addItem = (item: ItemType) => {
  //   setItems([...items, item] )
  // }

  // const deleteItem= (id: string) => {
  //   setItems(items.filter(item => item.id !== id));
  // }

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
