var cartproducts = document.querySelector(".cartproducts")
var totalprice = document.querySelector(".totalprice")
var wishlistproducts = JSON.parse(localStorage.getItem("wishlistproducts"))
var divwishlist = document.querySelector(".wishlist")
var setproducts=JSON.parse(localStorage.getItem("selectedproducts"))
var shopping=document.querySelector(".shopping")
function drowsetproducts(){
  var x=setproducts.map((item)=>{
    return`
    <div class="products">
                <div class="left">
                    <img src="${item.imageurl}" alt="">
                </div>
                <div class="right">
                    <h3>${item.name}</h3>
                    <p>price:$${item.price}</p>
                    <p>catigory:${item.catigory}</p>
                    <span><button data-id="${item.id}" class="decrease">-</button> ${item.quantity} <button data-id="${item.id}" class="increase">+</button></span>
                    <button class="btn" onclick="removeproduct(${item.id})" style="color:white;">remove from cart</button>
                </div>
            </div>
    `
  })
  cartproducts.innerHTML=x.join("")
  increaseandderease()
  updattotalprice()
}
drowsetproducts()
function removeproduct(id){
  var y=setproducts.find((item)=>item.id==id)
  if(y){
    setproducts=setproducts.filter((item)=>item.id!=id)
    localStorage.setItem("selectedproducts",JSON.stringify(setproducts))
    drowsetproducts()
    updattotalprice()
    updatecount()
  }
}
function updatecount() {
    if (setproducts.length === 0) {
        shopping.textContent = 0
    }
    var totalqyt = setproducts.reduce((sum, item) =>
        sum + item.quantity, 0)
    shopping.textContent = totalqyt
}
updatecount()
function updattotalprice(){
  var price=setproducts.reduce((sum,item)=>sum+item.price*item.quantity,0)
  totalprice.innerHTML= `total price: ${price}$`
}
function increaseandderease() {
    document.querySelectorAll(".increase").forEach((blus) => {
        blus.addEventListener("click", function () {
            var id = Number(this.dataset.id)
            var increasedproduct = setproducts.find((item) => item.id == id)
            if (increasedproduct) {
                increasedproduct.quantity++
            }
            localStorage.setItem("selectedproducts", JSON.stringify(setproducts))
            updatecount()
            drowsetproducts()
        })
    })
    document.querySelectorAll(".decrease").forEach((minus) => {
        minus.addEventListener("click", function () {
            var id = Number(this.dataset.id)
            var decreasedproduct = setproducts.find((item) => item.id == id)
            if (decreasedproduct) {
                decreasedproduct.quantity--
                if (decreasedproduct.quantity <= 0) {
                    setproducts = setproducts.filter((item) => item.id != id)
                    var button = document.getElementById(`btn-${id}`)
                    button.textContent = "add to cart"
                    button.style.background = "green"
                }
            }
            localStorage.setItem("selectedproducts", JSON.stringify(setproducts))
            updatecount()
            drowsetproducts()
        })
    })
}
function drowwishlist() {
  var x = wishlistproducts.map((item) => {
    return `
        <div class="product">
                <img src="${item.imageurl}" alt="">
                <h3>${item.name}</h3>
                <p>price:${item.price}</p>
                <p>catigory:${item.catigory}</p>
                <i class="fa-solid fa-heart heart" style="color:red" data-id="${item.id}"></i>
            </div>
        `
  })
  divwishlist.innerHTML = x.join("")
  document.querySelectorAll(".heart").forEach((removeheart) => {
    removeheart.addEventListener("click", function () {
      let id = Number(this.dataset.id)
      wishlistproducts = wishlistproducts.filter((item) => item.id != id)
      localStorage.setItem("wishlistproducts", JSON.stringify(wishlistproducts))
      drowwishlist()
    })
  })
}
drowwishlist()