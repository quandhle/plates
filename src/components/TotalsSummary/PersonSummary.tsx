import React from 'react'

const PersonSummary = ({ name, total }: { name: string, total: number }): JSX.Element => {
  return (
        <div className="flex align-middle items-center">
            <div>{name}</div>
            <div>{total}</div>
        </div>
  )
}

export default PersonSummary
