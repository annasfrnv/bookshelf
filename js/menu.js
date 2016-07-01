"use strict";

class NewBook {
	constructor(options) {
		this.el = options.el;

		this._initEvents();
	}

	_initEvents () {
		this.el.addEventListener('click', this._onMenuClick.bind(this));
	}


	_onMenuClick (event) {
		let isItemClick = false;
		if (event.target.classList.contains('menu__item')) {
			isItemClick = true;
			this._onMenuItemClick(event);
		}

		if (!isItemClick) {
			this.el.classList.toggle('menu_open');
		} 
		
	}

}