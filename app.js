/*=========================================================
    SHOP CAMZON V2
    APP.JS

    PART 1
    - Strict Mode
    - Global Variables
    - DOM Elements
    - Local Storage
    - Utility Functions
    - Initialize App
=========================================================*/

"use strict";

/*=========================================================
    GLOBAL VARIABLES
=========================================================*/

const APP_NAME = "SHOP CAMZON";

const TAX_RATE = 0.075;

const SHIPPING_FEE = 15;

const FREE_SHIPPING = 500;

let cart = JSON.parse(localStorage.getItem("camzonCart")) || [];

let orders = JSON.parse(localStorage.getItem("camzonOrders")) || [];

let favorites = JSON.parse(localStorage.getItem("camzonFavorites")) || [];

let settings = JSON.parse(localStorage.getItem("camzonSettings")) || {

    darkMode:false,

    notifications:true,

    currency:"USD"

};



/*=========================================================
    DOM ELEMENTS
=========================================================*/

const navbar = document.querySelector(".navbar");

const menuToggle = document.querySelector(".menu-toggle");

const mobileNav = document.querySelector(".mobile-nav");

const mobileOverlay = document.querySelector(".mobile-overlay");

const searchPopup = document.querySelector(".search-popup");

const searchInput = document.querySelector(".search-input");

const searchButton = document.querySelector("#searchBtn");

const closeSearch = document.querySelector("#closeSearch");

const cartCount = document.querySelector("#cartCount");

const cartContainer = document.querySelector(".cart-items");

const checkoutButton = document.querySelector(".checkout-btn");

const scrollTopButton = document.querySelector(".scroll-top");

const toast = document.querySelector(".toast");

const loader = document.querySelector(".loading-screen");

const productGrid = document.querySelector(".product-grid");

const relatedGrid = document.querySelector(".related-grid");

const quantityInput = document.querySelector("#quantity");

const plusButton = document.querySelector("#increaseQty");

const minusButton = document.querySelector("#decreaseQty");

const placeOrderButton = document.querySelector(".place-order-btn");

const darkModeSwitch = document.querySelector("#darkMode");

const settingsForm = document.querySelector(".settings-form");



/*=========================================================
    PRODUCT DATABASE
=========================================================*/

let products = [];



/*=========================================================
    SAVE TO LOCAL STORAGE
=========================================================*/

function saveCart(){

    localStorage.setItem(

        "camzonCart",

        JSON.stringify(cart)

    );

}



function saveOrders(){

    localStorage.setItem(

        "camzonOrders",

        JSON.stringify(orders)

    );

}



function saveSettings(){

    localStorage.setItem(

        "camzonSettings",

        JSON.stringify(settings)

    );

}



/*=========================================================
    SHORTCUT FUNCTIONS
=========================================================*/

const $ = selector =>

document.querySelector(selector);



const $$ = selector =>

document.querySelectorAll(selector);



/*=========================================================
    FORMAT PRICE
=========================================================*/

function formatPrice(price){

    return "$" + Number(price).toFixed(2);

}



/*=========================================================
    RANDOM ORDER NUMBER
=========================================================*/

function generateOrderNumber(){

    return "SC-" +

    Date.now()

    .toString()

    .slice(-8);

}



/*=========================================================
    GENERATE RANDOM ID
=========================================================*/

function generateID(){

    return Math.random()

    .toString(36)

    .substring(2,12);

}



/*=========================================================
    FIND PRODUCT
=========================================================*/

function getProduct(id){

    return products.find(

        product => product.id == id

    );

}



/*=========================================================
    PAGE DETECTION
=========================================================*/

const currentPage =

window.location.pathname

.split("/")

.pop();



/*=========================================================
    INITIALIZE
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        console.log(

            APP_NAME +

            " Loaded Successfully"

        );

        updateCartBadge();

        loadSettings();

        hideLoader();

    }

);



/*=========================================================
    PLACEHOLDER FUNCTIONS
=========================================================*/

function updateCartBadge(){}



