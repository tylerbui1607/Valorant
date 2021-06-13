//slick slider
$('.second-carousel').slick({
    slidesToShow: 5,
    infinite: true,
    slidesToScroll: 1,
    prevArrow: '#pBtn',
    nextArrow: '#nBtn',
})

$('.brand-slider').slick({
    slidesToShow: 6,
    infinite: true,
    slidesToScroll: 1,
    prevArrow: '#pBtn',
    nextArrow: '#nBtn',
})

$('.third-carousel').slick({
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 1,
    prevArrow: '#p1Btn',
    nextArrow: '#n1Btn',
})

$('.slider-info-img').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
})

$('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-info-img',
    focusOnSelect: true,
    arrows: false,
})

$(document).ready(function () {
    $('.navbar-collapse').click(() => {
        $(".search-product").css('display', 'block');
    });

});

//function & base define
const lstType = ['Chair', 'Table', 'Decor', 'Bed'];

var currentSection = 'product-section';

function displayMessage(msg) {
    let message = document.querySelector('.message-popup');
    message.style.display = 'block';
    message.querySelector('.waiting').style.display = 'none';
    message.querySelector('.message').style.display = 'block';
    message.querySelector('.message .content').textContent = msg;
}

function prepareAdmin() {
    document.querySelector('.cart').style.display = 'none';
    document.querySelector('.nav-header').style.display = 'none';
    document.querySelector('.nav-header-space').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.querySelector('.pre-footer').style.display = 'none';
    document.querySelector('.setting').style.display = 'block';
    let setting = document.querySelector('.setting-select');
    document.getElementById('setting-btn').onclick = () => {
        if(setting.classList.contains('showsetting')){
            setting.classList.add('hidesetting');
            setting.classList.remove('showsetting');
        }else{
            setting.classList.add('showsetting');
            setting.style.display = 'block';
        }
    }
    setting.addEventListener('animationend', () => {
        if(setting.classList.contains('hidesetting')){
            setting.classList.remove('hidesetting');
            setting.style.display = 'none';
        }
    })
}

function calcCartItem() {
    if (localStorage.getItem('cart_info') !== null) {
        cart_info = JSON.parse(localStorage.getItem('cart_info'));
        document.querySelector('.cart-nitem').textContent = cart_info.length;
        return
    } else {
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
    } else {
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
function removeCartItem(e){
    console.log(e)
    let Item = e.target.id;
    let cartInfo = JSON.parse(localStorage.getItem("cart_info"));
    cartInfo = cartInfo.filter((value)=>{
        return value.id !== Item;
    })
    localStorage.setItem("cart_info",JSON.stringify(cartInfo));
    calcTotalPrice();
    createCart();
    calcCartItem();
}
function createCartItem(id,name, img, price, num, max) {
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
      <input type="number" class="item-quantity" name="" min="0" max = "${max}" value="${num}" id="">
      <button class="remove-item-btn">
        <i class="far fa-trash-alt" id ="${id}"></i>
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
            createCartItem(cart_info[i].id,cart_info[i].name, cart_info[i].img, cart_info[i].price, cart_info[i].num, cart_info[i].max);
        }
        calcTotalPrice();
        let button = document.querySelectorAll('.fa-trash-alt');
        for(var i = 0; i< button.length; i++){
            button[i].onclick =  removeCartItem;
        }
    }
}

function manageProduct() {
    let lst_product = document.querySelectorAll('.product-data');
    let edit_popup = document.querySelector('.edit-product-popup');
    let edit_form = document.querySelector('.edit-product-form');
    let edit_form_name = edit_form.querySelector('#pename');
    let edit_form_img = edit_form.querySelector('.edit-form-image img');
    let edit_form_price = edit_form.querySelector('#peprice');
    let edit_form_discount = edit_form.querySelector('#pediscount');
    let edit_form_number = edit_form.querySelector('#penumber');
    let edit_form_supplier = edit_form.querySelectorAll('#pesupplier option');
    let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
    for (let i = 0; i < lst_product.length; i++) {
        let product = lst_product[i];
        let typeid = product.querySelector('.pinfotype').textContent;
        let typename = lstType[parseInt(typeid) - 1];
        product.querySelector('.pinfotype').textContent = typename;
        product.querySelector('.btn-edit').addEventListener('click', () => {
            edit_popup.style.display = 'block';
            edit_popup.setAttribute('pid', lst_product[i].getAttribute('pid'));
            edit_form.classList.add('show');
            edit_form_name.value = product.querySelector('.pinfoname').textContent;
            edit_form_price.value = product.querySelector('.pinfoprice').textContent;
            edit_form_number.value = product.getAttribute('number');
            edit_form_discount.value = product.getAttribute('discount');
            edit_form_img.src = product.getAttribute('link');
            edit_form_supplier[parseInt(product.getAttribute('supplier') - 1)].selected = true;
            edit_form.querySelector(`#petype${typename.toLowerCase()}`).checked = true;
        })
    }
    close_edit_btn.addEventListener('click', () => {
        edit_form.classList.remove('show');
        edit_form.classList.add('hide');
    });
    edit_form.addEventListener('animationend', () => {
        if (edit_form.classList.contains('hide')) {
            edit_form.classList.remove('hide');
            edit_popup.style.display = 'none';
        }
    })
}

