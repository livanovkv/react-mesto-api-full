class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_checkResponse(res) {
		return res.ok ? res.json() : Promise.reject(res.json());
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: this._headers
		})
			.then(this._checkResponse)
	}

	getCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			headers: this._headers
		})
			.then(this._checkResponse)
	}

	editUserInfo(name, about) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({ name, about })
		})
			.then(this._checkResponse)
	}

	addCard(name, link) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ name, link })
		})
			.then(this._checkResponse)
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then(this._checkResponse)
	}

	addLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'PUT',
			headers: this._headers
		})
			.then(this._checkResponse)
	}

	deleteLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'DELETE',
			headers: this._headers
		})
			.then(this._checkResponse)
	}

	editAvatar(avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({ avatar })
		})
			.then(this._checkResponse)
	}
}

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
	headers: {
		'authorization': 'dde845eb-5fd1-447a-bf24-a8e053a8e958',
		'Content-Type': 'application/json'
	}
});