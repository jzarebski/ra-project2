/**
 * Created by Edward_J_Apostol on 2017-01-28.
 */

import BestBuyWebService from './BestBuyWebService';
import CatalogView from './CatalogView';
import ShoppingCart from './ShoppingCart';
import ShoppingCartView from './ShoppingCartView';




export default class App {

    constructor() {
        //console.log("hi")
        this.productData = null; // this will store all our data
        this.products = null; // stores specifically the products
        this.shoppingCart = new ShoppingCart();
        this.catalogView = new CatalogView(); // this will display our data

        //this.shoppingCartView = new ShoppingCartView;
        // call the initBestBuyWebService to initialize the
        // BestBuy Web Service and return the data
        this.initBestBuyWebService();
        this.initShoppingCart();
        //this.initquickView ();
    }

    initBestBuyWebService() {
        this.bbws = new BestBuyWebService();
        // use your own API key for this (the one from Cody)
        this.bbws.apiKey = "8ccddf4rtjz5k5btqam84qak";

        // this uses 'backticks' for long multi-line strings
        this.bbws.url = `https://api.bestbuy.com/v1/products(manufacturer=ASUS&(categoryPath.id=abcat0502000))?apiKey=${this.bbws.apiKey}&format=json`;
        //abcat0502000
        // pass the reference to this app to store the data
        this.bbws.getData(this);

    }

    prepCatalog() {
        // use this console.log to test the data
        // console.log(this.productData);

        if (this.productData != null) {
            // only get the products property (for now)
            // this code was copied from SimpleHTTPRequest.html
            this.products = this.bbws.getProducts();
            // console.log(this.products, "here i am producting");
        }

        this.showCatalog();
    }

    showCatalog() {

        // populate the catalog only if there are products
        if (this.productData != null) {
            this.catalogView.addProductsToCarousel(this.products,this);
            // this.catalogView.showCatalog();

        }


    }

    initShoppingCart() {
        $("#cartIcon").click(this, function (e) {
            $("#cartView, .overlay").fadeIn("slow");
        });
        $(".overlay").click(this, function (e) {
            $(".overlay, #cartView").fadeOut("slow");
        });
    }
}



