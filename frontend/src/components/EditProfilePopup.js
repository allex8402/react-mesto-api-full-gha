import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = React.useContext(CurrentUserContext)
    const [name, setName] = React.useState(currentUser.name || '');
    const [description, setDescription] = React.useState(currentUser.about || '');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        if (isOpen && currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        if (name && description) {
            onUpdateUser({
                name,
                about: description,
            });
        }
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="user" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonText="Сохранить">
            <fieldset className="popup__fieldset" name="personal_info">
                <input id="name" className="popup__input popup__input_type_name" type="text" name="name" value={name} onChange={handleNameChange} required minLength="2" maxLength="40" placeholder="Имя" />
                <span className="name-error error"></span>
                <input id="job" className="popup__input popup__input_type_job" type="text" name="about" value={description} onChange={handleDescriptionChange} required minLength="2" maxLength="200" placeholder="Занятие" />
                <span className="job-error error"></span>
            </fieldset>
        </PopupWithForm>)
}

export default EditProfilePopup;