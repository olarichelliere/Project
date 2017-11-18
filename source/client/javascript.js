
var baseURL = 'http://localhost/api';

var userToken = getCookie('token');
var isAdmin = getCookie('isAdmin');

function httpRequest(method, url, payload, callback) {
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        // Process the server response here.
        if (httpRequest.readyState !== XMLHttpRequest.DONE) {
            // Not ready yet
            return
        }

        if (httpRequest.status !== 200) {
            alert('Something went wrong: ' + httpRequest.responseText);
            return
        }

        callback(JSON.parse(httpRequest.responseText));
    };

    httpRequest.open(method, baseURL + url);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.setRequestHeader('Authorization', 'Bearer ' + userToken);

    if (payload) {
        payload = JSON.stringify(payload)
    }

    httpRequest.send(payload);
}

function fileUploadItems(url, file, callback) {
    var reader = new FileReader();  
    var httpRequest = new XMLHttpRequest();
    var formData = new FormData();

    httpRequest.open("POST", baseURL + url);

    httpRequest.onreadystatechange = function(receivedData) {
        if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
            callback();
        }
    };    

    formData.append('new_item_image',file);
    httpRequest.send(formData);
  }

  function fileUploadCategories(url, file, callback) {
    var reader = new FileReader();  
    var httpRequest = new XMLHttpRequest();
    var formData = new FormData();

    httpRequest.open("POST", baseURL + url);

    httpRequest.onreadystatechange = function(receivedData) {
        if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200) {
            callback();
        }
    };    

    formData.append('new_category_image',file);
    httpRequest.send(formData);
}

function showItems(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('list_container');

    htmlContainer.style.display = "inline-flex";


    populateCategoriesList(event);
    populateItemsList(event);
}

function populateCategoriesList(event){
    var htmlContainer = document.getElementById('list_categories_Name_container');
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/categories', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            htmlContainer.innerHTML += 
                `<div class="category">
                    <a href="#" onclick="filter(event, ${category['id']})">
                        <div class="name">${category["name"]}</div>
                        <div class="description">${category["description"]}</div>
                    </a>
                </div>`;
        }
    });
}

function search(event){
    var htmlContainer = document.getElementById('list_items_container');
    var searchTXT=document.getElementById('searchItem').value;
    document.getElementById('searchItem').value='';
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/items?searchTXT='+searchTXT, undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            htmlContainer.innerHTML +=
                `<div class="item_box">
                    <a href="#" onclick="showItem(event, ${item['id']})">
                        <div class="center"><img src="${baseURL}/../images/${item['image']}"/></div>
                        <div class="title">${item["name"]}</div>
                        <div class="description">${item["descriptionShort"]}</div>
                        <div class="price">$${item["price"]}</div>
                    </a>
                </div>`;
        }
    });
}

function populateItemsList(event){
    var htmlContainer = document.getElementById('list_items_container');
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/items', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            htmlContainer.innerHTML +=
                `<div class="item_box">
                    <a href="#" onclick="showItem(event, ${item['id']})">
                        <div class="center"><img src="${baseURL}/../images/${item['image']}"/></div>
                        <div class="title">${item["name"]}</div>
                        <div class="description">${item["descriptionShort"]}</div>
                        <div class="price">$${item["price"]}</div>
                    </a>
                </div>`;
        }
    });
}

function showCategories(event) {
    event.preventDefault();
    
    hideAllSections();
  
    var htmlContainer = document.getElementById('list_categories_container');
    htmlContainer.innerHTML = '';
    htmlContainer.style.display = "inline";
    
    httpRequest('GET', '/categories', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            htmlContainer.innerHTML +=
                `<div class="category_box">
                    <a href="#" onclick="filterByCategory(event,${category['id']})">
                        <div class="center"><img src="${baseURL}/../images/${category['image']}"/></div>
                        <div class="title">${category["name"]}</div>
                        <div class="description">${category["description"]}</div>
                    </a>
                </div>`;
        }
    });

}

function filterByCategory(event,id){
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('list_container');

    htmlContainer.style.display = "inline";

    populateCategoriesList(event);
    filter(event,id);
}