function loadSettings(){}



function hideLoader(){}



/*=========================================================
    END OF PART 1
=========================================================*/
/*=========================================================
    SHOP CAMZON V2
    APP.JS

    PART 2
    - Sticky Navbar
    - Mobile Navigation
    - Search Popup
    - Scroll To Top
=========================================================*/



/*=========================================================
    STICKY NAVBAR
=========================================================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar?.classList.add("scrolled");

    }else{

        navbar?.classList.remove("scrolled");

    }

});



/*=========================================================
    MOBILE MENU OPEN
=========================================================*/

function openMobileMenu(){

    if(!menuToggle || !mobileNav || !mobileOverlay) return;

    menuToggle.classList.add("active");

    mobileNav.classList.add("active");

    mobileOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}



/*=========================================================
    MOBILE MENU CLOSE
=========================================================*/

function closeMobileMenu(){

    if(!menuToggle || !mobileNav || !mobileOverlay) return;

    menuToggle.classList.remove("active");

    mobileNav.classList.remove("active");

    mobileOverlay.classList.remove("active");

    document.body.style.overflow = "";

}



/*=========================================================
    MOBILE MENU EVENTS
=========================================================*/

menuToggle?.addEventListener("click",()=>{

    if(mobileNav.classList.contains("active")){

        closeMobileMenu();

    }else{

        openMobileMenu();

    }

});



mobileOverlay?.addEventListener(

    "click",

    closeMobileMenu

);



/*=========================================================
    CLOSE MENU AFTER CLICKING A LINK
=========================================================*/

$$(".mobile-nav a").forEach(link=>{

    link.addEventListener(

        "click",

        closeMobileMenu

    );

});



/*=========================================================
    SEARCH POPUP OPEN
=========================================================*/

function openSearch(){

    if(!searchPopup) return;

    searchPopup.classList.add("active");

    searchInput?.focus();

}



/*=========================================================
    SEARCH POPUP CLOSE
=========================================================*/

function closeSearchPopup(){

    searchPopup?.classList.remove("active");

}



/*=========================================================
    SEARCH BUTTON EVENT
=========================================================*/

searchButton?.addEventListener(

    "click",

    openSearch

);



closeSearch?.addEventListener(

    "click",

    closeSearchPopup

);



/*=========================================================
    ESC KEY
=========================================================*/

document.addEventListener(

    "keydown",

    e=>{

        if(e.key==="Escape"){

            closeSearchPopup();

            closeMobileMenu();

        }

    }

);



/*=========================================================
    CLICK OUTSIDE SEARCH
=========================================================*/

document.addEventListener("click",(e)=>{

    if(

        searchPopup &&

        searchPopup.classList.contains("active") &&

        !searchPopup.contains(e.target) &&

        !searchButton?.contains(e.target)

    ){

        closeSearchPopup();

    }

});



/*=========================================================
    SCROLL TO TOP BUTTON
=========================================================*/

window.addEventListener("scroll",()=>{

    if(!scrollTopButton) return;

    if(window.scrollY > 500){

        scrollTopButton.classList.add("show");

    }else{

        scrollTopButton.classList.remove("show");

    }

});



scrollTopButton?.addEventListener(

    "click",

    ()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

);



/*=========================================================
    ACTIVE NAV LINK
=========================================================*/

$$(".nav-links a").forEach(link=>{

    const href = link.getAttribute("href");

    if(href === currentPage){

        link.classList.add("active");

    }

});



$$(".mobile-nav a").forEach(link=>{

    const href = link.getAttribute("href");

    if(href === currentPage){

        link.classList.add("active");

    }

});



/*=========================================================
    SMOOTH SCROLL
=========================================================*/

$$('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",(e)=>{

        const target = document.querySelector(

            anchor.getAttribute("href")

        );

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    });

});



/*=========================================================
    LOADER
=========================================================*/

function hideLoader(){

    if(!loader) return;

    setTimeout(()=>{

        loader.style.opacity="0";

        loader.style.pointerEvents="none";

        setTimeout(()=>{

            loader.style.display="none";

        },400);

    },800);

}



