import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup({ card, isOpen, onClose, onCardDelete }) {

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Вы уверены?" name="delete" submitButtonText="Да">
        </PopupWithForm>
    )
}

export default DeletePopup;