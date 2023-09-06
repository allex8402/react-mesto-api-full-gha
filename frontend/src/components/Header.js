import logo from '../images/Vector.svg';
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип страницы" />
            <nav className="header__auth">
                <p className="header__mail">{props.mail}</p>

                <Link to={props.route} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
            </nav>
        </header>
    )
}

export default Header;
