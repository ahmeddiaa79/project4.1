var links = document.querySelector(".links")
var logout = document.querySelector("#logout")
var shopping = document.querySelector(".shopping")
var content = document.querySelector(".content")
var displayname = document.querySelector("#name");
var cart = document.querySelector(".cart")
var cartitem = document.querySelector(".cartitem")
var allproducts = document.querySelector(".allproducts")

if (localStorage.getItem("firstname")) {
    links.style.display = "none";
    content.style.display = "block";
    displayname.textContent = "hello, " + localStorage.getItem("firstname");
    console.log(displayname)
}
logout.addEventListener("click", function () {
    localStorage.clear()
    setTimeout(function () {
        window.location = "login.html"
    }, 1500)
})
var products = [
    {
        id: "1",
        imageurl: "images/photo_2025-10-22_17-40-14.jpg",
        name: "playstasion 5 gold",
        price: "1100",
        catigory: "playstasion"
    },
    {
        id: "2",
        imageurl: "images/photo_2025-10-22_17-40-37.jpg",
        name: "panasonic full hd",
        price: "500",
        catigory: "camera"
    },
    {
        id: "3",
        imageurl: "images/photo_2025-10-22_17-40-47.jpg",
        name: "pentax camera",
        price: "600",
        catigory: "camera"
    },
    {
        id: "4",
        imageurl: "images/photo_2025-10-22_17-40-25.jpg",
        name: "playstasion 5 black",
        price: "750",
        catigory: "playstasion"
    },
    {
        id: "5",
        imageurl: "images/photo_2025-10-22_17-40-43.jpg",
        name: "Sony WH-1000XM5",
        price: "450",
        catigory: "camera"
    },
    {
        id: "6",
        imageurl: "images/photo_2025-10-22_17-41-17.jpg",
        name: "HP Pavilion Laptop",
        price: "800",
        catigory: "laptop"
    },
    {
        id: "7",
        imageurl: "images/photo_2025-10-22_17-40-28.jpg",
        name: "playstasion 5",
        price: "800",
        catigory: "playstasion"
    },
    {
        id: "8",
        imageurl: "images/photo_2025-10-22_17-42-04.jpg",
        name: "iphone 17 pro max",
        price: "1250",
        catigory: "phone"
    },
    {
        id: "9",
        imageurl: "images/photo_2025-10-22_17-42-41.jpg",
        name: "hawawel watch 6",
        price: "350",
        catigory: "smart watch"
    },
    {
        id: "10",
        imageurl: "images/photo_2025-10-22_17-41-45.jpg",
        name: "MacBook Air M2",
        price: "2000",
        catigory: "laptop"
    },
    {
        id: "11",
        imageurl: "images/photo_2025-10-22_17-41-03.jpg",
        name: "Canon EOS R10",
        price: "1450",
        catigory: "camera"
    },
    {
        id: "12",
        imageurl: "images/photo_2025-10-22_17-42-01.jpg",
        name: "samsung z-flip 3",
        price: "1200",
        catigory: "phone"
    },
    {
        id: "13",
        imageurl: "images/photo_2025-10-22_17-42-50.jpg",
        name: "Samsung Watch 6",
        price: "400",
        catigory: "smart watch"
    },
    {
        id: "14",
        imageurl: "images/photo_2025-10-22_17-42-08.jpg",
        name: "iphone 16 pro max",
        price: "1100",
        catigory: "phone"
    },
    {
        id: "15",
        imageurl: "images/photo_2025-10-22_17-41-08.jpg",
        name: "cinema camera 4k",
        price: "1500",
        catigory: "camera"
    },
    {
        id: "16",
        imageurl: "images/photo_2025-10-22_17-42-46.jpg",
        name: "Apple Watch Series 9",
        price: "300",
        catigory: "smart watch"
    },
    {
        id: "17",
        imageurl: "images/photo_2025-10-22_17-41-58.jpg",
        name: "samsung laptop",
        price: "700",
        catigory: "laptop"
    }
];
var additem = localStorage.getItem("selectedproducts") ? JSON.parse(localStorage.getItem("selectedproducts")) : [];
var wishlist = localStorage.getItem("wishlistproducts") ? JSON.parse(localStorage.getItem("wishlistproducts")) : [];
shopping.textContent = additem.length
function drowproduct(showproduct) {
    var x = showproduct.map((item) => {
        var incart = additem.find((added) => added.id == item.id)
        var inwishlist = wishlist.find((added) => added.id == item.id)
        var productheart = inwishlist ? "color:red;" : ""
        var addedtext = incart ? "remove from cart" : "add to cart"
        var addedcolor = incart ? "background-color:red; color:white;" : "background-color:#0F4C75; color:white;"
        return `
        <div class="product">
                <img src="${item.imageurl}" alt="">
                <h3>${item.name}</h3>
                <p>price: ${item.price} $</p>
                <p>catigory: ${item.catigory}</p>
                <i class="fa-solid fa-heart heart" data-id="${item.id}" style="${productheart}"></i>
                <button class="btn" style="${addedcolor}" id="btn-${item.id}" onclick="addtocart(${item.id})">${addedtext}</button>
            </div>
        `
    })
    allproducts.innerHTML = x
}
drowproduct(products)
function drowincart() {
    cartitem.innerHTML = additem.map((item) => {
        return `
        <p class="cart-product">
                            <span>${item.name}</span>
                            <span>price:${item.price}$</span>
                            <p><button data-id="${item.id}" class="decrease">-</button> ${item.quantity} <button data-id="${item.id}" class="increase">+</button></p>
                        </p>
        `
    }
    )
        .join("")
    increaseandderease()
}
function updatecount() {
    if (additem.length === 0) {
        shopping.textContent = 0
    }
    var totalqyt = additem.reduce((sum, item) =>
        sum + item.quantity, 0)
    shopping.textContent = totalqyt
}
function increaseandderease() {
    document.querySelectorAll(".increase").forEach((blus) => {
        // var id=Number(this.dataset.id)
        blus.addEventListener("click", function () {
            var id = Number(this.dataset.id)
            var increasedproduct = additem.find((item) => item.id == id)
            if (increasedproduct) {
                increasedproduct.quantity++
            }
            localStorage.setItem("selectedproducts", JSON.stringify(additem))
            updatecount()
            drowincart()
        })
    })
    document.querySelectorAll(".decrease").forEach((minus) => {
        // var id=Number(this.dataset.id)
        minus.addEventListener("click", function () {
            var id = Number(this.dataset.id)
            var decreasedproduct = additem.find((item) => item.id == id)
            if (decreasedproduct) {
                decreasedproduct.quantity--
                if (decreasedproduct.quantity <= 0) {
                    additem = additem.filter((item) => item.id != id)
                    var button = document.getElementById(`btn-${id}`)
                    button.textContent = "add to cart"
                    button.style.background = "#0F4C75"
                }
            }
            localStorage.setItem("selectedproducts", JSON.stringify(additem))
            updatecount()
            drowincart()
        })
    })
}
var heart = document.querySelectorAll(".heart")
var selectedwishlist
function addtowishlist() {
    heart.forEach((love) => {
        love.addEventListener("click", function () {
            if (!localStorage.getItem("firstname")) {
                alert("please login first")
                setTimeout(() => {
                    window.location = "login.html"
                },);
                return
            }
            let id = Number(this.dataset.id)
            selectedwishlist = products.find((item) => item.id == id)
            var exactly = wishlist.find((item) => item.id == id)
            if (exactly) {
                wishlist = wishlist.filter((item) => item.id != id)
                love.style.color = "white"
            }
            else {
                wishlist.push(selectedwishlist)
                love.style.color = "red"
            }
            localStorage.setItem("wishlistproducts", JSON.stringify(wishlist))
        })
    })
}
addtowishlist()
var selectedProduct
function addtocart(id) {
    selectedProduct = products.find((item) => id == item.id)
    var exactly = additem.find((item) => item.id == id)
    var button = document.getElementById(`btn-${id}`)
    if (!localStorage.getItem("firstname")) {
        alert("please login first")
        setTimeout(() => {
            window.location = "login.html"
        },);
        return
    }
    if (exactly) {
        additem = additem.filter((item) => item.id != id)
        button.textContent = "add to cart"
        button.style.background = "#0F4C75"
    }
    else {
        additem.push({ ...selectedProduct, quantity: 1 })
        button.textContent = "remove from cart"
        button.style.background = "red"
    }
    localStorage.setItem("selectedproducts", JSON.stringify(additem))
    shopping.textContent = additem.length
    console.log(additem)
    console.log(selectedProduct)
    drowincart()
    updatecount()
}
shopping.addEventListener("click", function () {
    if (cart.style.display == "none") {
        cart.style.display = "block"
    }
    else {
        cart.style.display = "none"
    }
    drowincart()
    updatecount()
})
var searchMode = document.querySelector("#searchMode")
var searchinput = document.querySelector(".input-search")
var mode = "name"
if (searchMode && searchinput) {
    searchMode.addEventListener("change", function () {
        mode = searchMode.value
        searchinput.placeholder = `search by ${mode}.....`
    })
    searchinput.addEventListener("input", function () {
        var input = searchinput.value.toLowerCase()
        var result = []
        if (mode == "name") {
            result = products.filter((item) => item.name.toLowerCase().includes(input))
        }
        else if (mode == "category") {
            result = products.filter((item) => item.catigory.toLowerCase().includes(input))
        }
        drowproduct(result)
    })
}