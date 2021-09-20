// vue router (Need to add routes for /cart)
let router = new VueRouter({
    routes: [
        { path: '/', component: main },
        { path: '/product/:pid', component: product, props: true },
        { path: '/cart', component: cart },
        { path: '/checkout', component: checkout },
        { path: '/complete', component: complete }
    ]
});

let app = new Vue({
    el: '#app',
    router: router
})