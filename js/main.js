const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
const renderProduct = (title, price) => {
    return `<div class="product-item">
                <h3 class="product-item-h3">${title}</h3>
                <p class="product-item-p">${price}</p>
                <button class="product-item-buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    // const productsList = list.map(item => renderProduct(item.title, item.price)).join('');
    // console.log(productsList);
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
};

renderPage(products);