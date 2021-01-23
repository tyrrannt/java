const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class Good {
    constructor(url, container, jsonFile, objectItem) {
        this.url = url;
        this.container = container;
        this.obj = objectItem;

        this.goods = [];
        this.allGoods = [];
        this._init();
    }
    fetchGood() {
        return fetch(`${API_URL}/${jsonFile}`)
            .then(result => result.json())
            .catch(error => {
                console.log('error');
            })
    }
    render() {
        const elem = document.querySelector(this.container);
        for (let item of this.goods) {
            const itemObj = new this.obj(item);//мы сделали объект товара либо CartItem, либо ProductItem
            console.log(itemObj);
            this.allGoods.push(itemObj);
            elem.insertAdjacentHTML('beforeend', itemObj.render());
        }
    }

}

class ProductDB {
    fetchProducts() {
        return fetch(`${API_URL}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('error');
            })
    }
}

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.totalProducts = [];
        this._fetchProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }

    _fetchProducts() {
        return fetch(`${API_URL}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('error');
            })
    }
    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.totalProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }

    }
    getSum() {
        let result = this.totalProducts.reduce((sum, item) => sum += item.price, 0);
        const block = document.querySelector('.top-box-button');
        block.insertAdjacentHTML('beforeend', ': ' + result + ' руб.');
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = `img/${product.id_product}.jpg`;
    }

    render() {
        return `<div class="product-item  data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3 class="product-item-h3">${this.title}</h3>
                <p class="product-item-p">${this.price}</p>
                <button class="product-item-buy-btn">Купить</button>
            </div>`
    }
}

function footer_date() {
    let dt = new Date;
    return document.querySelector('.container').insertAdjacentHTML("beforeend", `<p class="m-0 text-center text-white">Copyright &copy; GeekShop ${dt.getFullYear()}</p>`)
}

let list = new ProductsList();
list.render();
footer_date()

class Baskets {
    add_good() {

    }
    remove_good() {

    }
}

class BasketsItem {

}