import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-icon" type="button" onClick={() => props.onClose(false)}></button>
                <h3 className="popup__title">{props.title}</h3>
                <form className="popup__form form" name={props.name} action="#" onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button className="popup__button" type="submit">{props.submitButtonText}</button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;