let checkout = {
    template: `
    <main class="content main">
        <div>
            <h1>Cart</h1>
            <div class="cart-element framed">
                <div> 
                <table class="cart-table">
                    <thead>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Count</th>
                        <th>Item price</th>
                        <th>Discount</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in thecart">
                            <td>{{item.title}}</td>
                            <td>{{item.size}}</td>
                            <td>{{item.count}}</td>
                            <td>{{product[item.pid]["price"]}}</td>
                            <td>{{product[item.pid]["discount"]}}%</td>
                            <td>{{ price(item.pid)}}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>Total:</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{total()}}</td>
                            <td class="table-end"></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <h1>Checkout</h1>
            <div class="cart-element framed">
                <div>
                <form>
                    <fieldset class="framed">
                        <legend>Billing details</legend>
                        <label>First Name
                        <input type="text" name="first_name" id="first_name" disabled v-model="addresses.firstname"></label>
                        <label>Last Name
                        <input type="text" name="last_name" id="last_name" disabled v-model="addresses.lastname"></label>
                        <label>Email
                        <input type="email" name="email" id="email" v-model="addresses.email" disabled required></label>
                    </fieldset>
                    <fieldset class="framed">
                        <legend>Delivery address</legend>
                        <label>Street
                        <input type="text" name="street" id="street" disabled required v-model="addresses.street"></label>
                        <label>City
                        <input type="text" name="city" id="city" required disabled v-model="addresses.city"></label>
                        <label>Postal Code
                        <input type="text" min="0" name="postal" id="postal" required disabled v-model="addresses.postalcode"></label>
                    </fieldset>
                    <fieldset class="framed flexbox space_between">
                            <legend>Submit order</legend>
                            <label for="AGB" class="checkboxlabel"><input type="checkbox" name="AGB" id="AGB" required>I agree to the general terms of service.</label>
                            <p>Check cart and address above and submit</p>
                            <button type="button" v-on:click="sendDB()">Submit</button>
                    </fieldset>
                </form>
                </div>
            </div>
        </div>
    </main>
    `,

    computed: {
        thecart: function () {
            return store.cart;
        },
        product: function () {
            return store.products;
        },
        addresses: function () {
            return store.addresses
        }
    },

    methods: {
        price: function (item) {
            prod = this.product;
            if (prod[item]["discount"] == 0) {
                return prod[item]["price"];
            } else {
                disc = prod[item]["discount"];
                pricy = prod[item]["price"] * (100 - disc);
                return pricy / 100;
            }
        },
        total: function () {
            sum = 0
            cart = this.thecart
            prod = this.product
            for (let i = 0; i < cart.length; i++) {
                idx = cart[i].pid;
                count = cart[i].count;
                newPrice = this.price(idx);
                sum += newPrice * count;
            }
            return sum
        },
        remove: function (item) {
            if (item.count > 1) {
                item.count -= 1;
            } else {
                this.thecart.splice(item, 1)
            }
        },
        sendDB: function () {
            var xhr = new XMLHttpRequest();
            var allinfo = Object.assign({}, store.cart, store.addresses)
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    router.push("complete")
                }
            }
            xhr.open("POST", "/order", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify(allinfo))

        }
    }
}
