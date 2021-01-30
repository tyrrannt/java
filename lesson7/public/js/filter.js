Vue.component('search-form', {
    data: {
        searchForm: '',
    },
    template: `
                <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(searchForm)">
                <input type="text" class="search-field" v-model="searchForm">
                <button class="btn-search" type="submit">Поиск...</button>
            </form>
    `
});