function manageSupplier() {
    let lst_supplier = document.querySelectorAll('.supplier-data');
    let edit_popup = document.querySelector('.edit-supplier-popup');
    let edit_form = document.querySelector('.edit-supplier-form');
    let edit_form_img = edit_form.querySelector('.edit-form-image img');
    let edit_form_name = edit_form.querySelector('#sename');
    let edit_form_address = edit_form.querySelector('#seaddress');
    let edit_form_pnumber = edit_form.querySelector('#sepnumber');
    let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
    for (let i = 0; i < lst_supplier.length; i++) {
        let supplier = lst_supplier[i];
        supplier.querySelector('.btn-edit').addEventListener('click', () => {
            edit_popup.style.display = 'block';
            edit_form.classList.add('show');
            edit_popup.setAttribute('sid', supplier.getAttribute('sid'));
            edit_form_name.value = supplier.querySelector('.sinfoname').textContent;
            edit_form_address.value = supplier.querySelector('.sinfoaddress').textContent;
            edit_form_pnumber.value = supplier.querySelector('.sinfopnumber').textContent;
            edit_form_img.src = supplier.getAttribute('link');
        })
    }
    close_edit_btn.addEventListener('click', () => {
        edit_form.classList.remove('show');
        edit_form.classList.add('hide');
    });
    edit_form.addEventListener('animationend', () => {
        if (edit_form.classList.contains('hide')) {
            edit_form.classList.remove('hide');
            edit_popup.style.display = 'none';
        }
    })
}

function manageStaff() {
    let lst_staff = document.querySelectorAll('.staff-data');
    let edit_popup = document.querySelector('.edit-staff-popup');
    let edit_form = document.querySelector('.edit-staff-form');
    let edit_form_name = edit_form.querySelector('#stename');
    let edit_form_pid = edit_form.querySelector('#stepid');
    let edit_form_pnumber = edit_form.querySelector('#stepnumber');
    let edit_form_role = edit_form.querySelector('#sterole');
    let edit_form_status = edit_form.querySelector('#stestatus');
    let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
    for (let i = 0; i < lst_staff.length; i++) {
        let staff = lst_staff[i];
        staff.querySelector('.btn-edit').addEventListener('click', () => {
            edit_popup.style.display = 'block';
            edit_form.classList.add('show');
            edit_form_name.value = staff.querySelector('.infoname').textContent;
            edit_form_pnumber.value = staff.querySelector('.infopnumber').textContent;
            edit_form_pid.value = staff.getAttribute('pid');
            edit_popup.setAttribute('stid', staff.getAttribute('stid'));
            edit_form_role[parseInt(staff.getAttribute('role') - 1)].selected = true;
            edit_form_status[parseInt(staff.getAttribute('status') - 1)].selected = true;
        })
    }
    close_edit_btn.addEventListener('click', () => {
        edit_form.classList.remove('show');
        edit_form.classList.add('hide');
    });
    edit_form.addEventListener('animationend', () => {
        if (edit_form.classList.contains('hide')) {
            edit_form.classList.remove('hide');
            edit_popup.style.display = 'none';
        }
    })
}

