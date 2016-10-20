import templateEngine from './../../template/engine.js';

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
	* Trigger an event
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
		this.el.addEventListener('submit', this._onSubmit.bind(this));
	}

	_onClick (event) {
		let target = event.target;

		if (target.classList.contains('form__add-cta')) {
			event.preventDefault();
			this.form.classList.remove('hidden');
		}

		if (target.classList.contains('form__delete')) {
			event.preventDefault();
			this.form.classList.add('hidden');
		}
	}

	_onSubmit (event) {
	    event.preventDefault();

	    this.trigger('add', {
			cover: 	this.getField('cover').files[0],
			title: 	this.getField('title').value,
			blurb: 	this.getField('blurb').value,
			href: 	this.getField('href').value
		});

	    this.el.querySelector('form').reset();
	    this.form.classList.add('hidden');
	}
}

//Export
export default Form;
