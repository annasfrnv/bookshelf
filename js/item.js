'use strict';

class Item {
	constructor(options) {
		this.el = options.el;
		this.deleteButtons = this.el.querySelectorAll('.book__cta');

		this._initEvents();
	}

	_initEvents () {
		for (var i = 0; i < this.deleteButtons.length; i++) {
			this._registerClickEvent(i);
		}
	}

	_registerClickEvent (i) {
		this.deleteButtons[i].addEventListener('click', this._deleteItem);
	}

	_deleteItem (event) {

		let el = this.parentNode;

		el.classList.add('removed-item');

		setTimeout(function(){
			el.parentNode.removeChild(el);
		}, 790);
	}
}