function manageSale(){
    let lst_order = document.querySelectorAll('.order-data');
    let edit_popup = document.querySelector('.edit-sale-popup');
    let edit_form = document.querySelector('.edit-sale-form');
    let edit_form_name = edit_form.querySelector('#orcname');
    let edit_form_pnumber = edit_form.querySelector('#orcpnumber');
    let edit_form_address = edit_form.querySelector('#orcaddress');
    let edit_form_note = edit_form.querySelector('#ordernote');
    let edit_form_status = edit_form.querySelector('#orstatus');
    let edit_form_total = edit_form.querySelector('.total-price');
    let edit_form_odate = edit_form.querySelector('#orderdate');
    let edit_form_ddate = edit_form.querySelector('#deliverydate');
    let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
    let submit_btn = edit_popup.querySelector('.edit-order-submit');
    for (let i = 0; i < lst_order.length; i++) {
        let order = lst_order[i];
        order.querySelector('.btn-edit').addEventListener('click',async () => {
            
            orderid = order.getAttribute('orderid');
            edit_popup.setAttribute('orderid', orderid);
            await fetch(`/api/orders/${orderid}`)
            .then((response)=>response.json())
            .then((data) => {
                console.log(data);
                edit_popup.style.display = 'block';
                edit_form.classList.add('show');
                edit_form_odate.value = data.order_date;
                if(data.delivery_date != null){
                    let d = new Date(data.delivery_date);
                    let date = d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate();
                    let month = d.getMonth() + 1 < 10 ? ('0' + ( d.getMonth() + 1 ) ) : d.getMonth();
                    let dd = `${d.getFullYear()}-${month}-${date}`;
                    edit_form_ddate.value = dd;
                }else{
                    edit_form_ddate.value = '';
                }
                edit_form_address.value = data.address;
                edit_form_pnumber.value = data.phonenumber;
                edit_form_name.value = data.customer_name; 
                edit_form_note.value = data.note;
                let options = edit_form_status.querySelectorAll('option');
                for(let i = 0 ; i < options.length ; i++){
                    if(options[i].value == data.status){
                        options[i].selected = true;
                    }
                }
                if(data.status == 'Pending'){
                    edit_form_ddate.disabled = false;
                    edit_form_pnumber.disabled = false;
                    edit_form_address.disabled = false;
                    edit_form_status.disabled = false;
                    submit_btn.disabled = false;
                }
                else{
                    edit_form_ddate.disabled = true;
                    edit_form_pnumber.disabled = true;
                    edit_form_address.disabled = true;
                    edit_form_status.disabled = true;
                    submit_btn.disabled = true;
                }
                edit_form_total.innerHTML = '$' + data.totalprice;
                let table = document.querySelector('.table-data');
                table.innerHTML = '';
                for(let i = 0 ; i < data.products.length ; i++){
                    product = data.products[i];
                    table.innerHTML += `
                    <tr>
                        <td class="product-name">
                            ${product.product_name}
                        </td>
                        <td class="order-number"> 
                            ${product.number}
                        </td>
                        <td class="product-price">
                            ${product.price}
                        </td>
                    </tr>
                    `
                }
                let d = new Date(data.order_date);
                let date = d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate();
                let month = d.getMonth() + 1 < 10 ? ('0' + ( d.getMonth() + 1 ) ) : d.getMonth() + 1;
                let min = `${d.getFullYear()}-${month}-${date}`;
                edit_form_ddate.min = min;
            })
        })
    }
    close_edit_btn.addEventListener('click', () => {
        edit_form.classList.remove('show');
        edit_form.classList.add('hide');
    });
    edit_form.addEventListener('animationend', () => {
        if (edit_form.classList.contains('hide')) {
            edit_form.classList.remove('hide');
            edit_popup.style.display = 'none';
        }
    })
}

function manageCusOrder(){
    let lst_order = document.querySelectorAll('.order-data');
    let edit_popup = document.querySelector('.edit-sale-popup');
    let edit_form = document.querySelector('.edit-sale-form');
    let edit_form_name = edit_form.querySelector('#orcname');
    let edit_form_pnumber = edit_form.querySelector('#orcpnumber');
    let edit_form_address = edit_form.querySelector('#orcaddress');
    let edit_form_note = edit_form.querySelector('#ordernote');
    let edit_form_status = edit_form.querySelector('#orstatus');
    let edit_form_total = edit_form.querySelector('.total-price');
    let edit_form_odate = edit_form.querySelector('#orderdate');
    let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
    let submit_btn = edit_popup.querySelector('.edit-order-submit');
    let cancel_btn = edit_popup.querySelector('.edit-order-cancel');
    for (let i = 0; i < lst_order.length; i++) {
        let order = lst_order[i];
        order.querySelector('.btn-edit').addEventListener('click',async () => {
            edit_popup.style.display = 'block';
            edit_form.classList.add('show');
            orderid = order.getAttribute('orderid');
            edit_popup.setAttribute('orderid', orderid);
            await fetch(`/api/orders/${orderid}`)
            .then((response)=>response.json())
            .then((data) => {
                console.log(data);
                edit_form_odate.value = data.order_date;
                edit_form_address.value = data.address;
                edit_form_pnumber.value = data.phonenumber;
                edit_form_name.value = data.customer_name; 
                edit_form_note.value = data.note;
                let options = edit_form_status.querySelectorAll('option');
                for(let i = 0 ; i < options.length ; i++){
                    if(options[i].value == data.status){
                        options[i].selected = true;
                    }
                }
                if(data.status == 'Expired' || data.status == 'Cancel'){
                    cancel_btn.disabled = true;
                    submit_btn.disabled = true;
                }
                else{
                    cancel_btn.disabled = false;
                    submit_btn.disabled = false;
                }
                edit_form_total.innerHTML = '$' + data.totalprice;
                let table = document.querySelector('.table-data');
                table.innerHTML = '';
                for(let i = 0 ; i < data.products.length ; i++){
                    product = data.products[i];
                    table.innerHTML += `
                    <tr>
                        <td class="product-name">
                            ${product.product_name}
                        </td>
                        <td class="order-number"> 
                            ${product.number}
                        </td>
                        <td class="product-price">
                            ${product.price}
                        </td>
                    </tr>
                    `
                }
            })
        })
    }
    close_edit_btn.addEventListener('click', () => {
        edit_form.classList.remove('show');
        edit_form.classList.add('hide');
    });

    cancel_btn.onclick = ()=>{
        let id = document.querySelector('.edit-sale-popup').getAttribute('orderid');
        upOrder = {
            status : 'Cancel'
        }
        fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(upOrder),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status == 'success') {
                    location.reload();
                }
            })
    }

    edit_form.addEventListener('animationend', () => {
        if (edit_form.classList.contains('hide')) {
            edit_form.classList.remove('hide');
            edit_popup.style.display = 'none';
        }
    })
}

