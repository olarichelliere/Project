
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

    var htmlContainer = document.getElementById('list_items_container');
    htmlContainer.innerHTML = '';
    htmlContainer.style.display = "inline";
    //htmlContainer.style.cssFloat = "left";

    httpRequest('GET', '/items', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            htmlContainer.innerHTML += 
                `<div class="item_box">
                    <a href="#" onclick="showItem(event, ${item['id']})">
                    <div class="center"><img src="${baseURL}/../images/${item['image']}" width=150 height=150 /></div>
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
    //htmlContainer.style.cssFloat = "left";
    

    httpRequest('GET', '/categories', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            htmlContainer.innerHTML += 
                `<div class="category_box">
                    <a href="#" onclick="filter(event, ${category['id']})">
                        <div class="center"><img src="${baseURL}/../images/${category['image']}" width=150 height=150 /></div>
                        <div class="title">${category["name"]}</div>
                        <div class="description">${category["description"]}</div>
                    </a>
                </div>`;
        }
    });

}
function filter(event,id){
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('list_items_container');
    htmlContainer.innerHTML = '';
    htmlContainer.style.display = "inline";
    //htmlContainer.style.cssFloat = "left";


    httpRequest('GET', '/items?categoryid='+id, undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            htmlContainer.innerHTML += 
                `<div class="item_box">
                    <a href="#" onclick="showItem(event, ${item['id']})">
                        <div class="center"><img src="${baseURL}/../images/${item['image']}" width=150 height=150 /></div>
                        <div class="title">${item["name"]}</div>
                        <div class="description">${item["descriptionShort"]}</div>
                        <div class="price">$${item["price"]}</div>
                    </a>
                </div>`;
        }
    });
}
function populateCategoriesList(){
    var htmlContainer = document.getElementById('list_categories_Name_container');

    httpRequest('GET', '/categories', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            htmlContainer.innerHTML += 
                `<div class="category">
                    <a href="#" onclick="filter(event, ${category['id']})">
                        <div>${category["name"]}</div>
                        <div>${category["description"]}</div>
                    </a>
                </div>`;
        }
    });
}
 
function showItem(event, id) {
    event.preventDefault();
    
    hideAllSections();
    
    var htmlContainer = document.getElementById('single_item_container');
    htmlContainer.style.display = "block";
    
    
    
    httpRequest('GET', '/items/' + id, undefined, function (data) {
        document.getElementById('single_item_name').innerHTML = data.name;
        document.getElementById('single_item_desc').innerHTML = data.descriptionShort;
        document.getElementById('single_item_price').innerHTML = '$' + data.price;
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


        if(isAdmin==1){
            adminLayout();
        };
    });
}
function adminLayout(){
        
        var htmlContainer = document.getElementById('ulNav');
        htmlContainer.innerHTML +=

        '<li><a href="./categories" id="new_category_btn">New Categories</a></li>';
        
        htmlContainer.innerHTML +=
        '<li><a href="./items" id="new_item_btn">New Item</a></li>';
    
        document.getElementById("new_item_btn").addEventListener('click', showNewItem, false);
        document.getElementById("new_category_btn").addEventListener('click', showNewCategory, false);
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
    console.log(data);



    httpRequest('POST', '/users/', data, function (response) {
        console.log('Successful created user: ', response);

        userToken = response.token;
        isAdmin = response.isAdmin;

        setCookie('token', userToken, 1);
        setCookie('isAdmin', isAdmin, 1);
    });
}


function hideAllSections() {
    document.getElementById("list_items_container").style.display = "none";
    document.getElementById("list_categories_container").style.display = "none";
    document.getElementById("single_item_container").style.display = "none";
    document.getElementById("new_item_container").style.display = "none";
    document.getElementById("new_category_container").style.display = "none";
    document.getElementById("login_container").style.display = "none";
    document.getElementById("signUp_container").style.display = "none";
}


function loaded() {
    /// Button Listeners
    document.getElementById("items_btn").addEventListener('click', showItems, false);
    document.getElementById("categories_btn").addEventListener('click', showCategories, false);
    
    document.getElementById("login_btn").addEventListener('click', showLogin, false);
    document.getElementById("signUp_btn").addEventListener('click', showSignUp, false);

    //document.getElementById("login_btn").click();
    document.getElementById("categories_btn").click();
    document.getElementById("items_btn").click();
    populateCategoriesList();
}