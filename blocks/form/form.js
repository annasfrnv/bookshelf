(function () {
	'use strict';

	class Form {
		constructor(options) {
			this.el = options.el;
			this.form = this.el.querySelector('.form-area');
			
			this.data = {};
			this.render();

			this.submitBtn = this.el.querySelector('.form__submit');

			this._initEvents();
		}

		get _template () {
			return document.querySelector('#form').innerHTML;
		}

		render () {
			this.form.innerHTML = TemplateEngine(this._template);
		}


		_initEvents () {
			this.el.addEventListener('click', this._onClick.bind(this));
			this.submitBtn.addEventListener('click', this._onSubmit.bind(this));
			this.form.addEventListener('click', this._onReset.bind(this));
		}

		_onClick (event) {

			event.preventDefault();

			let target = event.target;
			let hidden = true;

			if (target.classList.contains('form__add-cta')) {
				this.form.classList.remove('hidden');
				hidden = false;
			}

			if (target.classList.contains('form__delete') || target.classList.contains('form__submit')) {
				this.form.classList.add('hidden');
				hidden = true;
			}
		}


		_onSubmit (event) {
		    event.preventDefault();

		    this.data = {

		    	items: [
					{
						cover: 	'img/book1.jpg',
						title: 	this.el.querySelector('[name="title"]').value,
						blurb: 	this.el.querySelector('[name="description"]').value,
						href: 	this.el.querySelector('[name="url"]').value
					}
		    	]
		    };

		    this.createItem(this.data);

		    this.el.querySelector('form').reset();
		    this._onClick(event);
		}

		_onReset (event) {
			if (event.target.querySelector('[type=reset]')) {
				this.el.querySelector('form').reset();
			}
		}

		createItem (data) {
			let item = new Item({
				el: document.querySelector('.books'),
				data
			});
		}
	}

	//Export
	window.Form = Form;
})(window);
