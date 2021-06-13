const lstType = ['Chair', 'Table', 'Decor', 'Bed'];

function displayAdmin() {
    document.querySelector('.cart').style.display               = 'none';
    document.querySelector('.nav-header').style.display         = 'none';
    document.querySelector('.nav-header-space').style.display   = 'none';
    document.querySelector('.footer').style.display             = 'none';
    document.querySelector('.pre-footer').style.display         = 'none';
    document.querySelector('.setting').style.display            = 'block';
}

function manageProduct() {
    let products    = document.querySelectorAll('.product-data');
    let popup       = document.querySelector('.edit-product-popup');
    let form        = document.querySelector('.edit-product-form');
    let name        = form.querySelector('#pename');
    let img         = form.querySelector('.edit-form-image img');
    let price       = form.querySelector('#peprice');
    let number      = form.querySelector('#penumber');
    let supplier    = form.querySelectorAll('#pesupplier option');
    let close_btn   = popup.querySelector('.close-edit-btn');

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let typeid  = product.querySelector('.pinfotype').textContent;
        let type    = lstType[parseInt(typeid) - 1];

        product.querySelector('.pinfotype').textContent = type;
        product.querySelector('.btn-edit').addEventListener('click', () => {
            popup.setAttribute('pid', products[i].getAttribute('pid'));
            form.classList.add('show');
            popup.style.display = 'block';

            name.value      = product.querySelector('.pinfoname').textContent;
            price.value     = product.querySelector('.pinfoprice').textContent;
            number.value    = product.getAttribute('number');
            img.src         = product.getAttribute('link');

            supplier[parseInt(product.getAttribute('supplier') - 1)].selected   = true;
            form.querySelector(`#petype${typename.toLowerCase()}`).checked      = true;
        })
    }

    close_btn.addEventListener('click', () => {
        form.classList.remove('show');
        form.classList.add('hide');
    });

    form.addEventListener('animationend', () => {
        if (form.classList.contains('hide')) {
            form.classList.remove('hide');
            popup.style.display = 'none';
        }
    })
}

function manageSupplier() {
    let suppliers   = document.querySelectorAll('.supplier-data');
    let popup       = document.querySelector('.edit-supplier-popup');
    let form        = document.querySelector('.edit-supplier-form');
    let img         = form.querySelector('.edit-form-image img');
    let name        = form.querySelector('#sename');
    let pnumber     = form.querySelector('#sepnumber');
    let address     = form.querySelector('#seaddress');
    let close_btn   = popup.querySelector('.close-edit-btn');
    for (let i = 0; i < suppliers.length; i++) {
        let supplier = suppliers[i];
        console.log(supplier);
        supplier.querySelector('.btn-edit').addEventListener('click', () => {
            console.log("thanh");
            popup.setAttribute('sid', suppliers[i].getAttribute('sid'));
            form.classList.add('show');
            popup.style.display = 'block';

            name.value      = supplier.querySelector('.sinfoname').textContent;
            address.value   = supplier.querySelector('.sinfoaddress').textContent;
            pnumber.value   = supplier.querySelector('.sinfopnumber').textContent;
            img.src         = supplier.getAttribute('link');
        })
    }

    close_btn.addEventListener('click', () => {
        form.classList.remove('show');
        form.classList.add('hide');
    });

    form.addEventListener('animationend', () => {
        if (form.classList.contains('hide')) {
            form.classList.remove('hide');
            popup.style.display = 'none';
        }
    })
}

function manageStaff() {
    let staffs = document.querySelectorAll('.staff-data');
    let popup = document.querySelector('.edit-staff-popup');
    let form = document.querySelector('.edit-staff-form');
    let name = edit_form.querySelector('#stename');
    let pid = edit_form.querySelector('#stepid');
    let pnumber = edit_form.querySelector('#stepnumber');
    let role = edit_form.querySelector('#sterole');
    let status = edit_form.querySelector('#stestatus');
    let btn = edit_popup.querySelector('.close-edit-btn');
    for (let i = 0; i < lst_staff.length; i++) {
      let staff = lst_staff[i];
      staff.querySelector('.btn-edit').addEventListener('click', () => {
        edit_popup.style.display = 'block';
        edit_form.classList.add('show');
        edit_form_name.value = staff.querySelector('.infoname').textContent;
        edit_form_pnumber.value = staff.querySelector('.infopnumber').textContent;
        edit_form_pid.value = staff.getAttribute('pid');
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

function manageBill(){
    
}

function manageInstalment(){
    let instal = document.querySelector('.instal-data');
    let popup = document.querySelector('.')
}