function switchSection(){
    let btns = document.querySelectorAll('.setting-option');
    if(localStorage.getItem('section') != null){
        currentSection =JSON.parse(localStorage.getItem('section'));
    }
    document.querySelector(`.${currentSection}`).style.display = 'flex';
    for(let i = 0 ; i < btns.length ; i++){
        let btn = btns[i];
        btn.onclick = () => {
            let section = btn.getAttribute('section');
            console.log(section);
            document.querySelector(`.${currentSection}`).style.display = 'none';
            document.querySelector(`.${section}`).style.display = 'flex';
            currentSection = section;
            console.log(currentSection);
        }
    }
}
// thanh did this
function manageInstalment() {

}

function createLoginFunction() {
    let login_btn = document.querySelector('#login-btn');
    let close_btn = document.querySelector('#close-login-btn');
    let login_popup = document.querySelector('.login-popup');
    let login_form = document.querySelector('.login-form');
    let logout_btn = document.querySelector('.logout-btn');

    login_btn.addEventListener('click', () => {
        login_popup.style.display = 'block';
        login_form.classList.remove('hide');
        login_form.classList.add('show');
    })

    close_btn.addEventListener('click', () => {
        login_popup.classList.remove('show');
        login_form.classList.add('hide');
    })

    login_form.addEventListener('animationend', () => {
        if (login_form.classList.contains('hide')) {
            login_form.classList.remove('hide');
            login_popup.style.display = 'none';
            let name = document.getElementById('uName');
            let address = document.getElementById('uAddress');
            let phonenumber = document.getElementById('uPnumber');
            let username = document.getElementById('uUsername');
            let password = document.getElementById('uPassword');
            let loginpass = document.getElementById('Password');
            let loginusernam = document.getElementById('Username');
            let icons = document.querySelectorAll('.signup-icon, .login-icon');
            let message = document.querySelectorAll('.wrong-input-message');
            name.classList.remove('wrong-input');
            loginpass.classList.remove('wrong-input');
            loginusernam.classList.remove('wrong-input');
            address.classList.remove('wrong-input');
            phonenumber.classList.remove('wrong-input');
            username.classList.remove('wrong-input');
            password.classList.remove('wrong-input');
            name.value = '';
            address.value = '';
            phonenumber.value = '';
            username.value = '';
            password.value = '';
            for (let i = 0; i < icons.length; i++) {
                icons[i].classList.remove('wrong-icon');
            }
            for (let i = 0; i < message.length; i++) {
                message[i].style.display = 'none';
            }
        }
    })

    logout_btn.onclick = () => {
        fetch('/api/logout', {
            method: 'POST',
        }).then(
            () => {
                localStorage.removeItem('account_info');
                location.href = '/';
            }
        )
    }
}

function createCartItemFunction() {
    let lstItemQuantity = document.querySelectorAll('.item .item-info .item-quantity');
    for (let i = 0; i < lstItemQuantity.length; i++) {
        lstItemQuantity[i].addEventListener('input', () => {
            let cart_info = JSON.parse(localStorage.getItem('cart_info'));
            for (let j = 0; j < cart_info.length; j++) {
                if (cart_info[j].name === lstItemQuantity[i].parentElement.querySelector('.item-name').textContent) {
                    cart_info[j].num = lstItemQuantity[i].value;
                    if (cart_info[j].num == 0) {
                        lstItemQuantity[i].parentElement.parentElement.remove();
                        cart_info.splice(j, 1);
                    }
                    if (cart_info.length === 0)
                        localStorage.removeItem('cart_info');
                    else
                        localStorage.setItem('cart_info', JSON.stringify(cart_info));
                }
            }
            calcTotalPrice();
            calcCartItem();
        })
    }
}

