import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="relative rounded-lg shadow-sm max-w-sm w-full  z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-5 text-white text-gray-950"
          onClick={onClose}
        >
          <IoMdCloseCircleOutline />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
