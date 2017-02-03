export default class ShoppingCartView {
	constructor (){
		console.log("Added ShoppingCartView");
        this.initShoppingCart()
	}

    initShoppingCart() {
        $("#cartIcon").click(this, function(e) {
            $("#cartView").fadeIn("slow");
        });
    }
}
