import React from 'react';
import '../css/Modal.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null; // Nếu không mở thì không render gì cả
    }

    return (
        // Lớp nền mờ, click vào đây sẽ đóng Modal
        <div className="modal-backdrop" onClick={onClose}>
            {/* Nội dung Modal, ngăn sự kiện click lan ra lớp nền */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
