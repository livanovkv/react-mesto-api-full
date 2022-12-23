import React from "react";
import "./ImagePopup.css";

function ImagePopup({ card, onClose }) {
	return (
		<div className={`popup popup_image ${card && "popup_opened"}`}>
			<div className="popup__image-conteiner">
				<button
					className="popup__button-close"
					type="button"
					aria-label="Закрыть"
					onClick={onClose}
				></button>
				<img
					className="popup__image-item"
					src={card && card.link}
					alt={card && card.name}
				/>
				<h2 className="popup__image-title">{card && card.name}</h2>
			</div>
		</div>
	);
}

export default ImagePopup;
