Vue.component('products', {
    name: "products",
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(searchForm) {
            let regexp = new RegExp(searchForm, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="item.id_product" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    name: "product",
    props: ['product', 'img'],
    template: `			
			<div class="col-sm-4">
							<div class="product-image-wrapper">
								<div class="single-products">
									<div class="productinfo text-center">
										<img v-bind:src="'images/home/'+img+'.jpg'" alt="" />
										<h2>{{product.price}} $</h2>
										<p>{{product.product_name}}</p>
										<button class="btn btn-default add-to-cart" @click="$parent.$parent.$refs.good.addProduct(product)"><i
												class="fa fa-shopping-cart">Купить</button>
									</div>									
								</div>
							</div>
						</div>
    `
})