/*=========================================================
    END OF PART 2
=========================================================*/
/*=========================================================
    SHOP CAMZON V2
    APP.JS

    PART 3
    - Product Database
    - Product Rendering
    - Product Search
    - Featured Products
    - Wishlist
=========================================================*/



/*=========================================================
    PRODUCT DATABASE
=========================================================*/

products = [

{

    id:1,

    name:"Apple iPhone 16 Pro Max",

    category:"Phones",

    price:1299,

    rating:5,

    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",

    badge:"New"

},

{

    id:2,

    name:"Samsung Galaxy S25 Ultra",

    category:"Phones",

    price:1199,

    rating:5,

    image:"https://images.unsplash.com/photo-1510557880182-3f8cbf9f4b20",

    badge:"Popular"

},

{

    id:3,

    name:"Sony WH-1000XM5",

    category:"Audio",

    price:399,

    rating:5,

    image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",

    badge:"Best Seller"

},

{

    id:4,

    name:"Apple Watch Ultra",

    category:"Wearables",

    price:799,

    rating:5,

    image:"https://images.unsplash.com/photo-1546868871-7041f2a55e12",

    badge:"Premium"

},

{

    id:5,

    name:"Gaming Laptop RTX",

    category:"Laptop",

    price:1850,

    rating:5,

    image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853",

    badge:"Hot"

},

{

    id:6,

    name:"Mechanical Keyboard",

    category:"Accessories",

    price:149,

    rating:4,

    image:"https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",

    badge:"Sale"

}

];



/*=========================================================
    CREATE STARS
=========================================================*/

function createStars(rating){

    let stars="";

    for(let i=1;i<=5;i++){

        stars += i<=rating ? "⭐" : "☆";

    }

    return stars;

}



/*=========================================================
    PRODUCT CARD
=========================================================*/

function createProductCard(product){

    const isFavorite = favorites.includes(product.id);

    return `

    <div class="product-card fade-up">

        <span class="product-tag">

            ${product.badge}

        </span>

        <img

            src="${product.image}"

            alt="${product.name}"

            loading="lazy"

        >

        <h3>${product.name}</h3>

        <p>${product.category}</p>

        <div class="stars">

            ${createStars(product.rating)}

        </div>

        <h4>${formatPrice(product.price)}</h4>

        <div class="product-actions">

            <button

                class="favorite-btn"

                onclick="toggleFavorite(${product.id})"

            >

                ${isFavorite ? "❤️" : "🤍"}

            </button>

            <button

                onclick="addToCart(${product.id})"

            >

                Add To Cart

            </button>

        </div>

    </div>

    `;

}



/*=========================================================
    RENDER PRODUCTS
=========================================================*/

function renderProducts(list = products){

    if(!productGrid) return;

    productGrid.innerHTML = "";

    list.forEach(product=>{

        productGrid.innerHTML +=

        createProductCard(product);

    });

}



/*=========================================================
    RELATED PRODUCTS
=========================================================*/

function renderRelatedProducts(){

    if(!relatedGrid) return;

    relatedGrid.innerHTML = "";

    products.slice(0,4).forEach(product=>{

        relatedGrid.innerHTML +=

        createProductCard(product);

    });

}



/*=========================================================
    LIVE SEARCH
=========================================================*/

searchInput?.addEventListener(

    "keyup",

    function(){

        const keyword =

        this.value.toLowerCase();

        const result =

        products.filter(product=>

            product.name

            .toLowerCase()

            .includes(keyword)

            ||

            product.category

            .toLowerCase()

            .includes(keyword)

        );

        renderProducts(result);

    }

);



/*=========================================================
    FAVORITES
=========================================================*/

function toggleFavorite(id){

    if(favorites.includes(id)){

        favorites = favorites.filter(

            item=>item!==id

        );

    }else{

        favorites.push(id);

    }

    localStorage.setItem(

        "camzonFavorites",

        JSON.stringify(favorites)

    );

    renderProducts();

    showToast(

        "Wishlist Updated ❤️",

        "success"

    );

}



