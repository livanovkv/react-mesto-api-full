import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import './Header.css';
import MenuMobile from '../MenuMobile/MenuMobile';
import cross from '../../images/close_ico.svg';

function Header({
	email,
	isLoggedIn,
	handleExit
}) {
	const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false);

	const openedMenuMobile = () => {
		setIsOpenMenuMobile(!isOpenMenuMobile);
	}

	const onClickExit = () => {
		handleExit();
		setIsOpenMenuMobile(false);
	}
	return (
		<>
			{isOpenMenuMobile && isLoggedIn && <MenuMobile email={email} onClickExit={onClickExit} />}
			<header className="header">
				<div className="header__logo" title="Mesto React"></div>
				<Route exact path="/">
					<p className='header__email'>{email}
						<Link to="/sign-in" className="header__link-entry header__link-entry_type_color" onClick={onClickExit}>Выйти</Link>
					</p>
					<img
						className="header__close-menu"
						src={cross}
						alt="символ закрыть"
						onClick={openedMenuMobile}
						style={isOpenMenuMobile ? { display: "block" } : { display: "none" }}
					/>
					<div
						className="header__menu"
						onClick={openedMenuMobile}
						style={!isOpenMenuMobile ? { display: "block" } : { display: "none" }}
					>
						<div className="header__menu-img"></div>
						<div className="header__menu-img"></div>
						<div className="header__menu-img"></div>
					</div>
				</Route>
				<Route exact path="/sign-in">
					<Link to="/sign-up" className="header__link-entry">Регистрация</Link>
				</Route>
				<Route exact path="/sign-up">
					<Link to="/sign-in" className="header__link-entry">Войти</Link>
				</Route>
			</header>
		</>
	)
}

export default Header;