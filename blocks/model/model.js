(function() {
	'use strict';

	const BASE_URL = 'https://bookshelf-d1330.firebaseio.com/';

	class Model {
		constructor(options) {
			this.data = options.data || {};
			this.url = options.url;
			this.id = options.id;
		}

		getData () {
			return this.data;
		}

		setData (data) {
			this.data = data;
		}

		/**
		 * Загрузка данных с сервера
		 * @param  {Function} resolve
		 * @return {XMLHttpRequest}
		 */
		fetch (resolve) {
			let req = this._makeRequest('GET');

			req.onreadystatechange = () => {
				if (req.readyState != 4) return;

				if (req.status != 200) {
					console.log('error!')
				} else {
					let data = this.parse(req.responseText);
					this.data = data;

					resolve(this.getData());
				}
			}

			req.send();

			return req;
		}

		save (resolve) {
			let req = this._makeRequest('POST');

			req.onreadystatechange = () => {
				if (req.readyState != 4) return;

				if (req.status != 200) {
					//TODO: обаботать ошибки запроса
				} else {
					let data = this.parse(req.responseText);
					this.data = data;

					resolve(this);
				}
			}

			let reqString = JSON.stringify(this.getData());
			req.send(reqString);
		}

		/**
		 * Создание объекта запроса
		 * @param {string} method - HTTP method
		 * @return {XMLHttpRequest}
		 */
		_makeRequest (method) {
			let xhr = new XMLHttpRequest();

			xhr.open(method, BASE_URL + this.url + '/' + this.id + '.json', false);
			return xhr;
		}

		/**
		 * Преобразлвание тескта отвева в данные
		 * @param {string} responseText
		 * @return {Object}
		 */
		parse (responseText) {
			return JSON.parse(responseText);
		}
	}

	//export
	window.Model = Model;
})();