/*=========================================================
    FIND PRODUCT
=========================================================*/

function getProductById(id){

    return products.find(

        product=>product.id==id

    );

}



/*=========================================================
    FEATURED PRODUCTS
=========================================================*/

function loadFeaturedProducts(){

    renderProducts(products);

    renderRelatedProducts();

}



/*=========================================================
    AUTO LOAD PRODUCTS
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadFeaturedProducts();

    }

);



/*=========================================================
    END OF PART 3
=========================================================*/
/*=========================================================
    SHOP CAMZON V2
    APP.JS

    PART 4
    - Add To Cart
    - Remove Cart Item
    - Update Quantity
    - Cart Badge
    - Cart Totals
    - LocalStorage
=========================================================*/



/*=========================================================
    ADD TO CART
=========================================================*/

function addToCart(id){

    const product = getProductById(id);

    if(!product) return;

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            id:product.id,

            name:product.name,

            image:product.image,

            price:product.price,

            quantity:1

        });

    }

    saveCart();

    updateCartBadge();

    renderCart();

    showToast(

        "Product added to cart 🛒",

        "success"

    );

}



/*=========================================================
    UPDATE CART BADGE
=========================================================*/

function updateCartBadge(){

    if(!cartCount) return;

    const totalItems = cart.reduce(

        (sum,item)=>sum+item.quantity,

        0

    );

    cartCount.textContent = totalItems;

}



/*=========================================================
    REMOVE CART ITEM
=========================================================*/

function removeCartItem(id){

    cart = cart.filter(

        item => item.id !== id

    );

    saveCart();

    renderCart();

    updateCartBadge();

    showToast(

        "Item removed",

        "warning"

    );

}



/*=========================================================
    INCREASE QUANTITY
=========================================================*/

function increaseQuantity(id){

    const item = cart.find(

        product=>product.id===id

    );

    if(!item) return;

    item.quantity++;

    saveCart();

    renderCart();

    updateCartBadge();

}



/*=========================================================
    DECREASE QUANTITY
=========================================================*/

function decreaseQuantity(id){

    const item = cart.find(

        product=>product.id===id

    );

    if(!item) return;

    item.quantity--;

    if(item.quantity <= 0){

        removeCartItem(id);

        return;

    }

    saveCart();

    renderCart();

    updateCartBadge();

}



/*=========================================================
    CALCULATE SUBTOTAL
=========================================================*/

function getSubtotal(){

    return cart.reduce(

        (total,item)=>

        total + (item.price * item.quantity),

        0

    );

}



/*=========================================================
    SHIPPING
=========================================================*/

function getShipping(){

    const subtotal = getSubtotal();

    return subtotal >= FREE_SHIPPING

        ? 0

        : SHIPPING_FEE;

}



/*=========================================================
    TAX
=========================================================*/

function getTax(){

    return getSubtotal() * TAX_RATE;

}



/*=========================================================
    GRAND TOTAL
=========================================================*/

function getGrandTotal(){

    return (

        getSubtotal()

        +

        getShipping()

        +

        getTax()

    );

}



/*=========================================================
    RENDER CART
=========================================================*/

function renderCart(){

    if(!cartContainer) return;

    cartContainer.innerHTML = "";



    if(cart.length===0){

        cartContainer.innerHTML = `

        <div class="empty-cart">

            <h2>Your cart is empty</h2>

            <p>Start shopping now.</p>

        </div>

        `;

        updateSummary();

        return;

    }



    cart.forEach(item=>{

        cartContainer.innerHTML += `

        <div class="cart-item fade-up">

            <div class="cart-image">

                <img src="${item.image}" alt="${item.name}">

            </div>

            <div class="cart-details">

                <h2>${item.name}</h2>

                <h3>${formatPrice(item.price)}</h3>

            </div>

            <div class="cart-quantity">

                <button onclick="decreaseQuantity(${item.id})">

                    -

                </button>

                <input

                    value="${item.quantity}"

                    readonly

                >

                <button onclick="increaseQuantity(${item.id})">

                    +

                </button>

            </div>

            <h3>

                ${formatPrice(

                    item.price*item.quantity

                )}

            </h3>

            <div class="cart-remove">

                <button

                    onclick="removeCartItem(${item.id})"

                >

                    Remove

                </button>

            </div>

        </div>

        `;

    });



    updateSummary();

}



