// проверка ответа от сервера
function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}
// базовый URL
export const BASE_URL = "https://mesto.nomoreparties.co/v1/cohort-66";

// регистрация в сервисе
export function registerUser(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
}
// авторизация в сервисе
export function loginUser(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
}
// запрос проверки валидности и получения email
export function getToken(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    }).then(handleResponse);
}