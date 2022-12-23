class Auth {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}
	_checkResponse(res) {
		return res.ok
			? res.json()
			: Promise.reject(res.json())
	}

	register(password, email) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ password, email })
		})
			.then(this._checkResponse)
	};

	authorize(password, email) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ password, email })
		})
			.then(this._checkResponse)
	};

	checkToken(token) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: this._headers = {
				...this._headers,
				'Authorization': `Bearer ${token}`
			}
		})
			.then(this._checkResponse)
	}
}

export const auth = new Auth({
	baseUrl: 'https://auth.nomoreparties.co',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});