/*=========================================================
    UPDATE SUMMARY
=========================================================*/

function updateSummary(){

    const subtotal = $("#subtotal");

    const shipping = $("#shipping");

    const tax = $("#tax");

    const total = $("#total");



    if(subtotal)

        subtotal.textContent =

        formatPrice(getSubtotal());



    if(shipping)

        shipping.textContent =

        formatPrice(getShipping());



    if(tax)

        tax.textContent =

        formatPrice(getTax());



    if(total)

        total.textContent =

        formatPrice(getGrandTotal());

}



/*=========================================================
    CLEAR CART
=========================================================*/

function clearCart(){

    cart = [];

    saveCart();

    renderCart();

    updateCartBadge();

}



/*=========================================================
    PAGE LOAD
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        renderCart();

        updateCartBadge();

    }

);



/*=========================================================
    END OF PART 4
=========================================================*/
/*=========================================================
    SHOP CAMZON V2
    APP.JS

    PART 5
    - Coupon System
    - Checkout Validation
    - Place Order
    - Save Order
    - Order Confirmation
=========================================================*/



/*=========================================================
    AVAILABLE COUPONS
=========================================================*/

const coupons = {

    SAVE10:10,

    SAVE20:20,

    CAMZON30:30,

    WELCOME15:15

};

let discount = 0;



/*=========================================================
    APPLY COUPON
=========================================================*/

function applyCoupon(){

    const input = $("#couponInput");

    if(!input) return;

    const code = input.value.trim().toUpperCase();

    if(coupons[code]){

        discount = coupons[code];

        updateSummary();

        showToast(

            `Coupon Applied (${discount}% OFF)`,

            "success"

        );

    }else{

        discount = 0;

        updateSummary();

        showToast(

            "Invalid Coupon",

            "error"

        );

    }

}



/*=========================================================
    DISCOUNT VALUE
=========================================================*/

function getDiscountAmount(){

    return getSubtotal() * (discount / 100);

}



/*=========================================================
    GRAND TOTAL AFTER DISCOUNT
=========================================================*/

function getFinalTotal(){

    return (

        getSubtotal()

        -

        getDiscountAmount()

        +

        getShipping()

        +

        getTax()

    );

}



/*=========================================================
    UPDATE SUMMARY
=========================================================*/

function updateSummary(){

    const subtotal = $("#subtotal");

    const shipping = $("#shipping");

    const tax = $("#tax");

    const discountText = $("#discount");

    const total = $("#total");



    subtotal &&

    (subtotal.textContent =

        formatPrice(getSubtotal())

    );



    shipping &&

    (shipping.textContent =

        formatPrice(getShipping())

    );



    tax &&

    (tax.textContent =

        formatPrice(getTax())

    );



    if(discountText){

        discountText.textContent =

        "-" +

        formatPrice(

            getDiscountAmount()

        );

    }



    total &&

    (total.textContent =

        formatPrice(getFinalTotal())

    );

}



/*=========================================================
    VALIDATE CHECKOUT
=========================================================*/

function validateCheckout(){

    const required =

    document.querySelectorAll(

        "[required]"

    );



    for(const field of required){

        if(field.value.trim()===""){

            showToast(

                "Please complete all required fields.",

                "warning"

            );

            field.focus();

            return false;

        }

    }



    return true;

}



/*=========================================================
    PLACE ORDER
=========================================================*/

