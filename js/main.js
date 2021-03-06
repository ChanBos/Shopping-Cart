// Navigation bar ***
// Function to display the side navigation area.
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
// Function to close the side navigation area.
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// Shopping cart ***
// Created a map array for items to be displayed in cart.
let cart = [];
// Function to stringify and set items in local storage.
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Function to parse and get items from local storage.
function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }
}
// Called loadCart function.
loadCart();

// Created a constructor function to add items to the cart.
class Plant {
  constructor(name, image, price) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.count = 1;
  }
}

// Created the new products and included the names, images and prices.
let plant1 = new Plant(
  "Agapanthus (Purple Cloud/ African Lily)",
  "images/Agapanthus.jpg",
  95
);
let plant2 = new Plant(
  "Sweet Alyssum (Royal Carpet)",
  "images/Alyssum.jpg",
  25
);
let plant3 = new Plant(
  "Clivia (Natal Lily/ Bush Lily)",
  "images/Clivia.jpg",
  95
);
let plant4 = new Plant(
  "Dianthus (Ideal Select Violet)",
  "images/Dianthus.jpg",
  45
);
let plant5 = new Plant("Dahlia (Dreamy Eyes)", "images/Dahlia.jpg", 40);
let plant6 = new Plant(
  "African Daisy (Bright Lights Yellow)",
  "images/Daisy.jpg",
  50
);
let plant7 = new Plant("Marigold (Honeycomb)", "images/Marigold.jpg", 35);
let plant8 = new Plant(
  "Petunia (Supercal Neon Rose)",
  "images/Petunia.jpg",
  45
);

// Created products array.
let myPlants = [plant1, plant2, plant3, plant4, plant5, plant6, plant7, plant8];

// Adding Functions:
// Function to add and increase items in the cart.
function addCart(name, image, price) {
  // Looping through products in order to add or increase products.
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].count += 1;
      saveCart();
      return;
    }
  }
  let plant = new Plant(name, image, price);
  cart.push(plant);
  saveCart();
}

// Created an increment function to amend the item count in the cart by clicking on the "up" arrow.
function increment(plant) {
  let name = plant.getAttribute("data-name");
  let image = plant.getAttribute("data-image");
  let price = plant.getAttribute("data-price");
  addCart(name, image, price);
  countInCart();

  location.reload();
}

// Function using the data attributes assigned in the product html pages to be able to add items by clicking the add-to-cart button. Added an alert to display the item that was added and the new total.
function addVisualCart(plant) {
  let name = plant.getAttribute("data-name");
  let image = plant.getAttribute("data-image");
  let price = plant.getAttribute("data-price");
  addCart(name, image, price);
  countInCart();
  alert(
    `${name} was successfully added to the cart. Your total is now R${totalCart()}.00`
  );
}

// Removing Functions:
// Function to remove and decrease items in the cart.
function removePlant(name, count = 1) {
  // Looping through products in order to remove or decrease products.
  for (let i = 0; i < cart.length; i++) {
    let plant = cart[i];
    if (plant.name === name) {
      if (plant.count > count) {
        plant.count -= count;
      } else {
        cart.splice([i], 1);
      }
      break;
    }
  }
  saveCart();
}

// Created an decrement function to amend the item count in the cart by clicking on the "down" arrow.
function decrement(plant) {
  let name = plant.getAttribute("data-name");
  removePlant(name, 1);
  countInCart();

  location.reload();
}

// Function using the data attributes assigned in the product html pages to be able to delete items by clicking the remove button. Added an alert to confirm that the item was removed.
function removeVisualCart(plant) {
  let name = plant.getAttribute("data-name");
  let count = plant.getAttribute("data-count");
  removePlant(name, count);
  countInCart();

  location.reload();
  alert(`${name} was successfully removed`);
}

// Created a function to clear the local storage and therefore the cart. Added an alert to confirm the clear.
function clearOrder() {
  localStorage.clear();

  location.reload();
  alert(`You have successfully cleared the cart`);
}

// Totaling Functions:
// Function to work out the total costs of the items
function totalCart() {
  let total = 0;
  for (const plant of cart) {
    total += plant.count * plant.price;
  }
  return total;
}

// Created function to count the amount of items in the cart.
function countCart() {
  let count = 0;
  for (const plant in cart) {
    count += cart[plant].count;
  }
  return count;
}

// Created function to show the amount of items in the navigation bar on the cart icon.
function countInCart() {
  let productNumbers = document.getElementById("lblCartCount");
  if (productNumbers) {
    productNumbers.innerHTML = countCart();
  }
}
countInCart();

