import React from "react";
import './InfoToolTip.css';
import ok from '../../images/ok_message.svg'
import error from '../../images/error_message.svg'

function InfoToolTip({
	isOpenPopupMessage,
	isRegister,
	isLoggedIn
}) {
	return (
		<div className={`popup popup_type_inform-message ${isOpenPopupMessage && "popup_opened"}`}>
			<div className="popup__form-conteiner">
				<button className="popup__button-close" type="button"></button>
				<img className="popup__image-symbol" src={isRegister || isLoggedIn ? ok : error} alt={isRegister || isLoggedIn ? 'символ подтверждения' : 'символ ошибки'} />
				<p className='popup__message'>{isRegister || isLoggedIn ? 'Вы успешно зарегистрировались!' : 'Что - то пошло не так! Попробуйте ещё раз.'}</p>
			</div>
		</div>
	)
}

export default InfoToolTip;