function createCartFunction() {

    let cart_popup = document.querySelector('.cart-popup');
    let cart_form = document.querySelector('.cart-form');
    let cart_btn = document.querySelector('#cart-btn-2');
    let cart_action = document.querySelector('.cart-action');
    let checkout_btn = cart_form.querySelector('#checkout-btn');
    let order_btn = document.getElementById('order-btn');

    checkout_btn.onclick = () => {
        calcTotalPrice();
        cart_action.classList.remove('cart-show-item');
        cart_action.classList.add('cart-show-checkout');
        document.querySelector('.checkout-form .provisional-cost').textContent =
            cart_form.querySelector('.cart-total .total-price').textContent;
        if (localStorage.getItem('account_info') != null) {
            let customer_info = JSON.parse(localStorage.getItem('account_info'));
            document.getElementById('cusname').value = customer_info.name;
            if (customer_info.role == 4) {
                document.getElementById('cusaddress').value = customer_info.address;
                document.getElementById('cusphone').value = customer_info.phone;
            }
        }
    }

    order_btn.onclick = () => {
        let data = {};
        let listProduct = [];

        // get name item
        var cartItem = document.getElementById('cartItem');
        var cartLength = $('.cart-item').children().length;
        data.note = document.getElementById('note').value;
        data.checked = false;

        // check if instalment payment was chosen
        if (document.getElementById('inspay').checked) {
            data.checked = true;
        }
        else if (document.getElementById('otpay').checked) {
            data.checked = false;
        }

        if (localStorage.getItem('cart_info') != null) {
            let cart_info = JSON.parse(localStorage.getItem('cart_info'));
            data.order = cart_info;
            data.totalprice = document.querySelector('.cart-checkout .total-cost').textContent.slice(1, 30);
            for (var i = 1; i <= cartLength * 2; i += 2) {
                var item = cartItem.childNodes[i];
                var itemInfo = item.childNodes[3];
                var itemNamePrice = itemInfo.childNodes[1];
                var itemName = itemNamePrice.childNodes[1];
                listProduct.push(itemName.textContent);
            }
            data.list_product = listProduct;
        }
        else {
            data.order = [];
        }

        if (localStorage.getItem('account_info') != null) {
            let account_info = JSON.parse(localStorage.getItem('account_info'));
            data.customer = account_info.id;
        }
        else {
            data.customer = '5ff1d80c793a7ad089cb70fd'
        }

        let wrongCount = 0;

        let messages = document.querySelectorAll('.message-container .wrong-cart-message');
        let cusname = document.getElementById('cusname').value;
        let cusaddress = document.getElementById('cusaddress').value;
        let cusphone = document.getElementById('cusphone').value;

        if(cusname == ''){
            wrongCount++;
            messages[0].style.display = 'block';
        }else{
            messages[0].style.display = 'none';
            data.customer_name  = cusname;
        }
        if(cusaddress == ''){
            wrongCount++;
            messages[1].style.display = 'block';
        }else{
            messages[1].style.display = 'none';
            data.address = cusaddress;
        }
        if(cusphone == ''){
            wrongCount++;
            messages[2].style.display = 'block';
        }else{
            messages[2].style.display = 'none';
            data.phonenumber = cusphone;
        }

        if(wrongCount == 0){
            console.log(data);
    
            fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        displayMessage('Order successfully!');
                        localStorage.removeItem('cart_info');
                    }
                })
        }
    }

    cart_btn.addEventListener('click', () => {
        createCart();
        createCartItemFunction();
        cart_popup.style.display = 'block';
        cart_action.classList.remove('cart-hide-item');
        cart_action.classList.add('cart-show-item');
    })

    window.onclick = (e) => {
        if (e.target == cart_popup) {
            if (cart_action.classList.contains('cart-show-item')) {
                cart_action.classList.remove('cart-show-item');
                cart_action.classList.add('cart-hide-item');
            } else if (cart_action.classList.contains('cart-show-checkout')) {
                cart_action.classList.remove('cart-show-checkout');
                cart_action.classList.add('cart-hide-checkout');
            }
        }
    }

    cart_action.addEventListener('animationend', () => {
        if (cart_action.classList.contains('cart-show-item')) {
            cart_action.classList.add('cart-action-item');
        }
        if (cart_action.classList.contains('cart-show-checkout')) {
            cart_action.classList.remove('cart-action-item');
            cart_action.classList.add('cart-action-checkout');
        }
        if (cart_action.classList.contains('cart-hide-item')) {
            cart_action.classList.remove('cart-action-item');
            cart_popup.style.display = 'none';
        }
        if (cart_action.classList.contains('cart-hide-checkout')) {
            cart_action.classList.remove('cart-action-checkout');
            cart_action.classList.remove('cart-hide-checkout');
            cart_popup.style.display = 'none';
        }
    })
}

document.querySelector('.search-product-button').onclick = () => {
    let value = document.querySelector(".search-product-text").value;
    location.href = 'http://' + window.location.hostname + ':' + window.location.port + `/products/search/${value}`;
}

function createProductFunction() {
    let lst_products = document.querySelectorAll('.product-card');
    for (let i = 0; i < lst_products.length; i++) {
        let product = lst_products[i];
        product.querySelector('.btn-addcart').addEventListener('click', () => {
            let product_name = product.querySelector('.product-name').textContent.trim();
            let product_img = product.querySelector('.product-img img').src.replace('http://localhost:3000', '');
            let product_price = product.querySelector('.product-price').textContent.replace('$', '').trim();
            let product_id = product.getAttribute('pid');
            let product_max = product.getAttribute('num');
            let cart_info = [];
            if (localStorage.getItem('cart_info') === null) {
                let product_info = {
                    id: product_id,
                    name: product_name,
                    price: parseInt(product_price),
                    img: product_img,
                    max: product_max,
                    num: 1,
                }
                cart_info.push(product_info);
                localStorage.setItem('cart_info', JSON.stringify(cart_info));
            } else {
                cart_info = JSON.parse(localStorage.getItem('cart_info'));
                let product_info = {
                    id: product_id,
                    name: product_name,
                    price: parseInt(product_price),
                    img: product_img,
                    max: product_max,
                    num: 1,
                }
                let j = 0;
                for (j = 0; j < cart_info.length; j++) {
                    if (cart_info[j].name == product_name) {
                        if(cart_info[i].max > cart_info[i].num)
                            cart_info[j].num++;
                        break;
                    }
                }
                if (j == cart_info.length)
                    cart_info.push(product_info);
                localStorage.setItem('cart_info', JSON.stringify(cart_info));
            }
            document.querySelector('.cart-nitem').textContent = cart_info.length;
        })
    }
}