function filter(event,id){
    event.preventDefault();
    

    var htmlContainer = document.getElementById('list_items_container');
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/items?categoryid='+id, undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            htmlContainer.innerHTML += 
                `<div class="item_box">
                <a href="#" onclick="showItem(event, ${item['id']})">
                    <div class="center"><img src="${baseURL}/../images/${item['image']}"/></div>
                    <div class="title">${item["name"]}</div>
                    <div class="description">${item["descriptionShort"]}</div>
                    <div class="price">$${item["price"]}</div>
                </a>
            </div>`;
        }
    });
}

 
function showItem(event, id) {
    event.preventDefault();
    
    hideAllSections();
    
    var htmlContainer = document.getElementById('single_item_container');
    htmlContainer.style.display = "inline-block";
    
    httpRequest('GET', '/items/' + id, undefined, function (data) {
        document.getElementById('single_item_image').innerHTML =  `<img src="${baseURL}/../images/${data.image}"/>`;
        document.getElementById('single_item_name').innerHTML = data.name;
        document.getElementById('single_item_desc').innerHTML = data.descriptionShort;
        document.getElementById('single_item_descLong').innerHTML = data.descriptionLong;
        document.getElementById('single_item_price').innerHTML = '$' + data.price;

        document.getElementById('single_item_button').innerHTML = `<button class="create" onclick="addToCart(event, ${data.id})">Add to my cart</button>`;
    });
}


function showNewItem(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('new_item_container');
    htmlContainer.style.display = "block";

    document.getElementById("new_item_title").value = '';
    document.getElementById("new_item_desc").value = '';
    document.getElementById("new_item_price").value = '';
    document.getElementById("new_item_image").value = '';
}

function createItem(event){
    event.preventDefault();
    
    var title = document.getElementById("new_item_title").value;
    var desc = document.getElementById("new_item_desc").value;
    var price = document.getElementById("new_item_price").value;

    var file = document.getElementById("new_item_image").files[0];

    var data = {
        name: title,
        descriptionShort: desc,
        price: price
    }

    httpRequest('POST', '/items/', data, function (newRecord) {
        console.log('Successful creation of new item', newRecord);

        fileUploadItems(`/items/${newRecord.id}/image`, file, function(){
            console.log('File uploaded successfully!');
            document.getElementById("items_btn").click();
        });
    });
}

function showNewCategory(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('new_category_container');
    htmlContainer.style.display = "block";

    document.getElementById("new_category_title").value = '';
    document.getElementById("new_category_desc").value = '';
    document.getElementById("new_category_image").value = '';
}

function createCategory(event){
    event.preventDefault();
    
    var title = document.getElementById("new_category_title").value;
    var desc = document.getElementById("new_category_desc").value;
    var file = document.getElementById("new_category_image").files[0];

    var data = {
        name: title,
        description: desc
    }

    httpRequest('POST', '/categories/', data, function (newRecord) {
        console.log('Successful creation of new category', newRecord);

        fileUploadCategories(`/categories/${newRecord.id}/image`, file, function(){
            console.log('File uploaded successfully!');
            document.getElementById("categories_btn").click();
        });
    });
}

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

    var htmlContainer = document.getElementById('cart_container');
    htmlContainer.style.display = "inline-table";

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
        htmlContainer.innerHTML += `<button class="create" onclick="proceedToPayment(event,'${data['total']}')">Proceed To Payment</button>`;
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

function showLogin(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('login_container');
    htmlContainer.style.display = "block";

    document.getElementById("username").value = '';
    document.getElementById("password").value = '';
}

function login(event) {
    event.preventDefault();
    
    var username = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    var data = {
        username: username,
        password: pass
    }

    httpRequest('POST', '/login/', data, function (response) {
        console.log('Successful log in: ', response);

        userToken = response.token;
        isAdmin = response.isAdmin;
        
        setCookie('token', userToken, 1);
        setCookie('isAdmin', isAdmin, 1);
        
        getFirstNameByID(response.id);
    

        if(isAdmin==1){
            console.log('Admin Layout');
            adminLayout();
        };
    });
    document.getElementById("items_btn").click();
}

