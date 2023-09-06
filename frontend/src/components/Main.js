import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, onDeletePopup }) {

    const currentUser = React.useContext(CurrentUserContext)

    return (<div>
        <main>
            <section className="profile">
                <img className="profile__avatar" style={{
                    backgroundImage: `url(${currentUser.avatar})`, backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} alt={currentUser.avatar ? "" : "Аватар"} />
                <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <div className="profile__card">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__rectangle" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {cards.map((card) => (
                        <Card key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            onDeletePopup={onDeletePopup} />
                    ))}
                </ul>
            </section>
        </main>
    </div>
    );
}

export default Main;