function placeOrder(){

    if(cart.length===0){

        showToast(

            "Your cart is empty.",

            "warning"

        );

        return;

    }



    if(!validateCheckout()) return;



    const order = {

        id:generateOrderNumber(),

        date:new Date().toLocaleString(),

        items:[...cart],

        subtotal:getSubtotal(),

        shipping:getShipping(),

        tax:getTax(),

        discount:getDiscountAmount(),

        total:getFinalTotal(),

        status:"Pending"

    };



    orders.unshift(order);



    saveOrders();



    clearCart();



    showToast(

        "Order Placed Successfully!",

        "success"

    );



    setTimeout(()=>{

        window.location.href =

        "past-orders.html";

    },1500);

}



/*=========================================================
    PLACE ORDER BUTTON
=========================================================*/

placeOrderButton?.addEventListener(

    "click",

    placeOrder

);



/*=========================================================
    COUPON BUTTON
=========================================================*/

$("#applyCouponBtn")?.addEventListener(

    "click",

    applyCoupon

);



/*=========================================================
    ENTER KEY FOR COUPON
=========================================================*/

$("#couponInput")?.addEventListener(

    "keydown",

    function(e){

        if(e.key==="Enter"){

            e.preventDefault();

            applyCoupon();

        }

    }

);



/*=========================================================
    CHECKOUT FORM SUBMIT
=========================================================*/

document

.querySelector(".checkout-form")

?.addEventListener(

    "submit",

    function(e){

        e.preventDefault();

        placeOrder();

    }

);



/*=========================================================
    SUCCESS PAGE DATA
=========================================================*/

function getLatestOrder(){

    return orders[0] || null;

}



/*=========================================================
    LOAD CHECKOUT SUMMARY
=========================================================*/

function loadCheckoutSummary(){

    const summary = $("#checkoutSummary");



    if(!summary) return;



    summary.innerHTML = "";



    cart.forEach(item=>{

        summary.innerHTML += `

        <div class="summary-product">

            <img

                src="${item.image}"

                alt="${item.name}"

            >

            <div>

                <h3>${item.name}</h3>

                <p>

                    Qty:

                    ${item.quantity}

                </p>

                <strong>

                    ${formatPrice(

                        item.price *

                        item.quantity

                    )}

                </strong>

            </div>

        </div>

        `;

    });



    updateSummary();

}



/*=========================================================
    AUTO LOAD CHECKOUT
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadCheckoutSummary();

    }

);



/*=========================================================
    END OF PART 5
=========================================================*/
/*=========================================================
    SHOP CAMZON V2
    APP.JS

    PART 6
    - Past Orders
    - Settings
    - Dark Mode
    - Toast Notification
    - Page Reveal Animation
=========================================================*/



/*=========================================================
    LOAD PAST ORDERS
=========================================================*/

function loadPastOrders(){

    const ordersContainer = $("#ordersContainer");



    if(!ordersContainer) return;



    ordersContainer.innerHTML = "";



    if(orders.length === 0){

        ordersContainer.innerHTML = `

        <div class="empty-orders">

            <h2>No Orders Yet</h2>

            <p>

                Your previous purchases will appear here.

            </p>

            <a href="product.html">

                Start Shopping

            </a>

        </div>

        `;

        return;

    }



    orders.forEach(order=>{

        ordersContainer.innerHTML += `

        <div class="order-card fade-up">

            <div class="order-top">

                <div>

                    <h2>${order.id}</h2>

                    <p>${order.date}</p>

                </div>

                <span class="status ${order.status.toLowerCase()}">

                    ${order.status}

                </span>

            </div>



            <div class="order-products">

                ${order.items.map(item=>`

                    <div class="order-product">

                        <img

                            src="${item.image}"

                            alt="${item.name}"

                        >

                        <div>

                            <h3>${item.name}</h3>

                            <p>

                                Qty: ${item.quantity}

                            </p>

                            <strong>

                                ${formatPrice(item.price)}

                            </strong>

                        </div>

                    </div>

                `).join("")}

            </div>



            <div class="order-actions">

                <button

                    onclick="reorder('${order.id}')"

                >

                    Buy Again

                </button>

            </div>



            <h3>

                Total :

                ${formatPrice(order.total)}

            </h3>

        </div>

        `;

    });

}



