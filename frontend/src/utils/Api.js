export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка:${res.status}`);
  }


  //загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(res => this._handleResponse(res))
  }
  //Получить карточки
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then(res => this._handleResponse(res))
  }

  // Редактирование профиля
  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handleResponse(res))
  }
  // новая карточка
  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.image,
        link: data.link
      })
    })
      .then(res => this._handleResponse(res))
  }
  // обновление аватара
  editAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._handleResponse(res))
  }
  // удаление карточки
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => this._handleResponse(res))
  }
  // поставить лайк
  addLikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(res => this._handleResponse(res))
  }
  // удалить лайк
  deleteLikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => this._handleResponse(res))
  }
  // новый изменение статуса
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return api.addLikeCard(id)
    }
    return api.deleteLikeCard(id)
  }


}  //закрытие класса

const api = new Api({
  baseUrl: 'https://api.allexkate.nomoredomainsicu.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;