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

Modal.displayName = 'Modal';

Modal.propTypes = {
    children: propTypes.node,
    show: propTypes.bool,
    onClose: propTypes.func,
}

export default Modal;