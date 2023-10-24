/* eslint-disable no-console */
/* eslint-disable no-debugger */
import React, { Fragment, ReactElement } from 'react';

const Modal = ({
  showModal,
  children,
  title
}: {
  showModal: boolean;
  children: React.ReactNode;
  title: string
}): ReactElement => {
  return (
    <Fragment>
      {showModal && (
        <div
          style={{
            transform: "translate(-50%, -50%)"
          }}
          className="flex-col align-middle items-center absolute p-4 w-1/2 left-1/2 top-1/2 bg-white border-2 transition ease-in-out visible opacity-100 shadow-gray-100"
        >
          <div className="text-center pb-4 w-full">{title}</div>
          {children}
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
