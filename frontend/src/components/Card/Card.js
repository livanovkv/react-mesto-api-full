import React, { useContext } from "react";
import "./Card.css";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);

	const handleClick = () => {
		onCardClick(card);
	};

	const handleDeleteClick = () => {
		onCardDelete(card);
	}

	const handleLikeClick = () => {
		onCardLike(card);
	}

	return (
		<li className="card">
			<button className="card__delete-button" type="button"
				style={isOwn ? { visibility: "visible" } : { visibility: "hidden" }}
				onClick={handleDeleteClick}>
			</button>
			<img
				className="card__image"
				src={card.link}
				alt={card.name}
				onClick={handleClick}
			/>
			<h2 className="card__title">{card.name}</h2>
			<button type="button"
				className={`card__choise-button ${isLiked ? 'card__choise-button_active' : ''}`}
				onClick={handleLikeClick} />
			<span className="card__number-likes">{card.likes.length}</span>
		</li>
	);
}
export default Card;