document.querySelector('.message-popup .next-btn').onclick = () => {
    location.reload();
}

async function uploadimage(img, result)  {
    var form = new FormData();
    form.append('image', img);
    let key = '90ec3b1621ae4025423406fc7df0c6fc';
    let url = `https://api.imgbb.com/1/upload?key=${key}`;
    let config = {
        method: 'POST',
        header: {
            'processData': false,
            'mimeType': 'multipart/form-data',
            'contentType': false,
        },
        body: form
    }
    await fetch(url, config)
        .then(response => response.json())
        .then(data => {
            console.group(data.data.url)
            result.image = data.data.url;
        })
}

async function createProduct() {
    let submit = document.querySelector('#product-submit');
    submit.onclick = async function () {
        let product = document.querySelector('.add-product-form');
        let name = product.querySelector('#pname').value;
        let radios = product.querySelectorAll('input[name = "type"]');
        let type = 0;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                console.log(radios[i].value);
                type = radios[i].value;
            }
        }
        let price = product.querySelector('#price').value;
        let number = product.querySelector('#number').value;
        let supplier = product.querySelector('#supplier').value;
        let image = product.querySelector('#image').value.replace('C:\\fakepath\\', '');
        let wrongCount = 0;
        let message = product.querySelectorAll('.wrong-input-message');
        if (name === '') {
            wrongCount++;
            message[0].style.display = 'block';
        } else {
            message[0].style.display = 'none';
        }
        if (type == 0) {
            wrongCount++;
            message[1].style.display = 'block';
        } else {
            message[1].style.display = 'none';
        }
        if (price === '') {
            wrongCount++;
            message[2].style.display = 'block';
        } else {
            message[2].style.display = 'none';
        }
        if (image === '') {
            image = 'shortcut.png';
        }
        if (wrongCount === 0) {
            let product2Insert = {
                name,
                type,
                price,
                supplier,
                image,
                number
            }
            let message = document.querySelector('.message-popup');
            message.style.display = 'block';
            message.querySelector('.message').style.display = 'none';
            message.querySelector('.waiting').style.display = 'block';
            let img = product.querySelector('#image').files[0];
            await uploadimage(img, product2Insert);
            console.log(product2Insert);
            fetch('/api/create/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product2Insert),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        message.querySelector('.waiting').style.display = 'none';
                        message.querySelector('.message').style.display = 'block';
                        message.querySelector('.message .content').textContent = 'Adding product successfully!';
                    }
                })
        }
    }
}

async function createSupplier() {
    let submit = document.querySelector('#supplier-submit');
    submit.onclick = async function () {
        let supplier = document.querySelector('.add-supplier-form');
        let name = supplier.querySelector('#sname').value;
        let address = supplier.querySelector('#saddress').value;
        let phonenumber = supplier.querySelector('#spnumber').value;
        let image = supplier.querySelector('#simage').value.replace('C:\\fakepath\\', '');
        let wrongCount = 0;
        let message = supplier.querySelectorAll('.wrong-input-message');
        if (name === '') {
            wrongCount++;
            message[0].style.display = 'block';
        } else {
            message[0].style.display = 'none';
        }
        if (address === '') {
            wrongCount++;
            message[1].style.display = 'block';
        } else {
            message[1].style.display = 'none';
        }
        if (phonenumber === '') {
            wrongCount++;
            message[2].style.display = 'block';
        } else {
            message[2].style.display = 'none';
        }
        if (image === '') {
            image = 'shortcut.png';
        }
        if (wrongCount === 0) {
            let supplier2Insert = {
                name,
                address,
                phonenumber,
                image
            }
            let message = document.querySelector('.message-popup');
            message.style.display = 'block';
            message.querySelector('.message').style.display = 'none';
            message.querySelector('.waiting').style.display = 'block';
            let img = supplier.querySelector('#simage').files[0];
            await uploadimage(img, supplier2Insert);
            console.log(supplier2Insert);
            fetch('/api/create/supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplier2Insert),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        message.querySelector('.waiting').style.display = 'none';
                        message.querySelector('.message').style.display = 'block';
                        message.querySelector('.message .content').textContent = 'Adding supplier successfully!';
                    }
                })
        }
    }
}

