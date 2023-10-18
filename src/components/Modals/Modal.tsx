/* eslint-disable no-console */
/* eslint-disable no-debugger */
import React, { Fragment } from "react";

const Modal = ({
  showModal,
  children
}: {
  showModal: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Fragment>
      {showModal && (
        <div
          style={{
            transform: "translate(-50%, -50%)"
          }}
          className="flex-col align-middle items-center absolute w-1/2 left-1/2 top-1/2 bg-white border-2 transition ease-in-out visible opacity-100 shadow-gray-100"
        >
          {children}
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
