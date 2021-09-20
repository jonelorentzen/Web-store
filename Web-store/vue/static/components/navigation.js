Vue.component('navigation', {
    template: `
        <nav>
            <ul>
                <li>
                    <router-link to="/"><i class="fa fa-home"></i></router-link>
                </li>
                <li>
                    <router-link v-bind:to="'/product/' + first()"><i class="fa fa-percent"></i></router-link>
                </li>
                <li>
                    <router-link to="/cart"><i class="fa fa-shopping-cart"></i></router-link>
                </li>
            </ul>
        </nav>
    `,
    methods: {
        first: function () {
            return Object.keys(store.products)[0];
        }
    }
})
