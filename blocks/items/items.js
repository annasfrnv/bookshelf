'use strict';

class Item {
	constructor (options) {
		this.el = options.el;

		this._initEvents();
	}

	_initEvents () {
		this.el.addEventListener('click', this._removeItem.bind(this));
	}

	_removeItem () {
		
		let target = event.target;

		while (target != this.el) {
		    if (target.classList.contains('book__cta')) {
		      target.parentNode.hidden = !target.parentNode.hidden;
		    }

		    target = target.parentNode;
		}
	}
}
