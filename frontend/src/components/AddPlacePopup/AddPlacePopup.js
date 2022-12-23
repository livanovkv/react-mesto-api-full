import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidator from "../../hooks/useFormValidator/useFormValidator";

function AddPlacePopup({
	isOpen,
	onAddPlace,
	downloadText,
	isButtonDisabled,
	setIsButtonDisabled
}) {
	const { setIsEventInput, setIsOpenForm, isValidForm, isValidInput, isErrorMessage } = useFormValidator();

	const { cardTitleErrorMessage = '', cardLinkErrorMessage = '' } = isErrorMessage;

	const { cardTitleValidInput = true, cardLinkValidInput = true } = isValidInput;

	const [name, setName] = useState("");

	const [link, setLink] = useState("");

	function handleNameChange(event) {
		setIsEventInput(event);
		setName(event.target.value);
	};

	function handleLinkChange(event) {
		setIsEventInput(event);
		setLink(event.target.value);
	};

	useEffect(() => {
		setIsOpenForm(isOpen)
		setName("");
		setLink("");
	}, [isOpen]);

	function handleSubmit(event) {
		event.preventDefault();
		setIsButtonDisabled(true);
		onAddPlace(name, link);
	}

	return (
		<PopupWithForm
			name="cardform"
			title="Новое место"
			buttonText={downloadText ? "Добавляем карточку..." : "Добавить"}
			isOpen={isOpen}
			onSubmit={handleSubmit}
			isButtonDisabled={isButtonDisabled}
			isValidForm={isValidForm}
		>
			<input
				id='cardTitle-input'
				className={`popup__form-input popup__form-input_title ${!cardTitleValidInput ? "popup__form-input_error" : ''}`}
				required
				placeholder="Название"
				spellCheck="true"
				type="text"
				name="inputTitle"
				minLength="2"
				maxLength="30"
				value={name}
				onChange={handleNameChange}
			/>
			<span className={`inputTitle-error popup__input-error ${!cardTitleValidInput ? "popup__input-error_visible" : ''}`}>{cardTitleErrorMessage}</span>
			<input
				id="inputUrl"
				className={`popup__form-input popup__form-input_link ${!cardLinkValidInput ? "popup__form-input_error" : ''}`}
				required
				placeholder="Ссылка на картинку"
				spellCheck="true"
				type="url"
				name="cardLink"
				value={link}
				onChange={handleLinkChange}
			/>
			<span className={`inputUrl-error popup__input-error ${!cardLinkValidInput ? "popup__input-error_visible" : ''}`}>{cardLinkErrorMessage}</span>
		</PopupWithForm>
	)
}

export default AddPlacePopup;