/*=========================================================
    BUY AGAIN
=========================================================*/

function reorder(orderID){

    const order = orders.find(

        item => item.id === orderID

    );



    if(!order) return;



    cart = JSON.parse(

        JSON.stringify(order.items)

    );



    saveCart();

    updateCartBadge();



    showToast(

        "Items added to cart.",

        "success"

    );



    setTimeout(()=>{

        window.location.href =

        "cart.html";

    },700);

}



/*=========================================================
    CLEAR ORDER HISTORY
=========================================================*/

function clearOrders(){

    if(

        !confirm(

            "Delete all previous orders?"

        )

    ) return;



    orders = [];



    saveOrders();



    loadPastOrders();



    showToast(

        "Order history cleared.",

        "warning"

    );

}



/*=========================================================
    LOAD SETTINGS
=========================================================*/

function loadSettings(){

    if(settings.darkMode){

        document.body.classList.add(

            "dark-mode"

        );



        if(darkModeSwitch)

            darkModeSwitch.checked = true;

    }



}



/*=========================================================
    TOGGLE DARK MODE
=========================================================*/

function toggleDarkMode(){



    settings.darkMode =

    !settings.darkMode;



    document.body.classList.toggle(

        "dark-mode"

    );



    saveSettings();



    showToast(

        settings.darkMode

        ?

        "Dark mode enabled"

        :

        "Dark mode disabled",

        "success"

    );

}



darkModeSwitch?.addEventListener(

    "change",

    toggleDarkMode

);



/*=========================================================
    SAVE SETTINGS
=========================================================*/

settingsForm?.addEventListener(

    "submit",

    function(e){

        e.preventDefault();



        saveSettings();



        showToast(

            "Settings Saved",

            "success"

        );

    }

);



/*=========================================================
    TOAST
=========================================================*/

function showToast(

    message,

    type="success"

){

    if(!toast) return;



    toast.textContent = message;



    toast.className =

    "toast show " + type;



    setTimeout(()=>{

        toast.classList.remove(

            "show"

        );

    },3000);

}



/*=========================================================
    PAGE REVEAL
=========================================================*/

const revealElements =

document.querySelectorAll(

    ".reveal"

);



function revealOnScroll(){



    revealElements.forEach(element=>{



        const top =

        element.getBoundingClientRect().top;



        if(

            top <

            window.innerHeight - 120

        ){

            element.classList.add(

                "active"

            );

        }



    });



}



window.addEventListener(

    "scroll",

    revealOnScroll

);



revealOnScroll();



/*=========================================================
    LOAD PAGES
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadPastOrders();

        loadSettings();

    }

);



/*=========================================================
    END OF PART 6
=========================================================*/
/*=========================================================
    SHOP CAMZON V2
    APP.JS

    PART 7 (FINAL)
    - Product Filters
    - Image Gallery
    - Wishlist
    - Statistics
    - Export Orders
    - Debounce
    - Error Handling
    - Final Initialize
=========================================================*/



/*=========================================================
    FILTER PRODUCTS
=========================================================*/

function filterProducts(category="All"){

    if(category==="All"){

        renderProducts(products);

        return;

    }

    const filtered = products.filter(

        product => product.category === category

    );

    renderProducts(filtered);

}



/*=========================================================
    SORT PRODUCTS
=========================================================*/

function sortProducts(type){

    let sorted = [...products];



    switch(type){

        case "price-low":

            sorted.sort((a,b)=>a.price-b.price);

            break;



        case "price-high":

            sorted.sort((a,b)=>b.price-a.price);

            break;



        case "rating":

            sorted.sort((a,b)=>b.rating-a.rating);

            break;



        case "name":

            sorted.sort((a,b)=>

                a.name.localeCompare(b.name)

            );

            break;

    }



    renderProducts(sorted);

}



