Vue.component('search-form', {
    name: "search-form",
    data: {
        searchForm: '',
    },
    template: `
			<div class="search_box pull-right">
                <form action="#" @submit.prevent="$parent.$refs.products.filter(searchForm)">
					<input type="text" v-model="searchForm">
					<button type="submit">Поиск...</button>
				</form>
			</div>
    `
});
