import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidator from "../../hooks/useFormValidator/useFormValidator";

function EditProfilePopup({
	isOpen,
	onClose,
	onUpdateUser,
	downloadText,
	isButtonDisabled,
	setIsButtonDisabled
}) {
	const { setIsEventInput, setIsOpenForm, isValidForm, isValidInput, isErrorMessage } = useFormValidator();

	const { nameErrorMessage = '', aboutErrorMessage = '' } = isErrorMessage;

	const { nameValidInput = true, aboutValidInput = true } = isValidInput;

	const [name, setName] = useState({});

	const [description, setDescription] = useState({});

	function handleNameChange(event) {
		setIsEventInput(event);
		setName(event.target.value);
	}

	function handleAboutChange(event) {
		setIsEventInput(event);
		setDescription(event.target.value);
	}

	const currentUser = useContext(CurrentUserContext);

	useEffect(() => {
		setIsOpenForm(isOpen);
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	function handleSubmit(event) {
		event.preventDefault();
		setIsButtonDisabled(true);
		onUpdateUser(name, description);
	}

	return (
		<PopupWithForm
			name="profileform"
			title="Редактировать профиль"
			buttonText={downloadText ? 'Сохраняем...' : 'Сохранить'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isButtonDisabled={isButtonDisabled}
			isValidForm={isValidForm}
		>
			<input
				id="inputName"
				className={`popup__form-input popup__form-input_name ${!nameValidInput ? "popup__form-input_error" : ''}`}
				required
				placeholder="Имя"
				spellCheck="true"
				type="text"
				name="name"
				minLength="2"
				maxLength="40"
				onChange={handleNameChange}
				value={name || ''}
			/>
			<span className={`inputName-error popup__input-error ${!nameValidInput ? "popup__input-error_visible" : ''}`}>{nameErrorMessage}</span>
			<input
				id="inputAbout"
				className={`popup__form-input popup__form-input_about ${!aboutValidInput ? "popup__form-input_error" : ''}`}
				required
				placeholder="О себе"
				spellCheck="true"
				type="text"
				name="about"
				minLength="2"
				maxLength="200"
				onChange={handleAboutChange}
				value={description || ''}
			/>
			<span className={`inputAbout-error popup__input-error ${!aboutValidInput ? "popup__input-error_visible" : ''}`}>{aboutErrorMessage}</span>
		</PopupWithForm>
	)
}

export default EditProfilePopup;