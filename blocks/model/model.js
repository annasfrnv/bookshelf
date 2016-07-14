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
		 * @param  {Function} callback
		 * @return {XMLHttpRequest}
		 */
		fetch (callback) {
			let req = this._makeRequest('GET');

			req.onreadystatechange = () => {
				if (req.readyState != 4) return;

				if (req.status != 200) {
					console.log('error!')
				} else {
					let data = this.parse(req.responseText);
					let items = [];

					for( var key in data ) {
						data[key].name = key;
						items.push(data[key]);
					}

					this.data = { items: items };

					callback(this.getData());
				}
			}

			req.send();

			return req;
		}

		save (callback) {
			let reader = new FileReader();

			reader.readAsDataURL( this.data.cover );

			reader.onload = (event) => {
				let req = this._makeRequest('POST');
				this.data.cover = event.target.result;

				req.onreadystatechange = () => {
					if (req.readyState != 4) return;

					if (req.status != 200) {
						console.log('error!');
					} else {
						let data = this.parse(req.responseText);
						this.data.name = data.name;

						callback(this.data);
					}
				}

				let reqString = JSON.stringify(this.getData());
				req.send(reqString);
			}

		}

        delete(itemId) {
        	let req = new XMLHttpRequest();

			req.open('DELETE', BASE_URL + this.url + '/' + itemId + '.json', false);
			req.send();
        }

		/**
		 * Создание объекта запроса
		 * @param {string} method - HTTP method
		 * @return {XMLHttpRequest}
		 */
		_makeRequest (method) {
			let xhr = new XMLHttpRequest();

			xhr.open(method, BASE_URL + this.url + '.json', false);
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