function createStaff() {
    let submit = document.querySelector('#staff-submit');
    submit.onclick = function () {
        let staff = document.querySelector('.add-staff-form');
        let name = staff.querySelector('#stname').value;
        let id = staff.querySelector('#stid').value;
        let phonenumber = staff.querySelector('#stpnumber').value;
        let type = staff.querySelector('#sttype').value;
        let username = staff.querySelector('#stusername').value;
        let password = staff.querySelector('#stpassword').value;
        let wrongCount = 0;
        let message = staff.querySelectorAll('.wrong-input-message');
        if (name === '') {
            wrongCount++;
            message[0].style.display = 'block';
        } else {
            message[0].style.display = 'none';
        }
        if (id === '') {
            wrongCount++;
            message[1].style.display = 'block';
        } else {
            message[1].style.display = 'none';
        }
        if (phonenumber === '') {
            wrongCount++;
            message[2].style.display = 'block';
        } else {
            message[2].style.display = 'none';
        }
        if (username === '') {
            wrongCount++;
            message[3].style.display = 'block';
        } else {
            message[3].style.display = 'none';
        }
        if (password === '') {
            wrongCount++;
            message[4].style.display = 'block';
        } else {
            message[4].style.display = 'none';
        }
        if (wrongCount === 0) {
            let staff2Insert = {
                name,
                id,
                phonenumber,
                type,
                username,
                password
            }
            console.log(staff2Insert);
            fetch('/api/create/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(staff2Insert),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        let message = document.querySelector('.message-popup');
                        message.querySelector('.content').textContent = 'Adding staff successfully!';
                        message.style.display = 'block';
                    }
                })
        }
    }
}

function updateProduct() {
    let submitbtn = document.querySelector('.edit-product-submit');
    let name = document.querySelector('#pename');
    let supplier = document.querySelector('#pesupplier');
    let price = document.querySelector('#peprice');
    let number = document.querySelector('#penumber');
    let status = document.querySelector('#pestatus');
    let discount = document.querySelector('#pediscount');
    let radios = document.querySelectorAll('.edit-product-container input[type = "radio"]');
    let type = 0;
    submitbtn.onclick = () => {
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                type = radios[i].value;
            }
        }
        let id = document.querySelector('.edit-product-popup').getAttribute('pid');
        let upProduct = {
            id: id,
            name: name.value,
            supplier: supplier.value,
            price: price.value,
            number: number.value,
            status: status.value,
            type,
            discount: discount.value,
        }
        console.log(upProduct);
        fetch('/api/update/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(upProduct),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status == 'success') {
                    location.reload();
                }
            })
    }
}

function updateSupplier() {
    let submitbtn = document.querySelector('.edit-supplier-submit');
    let name = document.getElementById('sename');
    let address = document.getElementById('seaddress');
    let pnumber = document.getElementById('sepnumber');
    submitbtn.onclick = () => {
        let id = document.querySelector('.edit-supplier-popup').getAttribute('sid');
        let upSupplier = {
            id: id,
            name: name.value,
            address: address.value,
            pnumber: pnumber.value,
        }
        fetch('/api/update/supplier', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(upSupplier),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status == 'success') {
                    location.reload();
                }
            })
    }
}

function updateStaff() {
    let submitbtn = document.querySelector('.edit-staff-submit');
    let name = document.getElementById('stename');
    let personalID = document.getElementById('stepid');
    let pnumber = document.getElementById('stepnumber');
    let role = document.getElementById('sterole');
    let status = document.getElementById('stestatus');
    submitbtn.onclick = () => {
        let id = document.querySelector('.edit-staff-popup').getAttribute('stid');
        let upStaff = {
            id: id,
            name: name.value,
            personalID: personalID.value,
            pnumber: pnumber.value,
            role: role.value,
            status: status.value
        }
        fetch('/api/update/staff', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(upStaff),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status == 'success') {
                    location.reload();
                }
            })
    }
}

function updateOrder(){
    let submitbtn = document.querySelector('.edit-order-submit');
    let phonenumber = document.getElementById('orcpnumber');
    let status = document.getElementById('orstatus');
    let address = document.getElementById('orcaddress');
    let delivery_date = document.getElementById('deliverydate');
    submitbtn.onclick = () => {
        let id = document.querySelector('.edit-sale-popup').getAttribute('orderid');
        let upOrder = {
            phonenumber: phonenumber.value,
            status: status.value,
            address: address.value,
        }
        if(delivery_date != null){
            upOrder.delivery_date = delivery_date.value;
            console.log(upOrder.delivery_date);
            if(status.value == 'Complete' && upOrder.delivery_date == '')
                upOrder.delivery_date = Date.now();
        }
        console.log(upOrder);
        fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(upOrder),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status == 'success') {
                    location.reload();
                }
            })
    }
}