// Function to calculate shipping to add to total.
const nodeList = document.querySelectorAll('deliveryinput');
// Converting using Array.prototype.slice.call 
const radio = Array.prototype.slice.call(nodeList);
// Loop to derive the selected delivery button's value. Set an alert to notify user that they need to select an option.
function shippingCalcTotal() {
  let radios = document.getElementsByName("deliveryinput");
  let found = 1;
  var value;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      value = Number(radios[i].value);
      found = 0;
      break;
    }
  }
  if (found == 1) {
    alert("Please select your preferred delivery method.");
  }
  return value;
}

// Function to calculate discount total once a discount code is entered.
function calculateDiscount() {
  // let currentTotal = totalCart();
  let value = totalCart() + shippingCalcTotal();
  let discountCode = document.getElementById('discountinput').value;
  if (discountCode === "petals") {
    value *= 0.9;
  } else if (discountCode === "flowers") {
    value *= 0.75;
  } else if (discountCode === "fields") {
    value *= 0.5;
  }
  return value
}

//Function to work out and display VAT.
function VAT(total) {
  return total * 0.15;
}

// Created a function for the "Update Total" button so that it will perform the above calculations and display the new total.  
function updateCartTotal() {
  let basketTotal = calculateDiscount();
  document.getElementById("baskettotal").setAttribute('value', basketTotal.toFixed(2))

  let vatTotal = calculateDiscount() * 0.15;
  document.getElementById("vat").setAttribute('value', vatTotal.toFixed(2))
}

// Finalizing and Display Functions:
// Function to generate an alert for the random order reference number once the "Confirm Order" button is clicked on.
function submitOrder() {
  let orderRef = Math.random().toFixed(36).substr(2, 9);
  alert(`Thank you for your order. Your order reference number is ${orderRef}.`);
}

// Function to display the cart items via the <div> "populatecart" that was created in the shopping cart's HTML page.
function displayCart() {
  let productContainer = document.getElementById("populatecart");
  let total = totalCart().toFixed(2)
  if (addCart && productContainer) {
    Object.values(cart).map((item) => {
      // Dynamically adding the items and elements to the HTML using the productContainer.
      productContainer.innerHTML += `
        <table class="products">
          <tr>
              <th class="cartimage productheader"></th>
                <th class="product-name productheader">PRODUCT</th>
                <th class="price productheader">PRICE</th>
                <th class="quantity productheader">QUANTITY</th>
                <th class="total productheader">TOTAL</th>
                <th class="remove productheader"></th>
            </tr>
            <tr>
                <td class="productlist"><img src=${item.image} class="cartimage" alt="cartimage"></td>
                <td class="product-name productlist">${item.name}</td>
                <td class="price productlist">R${item.price}</td>
                <td class="quantity productlist">
                    <button 
                    id="increasecount" 
                    class="add" 
                    data-name="${item.name}"
                    data-image="${item.image}"
                    data-price="${item.price}"
                    onclick="increment(this)"
                    >
                    <i class="fas fa-caret-square-up"></i>
                    </button>
                    <p id="cartquantity" class="productcount productlist">${item.count}</p>
                    <button 
                    id="decreasecount" 
                    class="delete" 
                    data-name="${item.name}"
                    onclick="decrement(this)"  
                    ><i class="fas fa-caret-square-down"></i></button>
                </td>
                <td class="total productlist">R${
                  item.price * item.count
                },00</td>
                <td class="productlist">
                <button 
                data-name="${item.name}"
                data-count="${item.count}"
                onclick="removeVisualCart(this)"
                class="remove" value="delete" onclick="removePlant()">
                    <i class="fas fa-trash-alt">
                    </i> Remove</button></td>
            </tr>
        </table>`;
    });
    // Dynamically adding the vat and other totals and select elements to the HTML using the productContainer.
    productContainer.innerHTML += `
        <div id="cartinfo" action="#">
          <form id="formcontainer1">
          <div id="collectordelivery">
            <label class="formcontainer">How would you like to receive your order?</label><br />
            <input class="radio" type="radio" name="deliveryinput" value="0" checked/>Collection (Free of charge)<br />
            <input class="radio" type="radio" name="getitmethod" value="delivery"/>Delivery
          </div>
          <div id="deliveryoptions">
            <label id="delivery" class="formcontainer">Select the preferred delivery option:</label><br />
            <input class="radio delmethod" id="EcoD" value="15" type="radio" name="deliveryinput"/>Economy Delivery (5-7 working days) at R15.00<br />
            <input class="radio delmethod" id="StdD" value="25" type="radio" name="deliveryinput"/>Standard Delivery (2-4 working days) at R25.00<br />
            <input class="radio delmethod" id="ExpD" value="50" type="radio" name="deliveryinput"/>Expedited Delivery (1-2 working days) at R50.00
          </div>
          </form>
          <form class="discount" id="formcontainer2" action="#"> 
            <div>
              <label id="discountlabel" class="formcontainer">Do you have a discount code?</label>
              <input id="discountinput" placeholder=" --- Enter code here ---"/>
            </div>
            <div>
              <label id="updatelabel">Please click here to update the order total:</label><br />
              <button id="updatebutton" onclick="updateCartTotal()">Update Total</button>
            </div>
          </form>
          <form id="formcontainer3">
            <label id="dropdownlabel" class="formcontainer">Is this for yourself or a gift for someone else's garden?:</label>
            <select id="dropdown"></select><br />
            <div id="finalizeorder">
              <div>
                <div id="vat">
                  <label class="formcontainer">- - VAT - -</label><br />
                  <div class="totalcontainer">
                    <label>R</label>
                    <input class="totalinput" value=${VAT(total).toFixed(2)}><br />
                  </div>  
                </div>
                <div id="total">
                  <label id="baskettotaltitle" class="formcontainer">- - TOTAL - -</label><br />
                  <div class="totalcontainer">
                    <label>R</label>
                    <input class="totalinput" id="baskettotal" value=${total}><br />
                  </div> 
                </div>
              </div>
              <div id="cartfunctionbuttons">
                <button id="clearorder" type="button" onclick="clearOrder()">Clear Cart</button>
                <button id="submitorder" type="button" onclick="submitOrder()">Confirm Order</button>
              </div>
            </div>
          </form>
          </div>`;
  }
}

