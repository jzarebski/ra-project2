/**
 * Created by Edward_J_Apostol on 2017-01-29.
 */

export default class ShoppingCart{

    constructor(){
        console.log("creating shopping cart");
        if(Storage){
            this.ss = sessionStorage;
            // you can create a shoppingCart!
            this.initShoppingCart();
        } else
        {
            console.log("Error! SessionStorage not supported in your browser!");
        }
    }

    initShoppingCart(){
        // create the sessionStorage object that will be used
        // to store the items.
        console.log("finished creating shopping cart----------new new new");
    }

    addItemToCart(sku){
        console.log("adding items to cart")
        let numMatches = 0;

        for (var i = 0; i < this.ss.length; i++) {

            if ( this.ss.key(i) == sku){
                console.log("I found an item with a matching sku : " + sku);

                let oldQuanity = this.ss.getItem(sku);
                console.log("oldVal is equal to " + oldQuanity);

                this.ss.setItem(sku, parseInt(oldQuanity) + 1);
                console.log("I just set the value to: " + this.ss.getItem(sku));
                numMatches = 1;
                //break;
            }

        }
        if(numMatches == 0){
            console.log("could not find sku in memory adding now")
            this.ss.setItem(sku,1);
        }


    }

    removeItemFromCart(sku){

    }

    updateQuantityofItemInCart(sku,qty){

    }

    clearCart(){
        // clear the entire cart
    }


}
