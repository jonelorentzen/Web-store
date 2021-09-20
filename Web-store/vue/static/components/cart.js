let cart = {
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
                        <th class="table-end">Cancel</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in thecart">
                            <td>{{item.title}}</td>
                            <td>{{item.size}}</td>
                            <td>{{item.count}}</td>
                            <td>{{product[item.pid]["price"]}}</td>
                            <td>{{product[item.pid]["discount"]}}%</td>
                            <td>{{ price(item.pid)}}</td>
                            <td class="table-end"><button v-on:click="remove(item)">X</button></td>
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
                <form onsubmit="sendInfo()">
                    <fieldset class="framed">
                        <legend>Billing details</legend>
                        <label>First Name
                        <input type="text" name="firstname" id="firstname" required v-model="addresses.firstname"></label>
                        <label>Last Name
                        <input type="text" name="last_name" id="last_name" required v-model="addresses.lastname"></label>
                        <label>Email
                        <input type="email" name="email" id="email"  maxlength="20" required v-model="addresses.email"></label>
                    </fieldset>
                    <fieldset class="framed"> 
                        <legend>Delivery address</legend>
                        <label>Street
                        <input type="text" name="street" id="street" required v-model="addresses.street"></label>
                        <label>City
                        <input type="text" name="city" id="city" required v-model="addresses.city"></label>
                        <label>Postal Code
                        <input type="text" min="0" name="postal" id="postal" required v-model="addresses.postalcode"></label>
                    </fieldset>
                    <fieldset class="framed flexbox space_between">
                            <legend>Submit order</legend>
                            <label for="AGB" class="checkboxlabel"><input type="checkbox" name="AGB" id="AGB" v-model="addresses.check" required>I agree to the general terms of service.</label>
                            <router-link to="/checkout"><button type="submit" >Submit</button></router-link>
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
            return store.addresses;
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
            return sum.toFixed(1);
        },
        remove: function (item) {
            if (item.count > 1) {
                item.count -= 1;
            } else {
                this.thecart.splice(item, 1)
            }
        },
        sendInfo: function () {

            return store.addresses
        }
    }
}
