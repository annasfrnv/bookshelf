//import
import Form from './../form/form.js'
import Item from './../items/items.js'
import Model from './../model/model.js'

let form = new Form({
	el: document.querySelector('body'),
	template: '#form'
});

let item = new Item({
	el: document.querySelector('.books'),
	template: '#books',
	data: { items: []}
});

let model = new Model({
	url: 'books',
	data: {}
});

form.el.addEventListener('add', function (event) {
	model.setData(event.detail);
	model.save(function(itemData){
		item.addItem(itemData);
	}); // save on server
});

item.el.addEventListener('remove', function (event) {
	let itemName = item.getNameByIndex(event.detail);
	item.removeItem(event.detail);
	model.delete(itemName);
});

model.fetch(item.render.bind(item));

window.item = item;


