(function () {
	'use stict';

	//import
	let Form = window.Form;
	let Item = window.Item;

	let form = new Form({
		el: document.querySelector('body'),
		template: '#form'
	});

	let item = new Item({
		el: document.querySelector('.books'),
		template: '#books',

		data: {
			items: [
				{
					cover: 	'img/book1.jpg',
					title: 	'Важные годы',
					blurb: 	'Почему не стоит откладывать жизнь на потом',
					href: 	'http://www.mann-ivanov-ferber.ru/books/opredelyayushhie_10_let/'
				},

				{
					cover: 	'img/book2.jpg',
					title: 	'Не отвлекайте меня!',
					blurb: 	'Как сохранять высокую концентрацию несмотря ни на что',
					href: 	'http://www.mann-ivanov-ferber.ru/books/ne-otvlekajte-menja/'
				},

				{
					cover: 	'img/book3.jpg',
					title: 	'На пределе',
					blurb: 	'Неделя без жалости к себе',
					href: 	'http://www.mann-ivanov-ferber.ru/books/na-predele/'
				},


			]
		}
	});

	form.el.addEventListener('add', function (event) {
		item.addItem(event.detail);
	});

	item.el.addEventListener('remove', function (event) {
		item.removeItem(event.detail);
	});

	window.item = item;

})();
