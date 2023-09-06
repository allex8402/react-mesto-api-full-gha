import React from 'react';
import { Link } from "react-router-dom";

function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmail(evt) {
        setEmail(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(email, password);
    }

    return (
        <section className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" type="email" placeholder="Email" value={email} onChange={handleEmail} required />
                <input className="register__input" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePassword} required />
                <button className="register__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="register__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link> </p>
        </section>
    );
}

export default Register;