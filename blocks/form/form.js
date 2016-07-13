(function () {
	'use strict';

	let templateEngine = window.templateEngine;

	class Form {
		constructor(options) {
			this.el = options.el;
			this.data = options.data;
			this.form = this.el.querySelector('.form-area');

			this._template = document.querySelector(options.template).innerHTML;

			this.render();
			this._initEvents();
		}

		render () {
			this.form.innerHTML = templateEngine(this._template);
		}

		/**
		 * Get form's field by name
		 * @param  {string} name
		 * @return {HTMLElement}
		 */
		getField (name) {
			return this.el.querySelector(`[name="${name}"]`);
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
			this.el.addEventListener('click', this._onClick.bind(this));
			this.form.addEventListener('submit', this._onSubmit.bind(this));
		}

		_onClick (event) {
			let target = event.target;
			let hidden = true;

			if (target.classList.contains('form__add-cta')) {
				event.preventDefault();
				this.form.classList.remove('hidden');
				hidden = false;
			}

			if (target.classList.contains('form__delete') || target.classList.contains('form__submit')) {
				event.preventDefault();
				this.form.classList.add('hidden');
				hidden = true;
			}
		}


		_onSubmit (event) {
			debugger;
		    event.preventDefault();
		    console.log("opp");

		    this.trigger('add', {
				cover: 	this.getField('cover').value,
				title: 	this.getField('title').value,
				blurb: 	this.getField('blurb').value,
				href: 	this.getField('href').value
			});

		    this.el.querySelector('form').reset();
		}

	}

		//Export
		window.Form = Form;
})(window);