displayCart();

// jQuery Functions:
$(document).ready(function () {

  // Created the dropdown options via jQuery with this function
  let myOptions = {
    select: "--- Please select ---",
    forme: "This is for me.",
    gift: "This is a gift. Please do not include a slip.",
  };
  let mySelect = $("#dropdown");
  $.each(myOptions, function (val, text) {
    mySelect.append($("<option></option>").val(val).html(text));
  });

  // Created function to hide and show the delivery functions when someone selects either collect or delivery.
  $("#deliveryoptions").hide();
  $('input[name="getitmethod"]').click(function () {
    $("#deliveryoptions").hide();
    if ($('input[name="getitmethod"]').is(":checked")) {
      let radioValue = $("input[name='getitmethod']:checked").val();
      if (radioValue === "delivery") {
        $("#deliveryoptions").show();
      } else {
        $("#deliveryoptions").hide();
      }
    }
  });
});

// Created a function to uncheck radio buttons as delivery and collection is not in the same name group.
$('input[type="radio"]').mousedown(function () {
  if (this.checked) {
    $(this).mouseup(function (e) {
      var radio = this;
      setTimeout(function () {
        radio.checked = false;
        $("#deliveryoptions").hide();
      }, 5);
      $(this).unbind('mouseup');
    });
  }
});

//Created a function for the bee to "fly on the "Catalogue page".
$(document).keydown(function (key) {
  switch (parseInt(key.which, 10)) {
    // Left arrow pressed.
    case 37:
      $(".buzzerbee").stop().animate({
          left: "-=200px",
        },
        "fast"
      );
      break;
      // Up arrow pressed.
    case 38:
      $(".buzzerbee").stop().animate({
          top: "-=200px",
        },
        "fast"
      );
      break;
      // Right arrow pressed.
    case 39:
      $(".buzzerbee").stop().animate({
          left: "+=200px",
        },
        "fast"
      );
      break;
      // Down arrow pressed.
    case 40:
      $(".buzzerbee").stop().animate({
          top: "+=200px",
        },
        "fast"
      );
      break;
  }
});

// Created function to hide or show the product summary table on the "Catalogue" page.
$("#hide").click(function () {
  $("table").hide(1000);
});
$("#show").click(function () {
  $("table").show(1000);
});

// Created a chained function for the view our catalogue header on the "About Us" page.
$("#seeheaderbetter").click(function () {
  $("#viewcatalogue")
    .css("color", "#05520f")
    .animate({
      width: "100%",
    })
    //Enlarges the font size and makes the element bigger.
    .animate({
      fontSize: "46px",
    })
    .animate({
      borderWidth: 30,
    });
});
