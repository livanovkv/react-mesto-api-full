import React from "react";
import "./PopupWithForm.css";

function PopupWithForm({
	name,
	isOpen,
	title,
	buttonText,
	children,
	onSubmit,
	isButtonDisabled,
	isValidForm }) {
	return (
		<div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
			<div className="popup__form-conteiner">
				<button
					className="popup__button-close"
					type="button"
					aria-label="Закрыть"
				></button>
				<h3 className="popup__form-title">{title}</h3>
				<form
					className={`popup__form popup__form_${name}`}
					name={`${name}`}
					onSubmit={onSubmit}
					noValidate
				>
					{children}
					<button className={`popup__form-button-save ${!isValidForm ? "popup__form-button-save_disabled" : ''}`}
						type="submit"
						disabled={isButtonDisabled || !isValidForm ? true : false}>
						{buttonText}
					</button>
				</form>
			</div>
		</div >
	);
}

export default PopupWithForm;
