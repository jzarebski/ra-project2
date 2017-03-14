/**
 * Created by Edward_J_Apostol on 2017-01-28.
 */

// this class is responsible for displaying the product data...
// Perhaps in a carousel.
export default class CatalogView{

    constructor() {
        this.carousel = document.getElementsByClassName("owl-carousel");
        // this.initCarousel();
        this.theApp = null;

    }

    initCarousel() {
        //console.log("initializing carousel");
        $(document).ready(function(){
            $('.owl-carousel').owlCarousel({
                items:1,
                loop:true,
                autoplay:true,
                responsive : {
                    0:{
                        items:1
                    }, //from zero to 600 screen
                    601:{
                        items:2
                    }, //from 600 to 1050 screen
                    1050:{
                        items:4
                    } //from 1050 to 1240 screen
                }


            });
        });
        //console.log("carousel active");
        /*
         You should initialize the flickicity carousel here.
         Right now this code just adds the div tags you would need to add
         inside the carousel 'container'.
         Note that this.carousel refers to the div by its class attribute.
         Since more than one tag can belong to the same class,
         you either have to give the carousel tag an id as well...or
         refer to the carousel div tag as this.carousel[0] using bracket
         notation (since classes mean their *could* be more than one tag
         belonging to that class) - see line 88 below.
         */
        //this.carousel = document.getElementById("owl-carousel");

    }

    onClickCartButton(theApp) {
        //console.log(theApp);
        return function (e) {
            //console.log("onClickButton");
            //console.log(e.target.getAttribute("data-sku"));
            let sku = e.target.getAttribute("data-sku");
            theApp.shoppingCart.addItemToCart(sku);
        }
    }
    addProductsToCarousel(products, theApp){
        this.theApp = theApp;
        if (products === undefined || products == null) {
            return; // do not do anything! there is no data
        }

        /* the loop creates all the elements for each item in the carousel.
         * it recreates the following structure
         * <div class="product-wrapper">
         * <img src="images/stretch-knit-dress.jpg" alt="Image of stretch knit dress" />
         * <p class="product-type">Dresses</p>
         * <h3>Stretch Knit Dress</h3>
         * <p class="price">$169.00</p>
         * </div>
         * */

        for (let p = 0; p < products.length; p++) {
            let product = products[p];
            //console.log(product);
            // each product is a product object
            // use it to create the element

            // create the DIV tag with class 'product-wrapper'
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "product-wrapper");

            // create a new IMG tag. Suggest to add data-sku attribute here too
            // so that if you 'click' on the image, it would pop up a quick-view
            // window and you can use the sku.
            let newImg = document.createElement("img");
            newImg.setAttribute("src", product.image);
            newImg.setAttribute("alt", `${product.name}`); // this works too
            newImg.setAttribute("data-sku", product.sku);

            // create a new Paragraph to show a description
            let newPara = document.createElement("p");
            newPara.setAttribute("class", "product-type");
            let newParaTextNode = document.createTextNode(product.longDescription);
            newPara.appendChild(newParaTextNode);

            // create a new H3 tag to show the name
            let newH3Tag = document.createElement("h3");
            let newH3TagTextNode = document.createTextNode(product.name);
            newH3Tag.appendChild(newH3TagTextNode);

            let newPricePara = document.createElement("p");
            newPricePara.setAttribute("class", "price");
            let newPriceParaTextNode = document.createTextNode(product.regularPrice);
            newPricePara.appendChild(newPriceParaTextNode);

            /* you will need similar code to create
             an add to cart and a quick view button
             remember that each button you create should have
             a data-sku attribute that corresponds to the sku
             of each product.
             */

            let quickViewButton = document.createElement("button");
            quickViewButton.setAttribute("id", `qv_${product.sku}`);
            quickViewButton.setAttribute("data-sku", product.sku);
            quickViewButton.setAttribute("type", "button");
            quickViewButton.setAttribute("class", "quickViewBtn");
            let quickViewTextNode = document.createTextNode("Quick View");
            quickViewButton.appendChild(quickViewTextNode);
            quickViewButton.addEventListener("click",this.qView(products,this.theApp),false);

            let addToCartButton = document.createElement("button");
            addToCartButton.setAttribute("id", `cart_${product.sku}`);
            addToCartButton.setAttribute("data-sku", product.sku);
            addToCartButton.setAttribute("type", "button");
            addToCartButton.setAttribute("class", "add2Cart");
            let addToCartTextNode = document.createTextNode("Add To Cart");

            addToCartButton.appendChild(addToCartTextNode);
            //console.log("this.theApp is");
            //console.log(this.theApp);
            addToCartButton.addEventListener("click", this.onClickCartButton(this.theApp), false);
            //console.log("click cart button");
            newDiv.appendChild(newImg);
            newDiv.appendChild(newPara);
            newDiv.appendChild(newH3Tag);
            newDiv.appendChild(newPricePara);
            newDiv.appendChild(quickViewButton);
            newDiv.appendChild(addToCartButton);
            this.carousel[0].appendChild(newDiv);
            // console.log(this.carousel[0]);

        }
        // console.log(this.carousel[0]);
        this.initCarousel();
    }


    qView(products){
        let output = "";
        // console.log(products,"im over here now");
        return function(e) {

        let dataSku = e.target.getAttribute("data-sku");
            for (let p=0;p<products.length;p++){
                let currentProducts = products[p];
                let productsSku = currentProducts.sku;
                if (currentProducts.sku.toString() == dataSku.toString()) {
                    let img = currentProducts.image;
                    let name = currentProducts.name;
                    let price = currentProducts.regularPrice;

                    output = `<div class"qv-flexbox">
                                <div>
                                    <img src=${img} height="300" width="300" >
                                </div >
                                <div class="">
                                    <h3>${name}</h3>
                                    <p>${price}</p>
                                <!--<button class="addToCart" data-sku=${productsSku} >Add to cart</button>-->
                                </div>
                              </div>`;
                }
            }


            $(".quickViewBox").html(output);
            $(".quickViewBox, .overlayQv").fadeIn("slow");
            $(document).on("click", '.overlayQv', function () {
                $(".overlayQv, .quickViewBox").fadeOut("slow");
            });
        }
    }

}