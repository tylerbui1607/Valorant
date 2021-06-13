function calcCartItem() {
  if (localStorage.getItem('cart_info') !== null) {
    cart_info = JSON.parse(localStorage.getItem('cart_info'));
    document.querySelector('.cart-nitem').textContent = cart_info.length;
    return
  }
  else {
    document.querySelector('.cart-nitem').textContent = 0;
  }
}

function calcTotalPrice() {
  var total_price = 0;
  if (localStorage.getItem('cart_info')) {
    let cart_info = JSON.parse(localStorage.getItem('cart_info'));
    for (let i = 0; i < cart_info.length; i++) {
      total_price += cart_info[i].num * cart_info[i].price;
    }
    document.querySelector('.cart-checkout .provisional-cost').textContent = '$' + total_price;
    document.querySelector('.cart-checkout .total-cost').textContent = '$' + (50 + total_price);
  }
  else {
    total_price = 0;
    document.querySelector('.cart-checkout .transportation-cost').textContent = '$0';
    document.querySelector('.cart-checkout .provisional-cost').textContent = '$0';
    document.querySelector('.cart-checkout .total-cost').textContent = '$0';
  }
  document.querySelector('.cart-total').innerHTML = `
    <div class="total-txt">Total</div>
    <div class="total-price">$${total_price}</div>
    `
}


function createCartItem(name, img, price, num) {
  document.querySelector('.cart-item').innerHTML += `
    <div class="item">
      <div class="item-img">
        <img src="${img}" alt="">
      </div>
      <div class="item-info">
        <div class="item-name-price">
          <div class="item-name">${name}</div>
          <div class="item-price">$${price}</div>
        </div>
        <input type="number" class="item-quantity" name="" min="0" value="${num}" id="">
        <button class="remove-item-btn")">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
    `
}

function createCart() {
  if (localStorage.getItem('cart_info') !== null) {
    document.querySelector('.cart-item').innerHTML = '';
    let cart_info = JSON.parse(localStorage.getItem('cart_info'));
    for (let i = 0; i < cart_info.length; i++) {
      createCartItem(cart_info[i].name, cart_info[i].img, cart_info[i].price, cart_info[i].num);
    }
    calcTotalPrice();
  }
}

