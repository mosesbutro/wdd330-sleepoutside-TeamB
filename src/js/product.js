import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
// attach the product id to the Add to Cart button
document.getElementById("addToCart").dataset.id = productId;

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const discount = 0.2; // 20%
const priceElements = document.querySelectorAll(".product-card__price");

priceElements.forEach((priceEl) => {
  const priceText = priceEl.textContent.replace("$", "");
  const price = parseFloat(priceText);

  const discountAmount = (price * discount).toFixed(2);
  const discountedPrice = (price - discountAmount).toFixed(2);

  priceEl.innerHTML = `
    <span class="old-price">$${price}</span>
    <span class="new-price">$${discountedPrice}</span>
    <span class="discount-badge">Save $${discountAmount}</span>
  `;
});
