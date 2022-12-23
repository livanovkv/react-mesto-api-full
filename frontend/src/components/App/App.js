import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ImagePopup from '../ImagePopup/ImagePopup';
import React, { useState, useEffect } from "react";
import { Route, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { api } from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ConfirmDeletePopup from '../ConfirmDeletePopup/ConfirmDeletePopup';
import { auth } from '../../utils/Auth';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import Login from '../Login/Login';
import Register from '../Register/Register';


function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
	const [isDownload, setIsDownload] = useState(false);
	const [isDeleteCard, setIsDeleteCard] = useState({});
	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isOpenPopupMessage, setIsOpenPopupMessage] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isEmail, setIsEmail] = useState('')
	const history = useHistory();
	const [isRegister, setIsRegister] = useState(false);
	const [isValidFormRegister, setIsValidFormRegister] = useState(true)
	const isOpen =
		isEditAvatarPopupOpen ||
		isEditProfilePopupOpen ||
		isAddPlacePopupOpen ||
		selectedCard ||
		isConfirmDeletePopupOpen ||
		isOpenPopupMessage

	const handleTokenCheck = () => {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			auth
				.checkToken(jwt)
				.then(({ data }) => {
					setIsEmail(data.email);
					setIsLoggedIn(true);
					history.push('/');
				})
				.catch((err) => {
					err.then(({ message }) => {
						console.log(`Ошибка токена "${message}"`)
					})
				})
		}
	}

	const handleExit = () => {
		localStorage.removeItem("jwt");
		setIsLoggedIn(false);
		history.push('/sign-in');
	}

	useEffect(() => {
		handleTokenCheck();
		if (isLoggedIn) {
			Promise.all([api.getUserInfo(), api.getCards()])
				.then(([userData, cards]) => {
					setCurrentUser(userData);
					setCards(cards);
				})
				.catch((err) => {
					err.then(({ message }) => {
						alert(message)
					})
				})
		}
	}, [isLoggedIn]);

	useEffect(() => {
		function closeByEscape(event) {
			if (event.key === 'Escape') {
				closeAllPopups();
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', closeByEscape);
			return () => {
				document.removeEventListener('keydown', closeByEscape);
			}
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		function handleOverley(event) {
			if (event.target.classList.contains('popup_opened') ||
				event.target.classList.contains('popup__button-close')) {
				closeAllPopups();
			}
		};
		document.addEventListener("mousedown", handleOverley);
		return () => document.removeEventListener("mousedown", handleOverley);
	}, [isOpen]);

	const handleEditAvatarClick = () => {
		setIsButtonDisabled(false)
		setIsEditAvatarPopupOpen(true);
		setIsValidFormRegister(false);
	};

	const handleEditProfileClick = () => {
		setIsButtonDisabled(false)
		setIsEditProfilePopupOpen(true);
		setIsValidFormRegister(false);
	};

	const handleAddPlaceClick = () => {
		setIsButtonDisabled(false)
		setIsAddPlacePopupOpen(true);
		setIsValidFormRegister(false);
	};

	const handleDeleteCardClick = () => {
		setIsButtonDisabled(false)
		setIsConfirmDeletePopupOpen(true);
		setIsValidFormRegister(false);
	};

	const updateDeleteCard = (card) => {
		setIsButtonDisabled(false)
		setIsDeleteCard(card);
		handleDeleteCardClick();
	};

	const handleCardClick = (card) => {
		setSelectedCard({
			name: card.name,
			link: card.link,
		});
	};

	const closeAllPopups = () => {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false);
		setIsConfirmDeletePopupOpen(false);
		setSelectedCard(null);
		setIsOpenPopupMessage(false)
		setIsValidFormRegister(true);
	}

	const handleUpdateUser = (name, about) => {
		setIsDownload(true);
		api
			.editUserInfo(name, about)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => {
				err.then((res) => {
					alert(res.message)
				})
			})
			.finally(() => setIsDownload(false))
	}

	const handleEditAvatar = ({ avatar }) => {
		setIsDownload(true);
		api
			.editAvatar(avatar)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((err) => {
				err.then(({ message }) => {
					alert(message)
				})
			})
			.finally(() => setIsDownload(false))
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		const changeLikeCardStatus =
			!isLiked
				? api.addLike(card._id)
				: api.deleteLike(card._id)

		changeLikeCardStatus
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
			})
			.catch((err) => {
				err.then(({ message }) => {
					alert(message)
				})
			})
	}

	function handleCardDelete(card) {
		setIsDownload(true);
		api
			.deleteCard(card._id)
			.then(() => {
				closeAllPopups();
				setCards((state) => state.filter((item) => item._id !== card._id));
			})
			.catch((err) => {
				err.then((res) => {
					alert(res.message)
				})
			})
			.finally(() => setIsDownload(false))
	}

	const handleAddPlaceSubmit = (name, link) => {
		setIsDownload(true);
		api
			.addCard(name, link)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => {
				err.then((res) => {
					alert(res.message)
				})
			})
			.finally(() => setIsDownload(false))
	};

	const onSubmitRegister = (password, email) => {
		setIsDownload(true);
		auth
			.register(password, email)
			.then(({ data }) => {
				setIsButtonDisabled(false)
				setIsOpenPopupMessage(true);
				setIsEmail(data.email);
				history.push('/sign-in');
				setIsRegister(true)
			})
			.catch((err) => {
				err.then(({ error }) => {
					setIsButtonDisabled(false)
					setIsOpenPopupMessage(true);
					setIsRegister(false)
					console.log(`Ошибка регистрации ${error}`)
				})
			})
			.finally(() => setIsDownload(false))
	}

	const onSubmitLogin = (password, email) => {
		setIsDownload(true);
		auth
			.authorize(password, email)
			.then(({ token }) => {
				localStorage.setItem("jwt", token);
				setIsButtonDisabled(false)
				history.push('/');
				setIsLoggedIn(true);
			})
			.catch((err) => {
				err.then(({ message }) => {
					setIsButtonDisabled(false)
					setIsOpenPopupMessage(true);
					setIsLoggedIn(false)
					setIsRegister(false)
					console.log(`Ошибка входа ${message}`)
				})
			})
			.finally(() => setIsDownload(false))
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header
					email={isEmail}
					isLoggedIn={isLoggedIn}
					handleExit={handleExit}
				/>

				<Route exact path="*">

					<ProtectedRoute
						exact
						path="/"
						component={Main}
						onEditProfile={handleEditProfileClick}
						onEditAvatar={handleEditAvatarClick}
						onAddPlace={handleAddPlaceClick}
						onCardDelete={updateDeleteCard}
						onCardClick={handleCardClick}
						onCardLike={handleCardLike}
						cards={cards}
						isLoggedIn={isLoggedIn}
					/>
				</Route>
				<Route path="/sign-up">

					<Register
						buttonText={`${!isDownload ? 'Зарегистрироваться' : 'Регистрирую...'}`}
						isButtonDisabled={isButtonDisabled}
						setIsButtonDisabled={setIsButtonDisabled}
						onSubmit={onSubmitRegister}
						isEmail={isEmail}
						setIsEmail={setIsEmail}
						isValidFormRegister={isValidFormRegister}
					/>
				</Route>

				<Route path="/sign-in">

					<Login
						buttonText={`${!isDownload ? 'Войти' : 'Проверяю...'}`}
						isButtonDisabled={isButtonDisabled}
						setIsButtonDisabled={setIsButtonDisabled}
						isEmail={isEmail}
						setIsEmail={setIsEmail}
						onSubmit={onSubmitLogin}
						isValidFormRegister={isValidFormRegister}
					/>

				</Route>
				{isLoggedIn && <Footer />}

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onUpdateUser={handleUpdateUser}
					downloadText={isDownload}
					isButtonDisabled={isButtonDisabled}
					setIsButtonDisabled={setIsButtonDisabled}
				/>

				<AddPlacePopup
					onAddPlace={handleAddPlaceSubmit}
					isOpen={isAddPlacePopupOpen}
					downloadText={isDownload}
					isButtonDisabled={isButtonDisabled}
					setIsButtonDisabled={setIsButtonDisabled}
				/>

				<EditAvatarPopup
					onUpdateAvatar={handleEditAvatar}
					isOpen={isEditAvatarPopupOpen}
					downloadText={isDownload}
					isButtonDisabled={isButtonDisabled}
					setIsButtonDisabled={setIsButtonDisabled}
				/>

				<ConfirmDeletePopup
					isOpen={isConfirmDeletePopupOpen}
					card={isDeleteCard}
					isConfirm={handleCardDelete}
					downloadText={isDownload}
					isButtonDisabled={isButtonDisabled}
					setIsButtonDisabled={setIsButtonDisabled}
				/>

				<ImagePopup card={selectedCard} />
				<InfoToolTip
					isOpenPopupMessage={isOpenPopupMessage}
					isRegister={isRegister}
					isLoggedIn={isLoggedIn}
				/>
			</div>
		</CurrentUserContext.Provider >
	);
}

export default App;