/*=========================================================
    PRODUCT IMAGE GALLERY
=========================================================*/

$$(".thumbnail-gallery img").forEach(image=>{

    image.addEventListener("click",()=>{

        const mainImage = $(".main-image img");



        if(!mainImage) return;



        mainImage.src = image.src;



        mainImage.alt = image.alt;

    });

});



/*=========================================================
    LOAD WISHLIST
=========================================================*/

function loadWishlist(){

    const wishlistContainer = $("#wishlistContainer");



    if(!wishlistContainer) return;



    wishlistContainer.innerHTML = "";



    const items = products.filter(product=>

        favorites.includes(product.id)

    );



    if(items.length===0){

        wishlistContainer.innerHTML =

        "<h2>No favorite products.</h2>";

        return;

    }



    items.forEach(product=>{

        wishlistContainer.innerHTML +=

        createProductCard(product);

    });

}



/*=========================================================
    DASHBOARD STATS
=========================================================*/

function updateStatistics(){

    const totalOrders = $("#totalOrders");

    const totalSpent = $("#totalSpent");

    const totalProducts = $("#totalProducts");



    if(totalOrders)

        totalOrders.textContent =

        orders.length;



    if(totalProducts){

        totalProducts.textContent =

        cart.reduce(

            (sum,item)=>

            sum+item.quantity,

            0

        );

    }



    if(totalSpent){

        const spent =

        orders.reduce(

            (sum,order)=>

            sum+order.total,

            0

        );



        totalSpent.textContent =

        formatPrice(spent);

    }

}



/*=========================================================
    EXPORT ORDER HISTORY
=========================================================*/

function exportOrders(){



    if(orders.length===0){

        showToast(

            "No orders to export.",

            "warning"

        );

        return;

    }



    const data = JSON.stringify(

        orders,

        null,

        2

    );



    const blob = new Blob(

        [data],

        {

            type:"application/json"

        }

    );



    const url = URL.createObjectURL(blob);



    const a = document.createElement("a");



    a.href = url;

    a.download = "orders.json";



    a.click();



    URL.revokeObjectURL(url);



    showToast(

        "Orders exported.",

        "success"

    );

}



/*=========================================================
    RESET APPLICATION
=========================================================*/

function resetApplication(){



    if(

        !confirm(

            "Reset Shop Camzon?"

        )

    ) return;



    localStorage.removeItem(

        "camzonCart"

    );



    localStorage.removeItem(

        "camzonOrders"

    );



    localStorage.removeItem(

        "camzonFavorites"

    );



    location.reload();

}



/*=========================================================
    DEBOUNCE
=========================================================*/

function debounce(callback,delay=300){

    let timeout;



    return(...args)=>{

        clearTimeout(timeout);



        timeout=setTimeout(()=>{

            callback(...args);

        },delay);

    };

}



/*=========================================================
    THROTTLE
=========================================================*/

function throttle(callback,delay=200){

    let waiting=false;



    return(...args)=>{

        if(waiting) return;



        callback(...args);



        waiting=true;



        setTimeout(()=>{

            waiting=false;

        },delay);

    };

}



/*=========================================================
    GLOBAL ERROR HANDLER
=========================================================*/

window.addEventListener(

    "error",

    function(error){

        console.error(error);



        showToast(

            "Unexpected error occurred.",

            "error"

        );

    }

);



/*=========================================================
    PAGE READY
=========================================================*/

function initializeApplication(){

    updateCartBadge();

    renderProducts();

    renderCart();

    loadCheckoutSummary();

    loadPastOrders();

    loadWishlist();

    updateStatistics();

    loadSettings();

    revealOnScroll();

}



/*=========================================================
    DOM READY
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);



/*=========================================================
    WINDOW LOAD
=========================================================*/

window.addEventListener(

    "load",

    ()=>{

        hideLoader();

    }

);



/*=========================================================
    SHOP CAMZON

    VERSION 2.0

    APP.JS COMPLETE

=========================================================*/