import React, { useState } from "react";
import { Link, Route, withRouter } from 'react-router-dom';
import useFormValidator from "../../hooks/useFormValidator/useFormValidator";
import './Login.css';

function Login({
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
		<div className={`authorization authorization_type_login ${isValidFormRegister && "onValiddator"}`}>
			<h1 className="authorization__title">Вход</h1>
			<form
				className={`authorization__form authorization__form_type_login`}
				name={`loginForm`}
				noValidate
				onSubmit={handleSubmit}
			>
				<input
					id={`loginEmail-input`}
					className={`authorization__input authorization__input_login-email ${!emailValidInput ? "authorization__input_type_error" : ''}`}
					required
					placeholder="Email"
					spellCheck="true"
					type="Email"
					name='email'
					onChange={handleEmailChange}
					value={isEmail}
				/>
				<span className={`authorization__input-error loginEmail-input-error ${!emailValidInput ? "authorization__input-error_active" : ''}`}>{emailErrorMessage}</span>
				<input
					id={`loginPassword-input`}
					className={`authorization__input authorization__input_login-password ${!passwordValidInput ? "authorization__input_type_error" : ''}`}
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
				<span className={`authorization__input-error loginPassword-input-error ${!passwordValidInput ? "authorization__input-error_active" : ''}`}>{passwordErrorMessage}</span>
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

export default withRouter(Login);