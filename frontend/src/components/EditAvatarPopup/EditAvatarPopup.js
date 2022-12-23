import React, { useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidator from "../../hooks/useFormValidator/useFormValidator";

function EditAvatarPopup({
	isOpen,
	onUpdateAvatar,
	downloadText,
	isButtonDisabled,
	setIsButtonDisabled
}) {
	const { setIsEventInput, setIsOpenForm, isValidForm, isValidInput, isErrorMessage } = useFormValidator();

	const { avatarUrlErrorMessage = '' } = isErrorMessage;

	const { avatarUrlValidInput = true } = isValidInput;

	const avatarRef = useRef();

	useEffect(() => {
		setIsOpenForm(isOpen);
		avatarRef.current.value = "";
	}, [isOpen]);

	function handleSubmit(event) {
		event.preventDefault();
		setIsButtonDisabled(true);
		onUpdateAvatar({
			avatar: avatarRef.current.value,
		});
	}

	function handleUrlChange(event) {
		setIsEventInput(event);
	}

	return (
		<PopupWithForm
			name="addAvatar"
			title="Обновить аватар"
			buttonText={downloadText ? "Загружаем аватар..." : "Загрузить"}
			isOpen={isOpen}
			onSubmit={handleSubmit}
			isButtonDisabled={isButtonDisabled}
			isValidForm={isValidForm}
		>
			<input
				id="avatarUrl-input"
				className={`popup__form-input popup__form-input_avatar-url ${!avatarUrlValidInput ? "popup__input_type_error" : ''}`}
				required
				placeholder="Ссылка на картинку"
				spellCheck="true"
				type="url"
				name="avatarUrl-input"
				ref={avatarRef}
				onChange={handleUrlChange}
				value={avatarRef.value}
			/>
			<span className={`avatarUrl-input-error popup__input-error ${!avatarUrlValidInput ? "popup__input-error_visible" : ''}`}>{avatarUrlErrorMessage}</span>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;