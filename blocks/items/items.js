(function () {
	'use strict';

	class Item {
		constructor (options) {
			this.el = options.el;
			this.data = options.data;

			this.render();

			this._initEvents();
		}

		get _template () {
			return document.querySelector('#books').innerHTML;
		}

		render () {
			this.el.insertAdjacentHTML('beforeend', TemplateEngine(this._template, this.data));
		}

		_initEvents () {
			this.el.addEventListener('click', this._removeItem.bind(this));
		}

		_removeItem () {
			let target = event.target;

		    if (target.classList.contains('book__delete')) {
		    	this.el.removeChild(target.parentNode);
		    }
		}
	}

	//Export
	window.Item = Item;
})(window);
