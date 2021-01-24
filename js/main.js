const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        searchForm: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://placehold.it/50x100',
        products: [],
        imgProduct: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);//создание нового объекта на основе двух, указанных в параметрах
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter() {
            let regexp = new RegExp(this.searchForm, 'i');
            this.filtered = this.filtered.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                    console.log(item)
                }
            });
        // this.getJson(`getProducts.json`)
        //     .then(data => {
        //         for (let item of data) {
        //             //this.products.push(item);
        //             this.filtered.push(item);
        //         }
        //     })
    }

});



// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// class Good {
//     constructor(url, container, jsonFile, objectItem) {
//         this.url = url;
//         this.container = container;
//         this.obj = objectItem;

//         this.goods = [];
//         this.allGoods = [];
//         this._init();
//     }
//     fetchGood() {
//         return fetch(`${API_URL}/${jsonFile}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log('error');
//             })
//     }
//     render() {
//         const elem = document.querySelector(this.container);
//         for (let item of this.goods) {
//             const itemObj = new this.obj(item);//мы сделали объект товара либо CartItem, либо ProductItem
//             console.log(itemObj);
//             this.allGoods.push(itemObj);
//             elem.insertAdjacentHTML('beforeend', itemObj.render());
//         }
//     }

// }

// class ProductDB {
//     fetchProducts() {
//         return fetch(`${API_URL}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log('error');
//             })
//     }
// }

// class ProductsList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = [];
//         this.totalProducts = [];
//         this._fetchProducts()
//             .then(data => {
//                 this.goods = [...data];
//                 this.render()
//             });
//     }

//     _fetchProducts() {
//         return fetch(`${API_URL}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log('error');
//             })
//     }
//     render() {
//         const block = document.querySelector(this.container);

//         for (let product of this.goods) {
//             const productObj = new ProductItem(product);
//             this.totalProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render())
//         }

//     }
//     getSum() {
//         let result = this.totalProducts.reduce((sum, item) => sum += item.price, 0);
//         const block = document.querySelector('.top-box-button');
//         block.insertAdjacentHTML('beforeend', ': ' + result + ' руб.');
//     }
// }

// class ProductItem {
//     constructor(product) {
//         this.title = product.product_name;
//         this.price = product.price;
//         this.id = product.id_product;
//         this.img = `img/${product.id_product}.jpg`;
//     }

//     render() {
//         return `<div class="product-item  data-id="${this.id}">
//                 <img src="${this.img}" alt="Some img">
//                 <h3 class="product-item-h3">${this.title}</h3>
//                 <p class="product-item-p">${this.price}</p>
//                 <button class="product-item-buy-btn">Купить</button>
//             </div>`
//     }
// }

// function footer_date() {
//     let dt = new Date;
//     return document.querySelector('.container').insertAdjacentHTML("beforeend", `<p class="m-0 text-center text-white">Copyright &copy; GeekShop ${dt.getFullYear()}</p>`)
// }

// let list = new ProductsList();
// list.render();
// footer_date()

// class Baskets {
//     add_good() {

//     }
//     remove_good() {

//     }
// }

// class BasketsItem {

// }