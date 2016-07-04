'use strict';

class Form {
	constructor(options) {
		this.el = options.el;
		this.addBtn = this.el.querySelector('.add-btn');
		this.deleteBtn = this.el.querySelector('.form__cta--delete');

		this.form = this.el.querySelector('.form-area');

		this._initEvents();
	}

	_initEvents () {
		this.addBtn.addEventListener('click', this._addOnClick.bind(this));
		this.deleteBtn.addEventListener('click', this._removeOnClick.bind(this));
	}

	_addOnClick (event) {
		event.preventDefault();

		let hidden = true;

		if (hidden) {
			this.form.classList.remove('hidden');
			hidden = false;
		}
	}

	_removeOnClick (event) {

		let hidden = false;

		if (!hidden) {
			this.form.classList.add('hidden');
			hidden = true;
		}

	}
}
