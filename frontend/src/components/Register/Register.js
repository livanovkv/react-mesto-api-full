import React, { useState } from "react";
import { Link, Route, withRouter } from 'react-router-dom';
import useFormValidator from "../../hooks/useFormValidator/useFormValidator";
import './Register.css';

function Register({
	buttonText,
	isButtonDisabled,
	setIsButtonDisabled,
	onSubmit,
	isEmail,
	setIsEmail,
	isValidFormRegister
}) {
	const { setIsEventInput, isValidForm, isValidInput, isErrorMessage } = useFormValidator();

	const { emailErrorMessage = '', passwordErrorMessage = '' } = isErrorMessage;

	const { emailValidInput = true, passwordValidInput = true } = isValidInput;

	const [isPassword, setIsPassword] = useState('');

	function handleEmailChange(event) {
		setIsEmail(event.target.value.trim());
		setIsEventInput(event);
	}

	function handlePasswordChange(event) {
		setIsPassword(event.target.value);
		setIsEventInput(event);
	}

	function handleSubmit(event) {
		event.preventDefault();
		setIsButtonDisabled(true);
		onSubmit(isPassword, isEmail)
	}

	return (
		<div className={`authorization authorization_type_register ${isValidFormRegister && "onValiddator"}`}>
			<h1 className="authorization__title">Регистрация</h1>
			<form
				className={`authorization__form authorization__form_type_register`}
				name={`registerForm`}
				noValidate
				onSubmit={handleSubmit}
			>
				<input
					id={`registerEmail-input`}
					className={`authorization__input authorization__input_register-email ${!emailValidInput ? "authorization__input_type_error" : ''}`}
					required
					placeholder="Email"
					spellCheck="true"
					type="Email"
					name='email'
					onChange={handleEmailChange}
					value={isEmail}
				/>
				<span className={`authorization__input-error registerEmail-input-error ${!emailValidInput ? "authorization__input-error_active" : ''}`}>{emailErrorMessage}</span>
				<input
					id={`registerPassword-input`}
					className={`authorization__input authorization__input_register-password ${!passwordValidInput ? "authorization__input_type_error" : ''}`}
					required
					placeholder="Пароль"
					spellCheck="true"
					type="password"
					name='password'
					minLength="6"
					maxLength="12"
					onChange={handlePasswordChange}
					value={isPassword}
				/>
				<span className={`authorization__input-error registerPassword-input-error ${!passwordValidInput ? "authorization__input-error_active" : ''}`}>{passwordErrorMessage}</span>
				<button
					className={`authorization__save-button ${isButtonDisabled || isValidForm ? "authorization__save-button_active" : ''}`}
					type="submit"
					disabled={isButtonDisabled || !isValidForm ? true : false}
				>
					{buttonText}
				</button>
			</form>
			<Route exact path="/sign-up">
				<p className="authorization__comment">Уже зарегистрированы?
					<Link className="authorization__link-entry" to="/sign-in"> Войти</Link>
				</p>
			</Route>
		</div>
	)
}

export default withRouter(Register);