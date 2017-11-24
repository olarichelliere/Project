
function addToCart(event, item_id){
    event.preventDefault();
    
    //var quantity = document.getElementById("new_item_quantity").value;
    var quantity=1;

    var data = {
        itemId: item_id
    }
  
    httpRequest('POST', '/cart/', data, function (newRecord) {
        console.log('Successful added to cart', newRecord);
    });
}

function showCart(event){
    event.preventDefault();
     
    hideAllSections();

    document.getElementById('cart_container').style.display = "inline-table";

    var htmlContainer = document.getElementById('cart_detail');
    htmlContainer.innerHTML = 'My Cart';

    httpRequest('GET', '/cart/', undefined, function (data) {
        for (var i = 0; i < data['items'].length; i++) {
            var item = data['items'][i];
            htmlContainer.innerHTML += 
                `<div class="cart_box">
                    <div class="thumbnail"><img src="${baseURL}/../images/${item['image']}"/></div>   
                    <div class="title">Quantity: ${item['quantity']}</div>
                    <div class="name">${item['name']}</div>
                    <div class="price">$${item['price']}</div>

            </div>`;
        }    
        htmlContainer.innerHTML += `<div id="totalAmount" class="total">Total: ${data['total']}</div>`;   
    });

}

function proceedToPayment(event, total){
   
    event.preventDefault();

    // if payment is succeful create order and delete cart

    var data = {
        totalPrice: total
    }

    // not finished, need code from school computer
    httpRequest('POST', '/order/', data, function () {
        console.log('Successful creation of new order');
    });
}

