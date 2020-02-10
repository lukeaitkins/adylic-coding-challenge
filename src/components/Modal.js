import React from 'react';

const Modal = ({ children, show, onClose }) => (
    <div className={`modal-background ${show ? 'visible' : ''}`}>
        <div className="modal">
            <button className="button-close" onClick={onClose}>
                x
            </button>
            { children }
        </div>
    </div>
);

export default Modal;