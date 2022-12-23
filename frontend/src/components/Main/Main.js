import React, { useContext } from "react";
import './Main.css';
import Card from "../Card/Card";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main({
	onEditAvatar,
	onEditProfile,
	onAddPlace,
	onCardClick,
	onCardLike,
	cards,
	onCardDelete
}) {
	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__circle" onClick={onEditAvatar}>
					<img
						className="profile__avatar-image"
						src={currentUser.avatar}
						alt="Аватар профиля"
					/>
				</div>
				<div className="profile__info">
					<h1 className="profile__title">{currentUser.name}</h1>
					<button
						className="profile__edit-button"
						type="button"
						aria-label="Редактировать"
						onClick={onEditProfile}
					></button>
					<p className="profile__subtitle">{currentUser.about}</p>
				</div>
				<button
					className="profile__add-button"
					type="button"
					aria-label="Добавить"
					onClick={onAddPlace}
				></button>
			</section>

			<section className="gallery">
				<ul className="gallery__grid">
					{cards.map(card => {
						return (
							<Card
								key={card._id}
								card={card}
								onCardClick={onCardClick}
								onCardLike={onCardLike}
								onCardDelete={onCardDelete}
							/>
						);
					})}
				</ul>
			</section>
		</main>
	)
}

export default Main;
