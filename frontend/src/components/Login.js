import React from 'react';

function Login(props) {

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
        props.onLogin(email, password);
    }

    return (
        <section className="register">
            <h2 className="register__title">Вход</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" type="email" placeholder="Email" value={email} onChange={handleEmail} required />
                <input className="register__input" type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePassword} required />
                <button className="register__button" type="submit"> Войти</button>
            </form>
        </section>
    );
}

export default Login;