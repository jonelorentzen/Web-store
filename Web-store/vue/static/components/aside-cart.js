Vue.component('aside-cart', {
    template: `
    <aside>
        <router-link to="/cart">
            <h2>Cart</h2>
        </router-link>
            <table class="cart-table">
                <tbody>
                    <tr v-for="item in cart">
                        <td>{{ item.title }}</td>
                        <td>{{ item.size }}</td>
                        <td class="table-end">{{ item.count }}</td>
                    </tr>
                </tbody>
            </table>
        
    </aside>
    `,
    computed: {
        cart: function(){
            return store.cart.map(
                function(item){
                    if (store.products && store.products[item.pid]){
                        item.title = store.products[item.pid].title;
                    }
                    return item;
                }
            );
        }
    }
})