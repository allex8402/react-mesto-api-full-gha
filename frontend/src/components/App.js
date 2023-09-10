import React from 'react';

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import * as auth from "../utils/auth";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import success from '../images/Union.png';
import fail from '../images/Unionx.png';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [removeCard, setRemoveCard] = React.useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [emailName, setEmailName] = React.useState(null);
  const [popupImage, setPopupImage] = React.useState("");
  const [popupTitle, setPopupTitle] = React.useState("");
  const [infoTooltip, setInfoTooltip] = React.useState(false);



  // Обработчики открытия попапов
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleDeletePopupClick = (card) => {
    setIsDeletePopupOpen(true);
    setRemoveCard(card)
  };


  // Обработчик клика по карточке
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  // Обработчик лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  // Удаление карточки
  function handleCardDelete(card) {
    // Отправляем запрос в API для удаления карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => card._id !== c._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Обновление информации о пользователе
  function handleUpdateUser(userData) {
    api
      .editProfile({
        name: userData.name,
        about: userData.about
      })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Обновление аватара пользователя
  function handleUpdateAvatar(data) {
    api
      .editAvatar({ avatar: data.avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Добавление новой карточки
  const handleAddPlaceSubmit = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };
  // регистрация
  function onRegister(email, password) {
    auth.registerUser(email, password).then(() => {
      setPopupImage(success);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      setPopupImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoTooltip);
  }
  // авторизация
  function onLogin(email, password) {
    auth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmailName(email);
      navigate("/");
    }).catch(() => {
      setPopupImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt).then((res) => {
        console.log(res, res.data, res.data.email)
        if (res.data) {
          setIsLoggedIn(true);
          setEmailName(res.data.email);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);


  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);


  // Получение данных пользователя и начальных карточек при загрузке компонента (добавили массив зависимости )
  React.useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);


  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function onSignOut() {
    setCurrentUser('');
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Routes>
          <Route path="/sign-in" element={
            <>
              <Header title="Регистрация" route="/sign-up" />
              <Login onLogin={onLogin} />
            </>
          } />

          <Route path="/sign-up" element={
            <>
              <Header title="Войти" route="/sign-in" />
              <Register onRegister={onRegister} />
            </>
          } />
          <Route exact path="/" element={
            <>
              <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
              <ProtectedRoute
                component={Main}
                isLogged={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onDeletePopup={handleDeletePopupClick}
              />
              <Footer />
            </>
          } />

          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
        </Routes>
        {/* <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onDeletePopup={handleDeletePopupClick}
        />
        // <Footer /> */}

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <DeletePopup card={removeCard} isOpen={isDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          image={popupImage}
          title={popupTitle}
          isOpen={infoTooltip}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;