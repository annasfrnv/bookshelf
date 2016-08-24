/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _form = __webpack_require__(1);

	var _form2 = _interopRequireDefault(_form);

	var _items = __webpack_require__(3);

	var _items2 = _interopRequireDefault(_items);

	var _model = __webpack_require__(4);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var form = new _form2.default({
		el: document.querySelector('body'),
		template: '#form'
	}); //import


	var item = new _items2.default({
		el: document.querySelector('.books'),
		template: '#books',
		data: { items: [] }
	});

	var model = new _model2.default({
		url: 'books',
		data: {}
	});

	form.el.addEventListener('add', function (event) {
		model.setData(event.detail);
		model.save(function (itemData) {
			item.addItem(itemData);
		}); // сохранить на сервере
	});

	item.el.addEventListener('remove', function (event) {
		var itemName = item.getNameByIndex(event.detail);
		item.removeItem(event.detail);
		model.delete(itemName);
	});

	model.fetch(item.render.bind(item));

	window.item = item;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _engine = __webpack_require__(2);

	var _engine2 = _interopRequireDefault(_engine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Form = function () {
		function Form(options) {
			_classCallCheck(this, Form);

			this.el = options.el;
			this.data = options.data;
			this.form = this.el.querySelector('.form-area');

			this._template = document.querySelector(options.template).innerHTML;

			this.render();
			this._initEvents();
		}

		_createClass(Form, [{
			key: 'render',
			value: function render() {
				this.form.innerHTML = (0, _engine2.default)(this._template);
			}

			/**
	   * Get form's field by name
	   * @param  {string} name
	   * @return {HTMLElement}
	   */

		}, {
			key: 'getField',
			value: function getField(name) {
				return this.el.querySelector('[name="' + name + '"]');
			}

			/**
	  * Сообщение миру о случившемся
	  * @param {string} name тип события
	  * @param {Object} data объект события
	  */

		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				var widgetEvent = new CustomEvent(name, {
					bubbles: true,
					detail: data
				});

				this.el.dispatchEvent(widgetEvent);
			}
		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('click', this._onClick.bind(this));
				this.el.addEventListener('submit', this._onSubmit.bind(this));
			}
		}, {
			key: '_onClick',
			value: function _onClick(event) {
				var target = event.target;

				if (target.classList.contains('form__add-cta')) {
					event.preventDefault();
					this.form.classList.remove('hidden');
				}

				if (target.classList.contains('form__delete')) {
					event.preventDefault();
					this.form.classList.add('hidden');
				}
			}
		}, {
			key: '_onSubmit',
			value: function _onSubmit(event) {
				event.preventDefault();

				this.trigger('add', {
					cover: this.getField('cover').files[0],
					title: this.getField('title').value,
					blurb: this.getField('blurb').value,
					href: this.getField('href').value
				});

				this.el.querySelector('form').reset();
				this.form.classList.add('hidden');
			}
		}]);

		return Form;
	}();

	//Export


	exports.default = Form;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var templateEngine = function templateEngine(html, options) {
		var re = /<%([^%>]+)?%>/g,
		    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
		    code = 'var r=[];\n',
		    cursor = 0,
		    match;
		var add = function add(line, js) {
			js ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' : code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '';
			return add;
		};
		while (match = re.exec(html)) {
			add(html.slice(cursor, match.index))(match[1], true);
			cursor = match.index + match[0].length;
		}
		add(html.substr(cursor, html.length - cursor));
		code += 'return r.join("");';
		return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
	};

	exports.default = templateEngine;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _engine = __webpack_require__(2);

	var _engine2 = _interopRequireDefault(_engine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Item = function () {
		function Item(options) {
			_classCallCheck(this, Item);

			this.el = options.el;
			this.data = options.data;
			this._template = document.querySelector(options.template).innerHTML;

			this.render();
			this._initEvents();
		}

		/**
	  * Добавляем элемент меню
	  * @param {Object} item
	  */


		_createClass(Item, [{
			key: 'addItem',
			value: function addItem(item) {
				this.data.items.unshift(item);
				this.render();
			}

			/**
	   * Удаляем пункт меню из данных
	   * @param  {Object} itemIndex
	   */

		}, {
			key: 'removeItem',
			value: function removeItem(itemIndex) {

				if (itemIndex > -1) {
					this.data.items.splice(itemIndex, 1);
				}

				this.render();
			}
		}, {
			key: 'getNameByIndex',
			value: function getNameByIndex(itemIndex) {
				var itemName = null;

				if (itemIndex > -1) {
					itemName = this.data.items[itemIndex].name;
				}

				return itemName;
			}
		}, {
			key: 'render',
			value: function render(data) {

				if (data) {
					this.data = data;
				}

				this.el.innerHTML = (0, _engine2.default)(this._template, this.data);
			}

			/**
	  * Сообщение миру о случившемся
	  * @param {string} name тип события
	  * @param {Object} data объект события
	  */

		}, {
			key: 'trigger',
			value: function trigger(name, data) {
				var widgetEvent = new CustomEvent(name, {
					bubbles: true,
					detail: data
				});

				this.el.dispatchEvent(widgetEvent);
			}
		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this.el.addEventListener('click', this._removeOnClick.bind(this));
			}
		}, {
			key: '_removeOnClick',
			value: function _removeOnClick(event) {
				var target = event.target;
				var items = Array.prototype.slice.call(this.el.children);

				if (target.classList.contains('book__delete')) {
					this.trigger('remove', items.indexOf(target.parentNode));
				}
			}
		}, {
			key: '_animateLoading',
			value: function _animateLoading(on, object) {
				if (on) {
					object.className += ' animate-spin';
				} else {
					object.className = object.className.replace(' animate-spin', '');
				}
			}
		}]);

		return Item;
	}();

	//Export


	exports.default = Item;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BASE_URL = 'https://bookshelf-d1330.firebaseio.com/';

	var Model = function () {
		function Model(options) {
			_classCallCheck(this, Model);

			this.data = options.data || {};
			this.url = options.url;
			this.id = options.id;
		}

		_createClass(Model, [{
			key: 'getData',
			value: function getData() {
				return this.data;
			}
		}, {
			key: 'setData',
			value: function setData(data) {
				this.data = data;
			}

			/**
	   * Загрузка данных с сервера
	   * @param  {Function} callback
	   * @return {XMLHttpRequest}
	   */

		}, {
			key: 'fetch',
			value: function fetch(callback) {
				var _this = this;

				var req = this._makeRequest('GET');

				req.onreadystatechange = function () {
					if (req.readyState != 4) return;

					if (req.status != 200) {
						console.log('error!');
					} else {
						var data = _this.parse(req.responseText);
						var items = [];

						for (var key in data) {
							data[key].name = key;
							items.push(data[key]);
						}

						_this.data = { items: items };

						callback(_this.getData());
					}
				};

				req.send();

				return req;
			}
		}, {
			key: 'save',
			value: function save(callback) {
				var _this2 = this;

				var reader = new FileReader();

				reader.readAsDataURL(this.data.cover);

				reader.onload = function (event) {
					var req = _this2._makeRequest('POST');
					_this2.data.cover = event.target.result;

					req.onreadystatechange = function () {
						if (req.readyState != 4) return;

						if (req.status != 200) {
							console.log('error!');
						} else {
							var data = _this2.parse(req.responseText);
							_this2.data.name = data.name;

							callback(_this2.data);
						}
					};

					var reqString = JSON.stringify(_this2.getData());
					req.send(reqString);
				};
			}
		}, {
			key: 'delete',
			value: function _delete(itemId) {
				var req = new XMLHttpRequest();

				req.open('DELETE', BASE_URL + this.url + '/' + itemId + '.json', false);
				req.send();
			}

			/**
	   * Создание объекта запроса
	   * @param {string} method - HTTP method
	   * @return {XMLHttpRequest}
	   */

		}, {
			key: '_makeRequest',
			value: function _makeRequest(method) {
				var xhr = new XMLHttpRequest();

				xhr.open(method, BASE_URL + this.url + '.json', false);
				return xhr;
			}

			/**
	   * Преобразлвание тескта отвева в данные
	   * @param {string} responseText
	   * @return {Object}
	   */

		}, {
			key: 'parse',
			value: function parse(responseText) {
				return JSON.parse(responseText);
			}
		}]);

		return Model;
	}();

	//export


	exports.default = Model;

/***/ }
/******/ ]);