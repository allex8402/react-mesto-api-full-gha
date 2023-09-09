import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onDeletePopup }) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__hart ${isLiked && 'element__hart_active'}`
    );
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card, isLiked);
    }

    function handleDeleteClick() {
        onDeletePopup(card);
    }

    return (
        <li className="element" key={card._id}>
            {isOwn && <button className='element__remove' onClick={handleDeleteClick} />}
            <img
                className="element__img" alt={card.link ? "" : card.name}
                style={{
                    backgroundImage: `url(${card.link})`, backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                onClick={handleClick} />
            <div className="element__content">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__hart-counter">

                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="element__likes">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;