function getFirstNameByID(){
    event.preventDefault();
    var htmlContainer = document.getElementById('logInUser');

    htmlContainer.innerHTML = '';

    httpRequest('GET', '/users/', undefined, function (data) {

            htmlContainer.innerHTML = `Hi ${data.firstName} <a id="logout_btn">(log out)</a>`;
           
            document.addEventListener('click',function(e){
                if(e.target && e.target.id== 'logout_btn'){
                    logUserOut();
                }
             })
            console.log('Successful creation of users First name');      
    });
}

function logUserOut(){
    event.preventDefault();
    httpRequest('DELETE', '/login/', undefined, function () {
        console.log('Successful deleted token');
        setCookie('token', 0, 1);
        setCookie('isAdmin', 0, 1);


        var elem = document.getElementById('new_category_li');
        elem.parentNode.removeChild(elem);
        var elem = document.getElementById('new_item_li');
        elem.parentNode.removeChild(elem);
    });
    document.getElementById('logInUser').innerHTML='';
}

function adminLayout(){
        
        var htmlContainer = document.getElementById('ulNav');

        var newA= document.createElement("a");
       // newA.setAttribute('href',"#");
        newA.setAttribute('id',"new_category_btn");
        newA.innerHTML = "New Categories";

        var newLI = document.createElement("li");
        newLI.setAttribute('id',"new_category_li");
        newLI.appendChild(newA);
        htmlContainer.appendChild(newLI);

        document.addEventListener('click',function(event){
            if(event.target && event.target.id== 'new_category_btn'){
                showNewCategory(event);
            }
        });

        
        var newAitems= document.createElement("a");
        //newAitems.setAttribute('href',"#");
        newAitems.setAttribute('id',"new_item_btn");
        newAitems.innerHTML = "New Item";

        var newLIitem = document.createElement("li");
        newLIitem.setAttribute('id',"new_item_li");
        newLIitem.appendChild(newAitems);
        htmlContainer.appendChild(newLIitem);

        document.addEventListener('click',function(event){
            if(event.target && event.target.id== 'new_item_btn'){
                showNewItem(event);
            }
        });
}


function showSignUp(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('signUp_container');
    htmlContainer.style.display = "block";

    document.getElementById("username").value = '';
    document.getElementById("password").value = '';
}

function signUp(event) {
    event.preventDefault();
    
    var username = document.getElementById("usernameSign").value;
    var password = document.getElementById("passwordSign").value;
    var email = document.getElementById("email").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    var province = document.getElementById("province").value;
    var country = document.getElementById("country").value;
    var postalCode = document.getElementById("postalCode").value;

    var data = {
        username: username,
        email: email,
        password: password,
        firstName: fname,
        lastName: lname,
        street: street,
        city: city,
        province: province,
        country: country,
        postalCode: postalCode,
        isAdmin: 0  
    }
   
    httpRequest('POST', '/users/', data, function (response) {
        console.log('Successful created user: ', response);

        userToken = response.token;
        isAdmin = response.isAdmin;

        setCookie('token', userToken, 1);
        setCookie('isAdmin', isAdmin, 1);

        getFirstNameByID(response.id);
    });

    document.getElementById("items_btn").click();
}


function hideAllSections() {
    document.getElementById("list_container").style.display = "none";
    document.getElementById("list_categories_container").style.display = "none";
    document.getElementById("single_item_container").style.display = "none";
    document.getElementById("new_item_container").style.display = "none";
    document.getElementById("new_category_container").style.display = "none";
    document.getElementById("login_container").style.display = "none";
    document.getElementById("signUp_container").style.display = "none";
    document.getElementById("cart_container").style.display = "none";
}


function loaded() {
    /// Button Listeners
    document.getElementById("logoLink").addEventListener('click', showItems, false);
    document.getElementById("items_btn").addEventListener('click', showItems, false);
    document.getElementById("categories_btn").addEventListener('click', showCategories, false);
    document.getElementById("login_btn").addEventListener('click', showLogin, false);
    document.getElementById("signUp_btn").addEventListener('click', showSignUp, false);
    //document.getElementById("logOut_btn").addEventListener('click', logUserOut, false);
    
    document.getElementById("cart_btn").addEventListener('click', showCart, false);
    //logOut_btn
    //proceedToPayment

    //document.getElementById("login_btn").click();
    document.getElementById("categories_btn").click();
    document.getElementById("items_btn").click();
    
}