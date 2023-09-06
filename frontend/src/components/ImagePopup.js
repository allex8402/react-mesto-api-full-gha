import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup-image ${card ? 'popup_opened' : ''}`}>
            <div className=" popup-image__container ">
                <button className="popup__close-icon" type="button" onClick={() => onClose(false)}></button>
                <img className="popup-image__img" src={card ? card.link : ''} alt={card ? card.name : ''} />
                <p className="popup-image__caption"> {card ? card.name : ''}</p>
            </div>
        </div>
    )
}
export default ImagePopup;