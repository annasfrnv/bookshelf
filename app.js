(function () {
	'use stict';

	let form = new Form({
		el: document.querySelector('body')
	});

	let Book = window.Item;

	new Book({
		el: document.querySelector('.books'),

		data: {
			items: [
				{
					cover: 		'img/book1.jpg',
					title: 		'Важные годы',
					blurb: 		'Почему не стоит откладывать жизнь на потом',
					href: 		'http://www.mann-ivanov-ferber.ru/books/opredelyayushhie_10_let/'
				},

				{
					cover: 		'img/book2.jpg',
					title: 		'Не отвлекайте меня!',
					blurb: 		'Как сохранять высокую концентрацию несмотря ни на что',
					href: 		'http://www.mann-ivanov-ferber.ru/books/ne-otvlekajte-menja/'
				},

				{
					cover: 		'img/book3.jpg',
					title: 		'На пределе',
					blurb: 		'Неделя без жалости к себе',
					href: 		'http://www.mann-ivanov-ferber.ru/books/na-predele/'
				}
			]
		}
	});

})();
