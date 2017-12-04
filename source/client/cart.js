
function addToCart(event){
    event.preventDefault();
    var item_id=document.getElementById("single_item_id").innerHTML;
    item_id = parseInt(item_id,10);
    //var quantity = document.getElementById("new_item_quantity").value;
    var quantity=1;

    var data = {
        itemId: item_id,
        quantity: 1
    }
    console.log(data);

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
                    <div class="name"><b>${item['name']}</b></div>
                    <div class="description">Description: ${item['descriptionShort']}</div>
                    <div class="title">Quantity: ${item['quantity']}</div>
                    <div class="price">$${item['price']}</div>
                    <button class="cartDelete" onclick="deleteItem(event,${item['cartId']})">o</button>
            </div>`;
        }    
        htmlContainer.innerHTML += `<div id="totalAmount" class="total">${data['total']}</div>`;   
    });
}

function createOrder(total){
   event.preventDefault();

    var data = {
        totalPrice: total
    }

    httpRequest('POST', '/order/', data, function () {
        console.log('Successful creation of new order');
    });
}

function deleteItem(event,id){
    event.preventDefault();

    httpRequest('DELETE', '/cart/' + id, undefined, function () {
        console.log('Successful delete from cart');
        showCart(event);
    });
}

