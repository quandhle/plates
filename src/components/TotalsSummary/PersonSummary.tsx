import React, { ReactElement } from 'react';
import { capitalizeFirstLetter, currencyFormat } from '../../util';

const PersonSummary = ({ name, total }: { name: string, total: number }): ReactElement => {
  return (
    <p className='flex'><span
      className='w-1/4'>{capitalizeFirstLetter(name)}: </span><span>{currencyFormat(total)}</span></p>
  )
}

export default PersonSummary
