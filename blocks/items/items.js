(function () {
	'use strict';

	let templateEngine = window.templateEngine;

	class Item {
		constructor (options) {
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
		addItem (item) {
			this.data.items.unshift(item);
			this.render();
		}

		/**
		 * Удаляем пункт меню из данных
		 * @param  {Object} itemIndex
		 */
		removeItem (itemIndex) {

			if (itemIndex > -1) {
			    this.data.items.splice(itemIndex, 1);
			}

			this.render();
		}

		getNameByIndex (itemIndex) {
			let itemName = null;

			if (itemIndex > -1) {
				itemName = this.data.items[itemIndex].name;
			}

			return itemName;
		}

		render (data) {

			if (data) {
	 			this.data = data;
	 		}

			this.el.innerHTML = templateEngine(this._template, this.data);

		}

		/**
		* Сообщение миру о случившемся
		* @param {string} name тип события
		* @param {Object} data объект события
		*/
		trigger (name, data) {
			let widgetEvent = new CustomEvent(name, {
				bubbles: true,
				detail: data
			});

			this.el.dispatchEvent(widgetEvent);
		}

		_initEvents () {
			this.el.addEventListener('click', this._removeOnClick.bind(this));
		}

		_removeOnClick (event) {
			let target = event.target;
			let items = Array.prototype.slice.call( this.el.children );

		    if (target.classList.contains('book__delete')) {
		    	this.trigger('remove', items.indexOf(target.parentNode));
		    }
		}

		_animateLoading (on, object) { 
			if (on) {
				object.className += ' animate-spin';
			} else {
				object.className = object.className.replace(' animate-spin', '');
			}
		}
	}

	//Export
	window.Item = Item;
})(window);
