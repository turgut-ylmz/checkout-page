const taxRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener("load", () => {
  calculateCartTotal();
  // set item to LocalStorage
  //   localStorage.setItem("taxRate", taxRate);
  //   localStorage.setItem("shippingPrice", shippingPrice);
  //   // set item to SessionStorage
  //   sessionStorage.setItem("taxRate", taxRate);
  //   sessionStorage.setItem("shippingPrice", shippingPrice);
});

// capturing method
let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("minus")) {
    if (event.target.nextElementSibling.innerText > 1) {
      event.target.nextElementSibling.innerText--;
      // parameter == productInfoDiv
      calculateProductAndCartTotal(event.target.parentElement.parentElement);
    } else {
      if (confirm("Product will be deleted?")) {
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartTotal();
      }
    }
  } else if (event.target.className == "plus") {
    event.target.previousElementSibling.innerText++;
    calculateProductAndCartTotal(event.target.parentElement.parentElement);
  } else if (event.target.classList.contains("remove-product")) {
    // event.target.parentElement.parentElement.parentElement.remove();
    event.target.closest(".product").remove();
    calculateCartTotal();
  }
});
// calculate cart and product totals
const calculateProductAndCartTotal = (productInfoDiv) => {
  let price = productInfoDiv.querySelector("strong").innerText;
  let quantity = productInfoDiv.querySelector("#product-quantity").innerText;
  let productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = (price * quantity).toFixed(2);
  calculateCartTotal();
};
// calculate cart totals
const calculateCartTotal = () => {
  let productsTotalPriceDivs = document.querySelectorAll(".product-line-price");
  let subtotal = 0;
  productsTotalPriceDivs.forEach((eachProductTotalDiv) => {
    subtotal += parseFloat(eachProductTotalDiv.innerHTML);
  });
  let taxPrice = subtotal * localStorage.getItem("taxRate");

  let shippingPrice =
    subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0;

  let cartTotal = subtotal + taxPrice + shippingPrice;

  document.querySelector("#cart-subtotal p:nth-child(2)").innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping p:nth-child(2)").innerText =
    shippingPrice.toFixed(2);
  document.querySelector("#cart-total").lastElementChild.innerText =
    cartTotal.toFixed(2);
};