function register() {
    let signupbtn = document.querySelector('.sign-up #signup-btn');
    let name = document.getElementById('uName');
    let address = document.getElementById('uAddress');
    let phonenumber = document.getElementById('uPnumber');
    let username = document.getElementById('uUsername');
    let password = document.getElementById('uPassword');
    let icons = document.querySelectorAll('.signup-icon');
    let message = document.querySelectorAll('.input-container p');
    signupbtn.onclick = () => {
        let wrongCount = 0; {
            if (name.value === '') {
                wrongCount++;
                name.classList.add('wrong-input');
                icons[0].classList.add('wrong-icon');
                message[0].style.display = 'block';
            } else {
                name.classList.remove('wrong-input');
                icons[0].classList.remove('wrong-icon');
                message[0].style.display = 'none';
            }
            if (address.value === '') {
                wrongCount++;
                address.classList.add('wrong-input');
                icons[1].classList.add('wrong-icon');
                message[1].style.display = 'block';
            } else {
                address.classList.remove('wrong-input');
                icons[1].classList.remove('wrong-icon');
                message[1].style.display = 'none';
            }
            if (phonenumber.value === '') {
                wrongCount++;
                phonenumber.classList.add('wrong-input');
                icons[2].classList.add('wrong-icon');
                message[2].style.display = 'block';
            } else {
                phonenumber.classList.remove('wrong-input');
                icons[2].classList.remove('wrong-icon');
                message[2].style.display = 'none';
            }
            if (username.value === '' || username.value.trim().includes(' ')) {
                wrongCount++;
                username.classList.add('wrong-input');
                icons[3].classList.add('wrong-icon');
                if (username.value.trim().includes(' ')) {
                    message[3].innerHTML = 'Username must not contain space!';
                }
                message[3].style.display = 'block';
            } else {
                username.classList.remove('wrong-input');
                icons[3].classList.remove('wrong-icon');
                message[3].style.display = 'none';
            }
            if (password.value === '') {
                wrongCount++;
                password.classList.add('wrong-input');
                icons[4].classList.add('wrong-icon');
                message[4].style.display = 'block';
            } else {
                password.classList.remove('wrong-input');
                icons[4].classList.remove('wrong-icon');
                message[4].style.display = 'none';
            }
        }
        if (wrongCount === 0) {
            let customer = {
                name: name.value,
                address: address.value,
                phonenumber: phonenumber.value,
                username: username.value,
                password: password.value
            }
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        console.log(data);
                        localStorage.setItem('account_info', JSON.stringify(data));
                        location.reload();
                    } else {
                        username.classList.add('wrong-input');
                        icons[3].classList.add('wrong-icon');
                        message[3].innerHTML = 'Username already exists!';
                        message[3].style.display = 'block';
                    }
                })
        }
    }
}

function login() {
    document.querySelector('.login #login-submit').onclick = () => {
        let wrongCount = 0;
        let username = document.querySelector('.login #Username');
        let password = document.querySelector('.login #Password');
        let message = document.querySelectorAll('.login .wrong-input-message');
        let icons = document.querySelectorAll('.login .login-icon');
        if (username.value == '') {
            username.classList.add('wrong-input');
            icons[0].classList.add('wrong-icon');
            message[0].style.display = 'block';
            wrongCount++;
        } else {
            username.classList.remove('wrong-input');
            icons[0].classList.remove('wrong-icon');
            message[0].style.display = 'none';
        }
        if (password.value == '') {
            password.classList.add('wrong-input');
            icons[1].classList.add('wrong-icon');
            message[1].style.display = 'block';
            wrongCount++;
        } else {
            password.classList.remove('wrong-input');
            icons[1].classList.remove('wrong-icon');
            message[1].style.display = 'none';
        }
        if (wrongCount === 0) {
            let user = {
                username: username.value,
                password: password.value
            }
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        console.log(data);
                        localStorage.setItem('account_info', JSON.stringify(data));
                        if (data.role == 2) {
                            console.log('redirec');
                            window.location.href = 'http://localhost:3000/admin';
                        } else
                            location.reload();
                    } else {
                        message[2].style.display = 'block';
                    }
                })
        }
    }
}

function prepareNormal() {
    console.log('prepare normal'); {
        console.log('calc time to remove');
        let loadTime = new Date();
        let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
        let refreshTime = loadTime.getTime() - unloadTime.getTime();
        if (refreshTime > 3000) //3000 milliseconds
        {
            console.log('remove localStg');
            window.localStorage.removeItem('cart_info');
            localStorage.removeItem('account_info');
            sessionStorage.clear();
        }
        calcCartItem();
    }
    document.querySelector('.cart').style.display = 'block';
    if (localStorage.getItem('account_info') === null) {
        console.log('deleted')
        document.querySelector('.login-info').style.display = 'block';
        document.querySelector('.account-info').style.display = 'none';
    } else {
        console.log('not deleted')
        document.querySelector('.account-info').style.display = 'block';
        document.querySelector('.login-info').style.display = 'none';
        document.querySelector('.account-info .account-name').innerHTML =
            JSON.parse(localStorage.getItem('account_info')).name;
    }
}

//remove localStorage when close tab
window.onbeforeunload = function (e) {
    window.localStorage.unloadTime = JSON.stringify(new Date());
    localStorage.setItem('section', JSON.stringify(currentSection));
}
//admin function - normal function
if (window.location.href === 'http://localhost:3000/admin') {
    prepareAdmin();
    manageProduct();
    manageStaff();
    manageSupplier();
    manageSale();
    createProduct();
    createStaff();
    createSupplier();
    updateProduct();
    updateSupplier();
    updateStaff();
    updateOrder();
    switchSection();
} else {
    prepareNormal();
    createLoginFunction();
    register();
    login();
    createCartFunction();
    createProductFunction();
    manageCusOrder();
    updateOrder();
}
