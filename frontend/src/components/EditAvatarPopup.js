import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
        });
    }

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonText="Сохранить">
            <fieldset className="popup__fieldset" name="personal_info">
                <input className="popup__input popup__input_type_avatar" ref={avatarRef} id="avatar" type="url" name="avatar" placeholder="Ссылка на картинку" required />
                <span className="avatar-error error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;