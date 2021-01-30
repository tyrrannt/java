Vue.component('good', {
    name: "good",
    data() {
        return {
            goodUrl: '/getBasket.json',
            goodItems: [],
            showgood: false,
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.goodItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.goodItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.goodItems.splice(this.goodItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.goodUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.goodItems.push(el);
                }
            });
    },
    template: `
<div>
            <button class="btn-good" type="button" @click="showgood = !showgood">Корзина</button>
            <div class="good-block" v-show="showgood">
                <p v-if="!goodItems.length">Корзина пуста</p>
                <good-item class="good-item" 
                v-for="item of goodItems" 
                :key="item.id_product"
                :good-item="item" 
                :img="item.id_product"
                @remove="remove">
                </good-item>
            </div>
</div>`
});
Vue.component('good-item', {
    name: "good-item",
    props: ['goodItem', 'img'],
    template: `
                <div class="good-item">
                    <div class="product-bio">
                        <img v-bind:src="'images/cart/'+img+'sm.jpg'" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{goodItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{goodItem.quantity}}</p>
                            <p class="product-single-price">$ {{goodItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{goodItem.quantity*goodItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', goodItem)">&times;</button>
                    </div>
                </div>
    `
});
