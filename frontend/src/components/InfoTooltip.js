function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} >
            <div className="popup__info">
                <img className="popup__status" src={props.image} alt={props.title} />
                <h2 className="popup__message">{props.title}</h2>
                <button className="popup__close-icon" type="button" onClick={() => props.onClose(false)} />
            </div>
        </div>
    );
}

export default InfoTooltip;