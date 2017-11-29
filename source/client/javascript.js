
var baseURL = 'http://localhost/api';

var userToken = getCookie('token');
var isAdmin = getCookie('isAdmin');
var username = getCookie('username');

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



function hideAllSections() {
    document.getElementById("list_container").style.display = "none";
    document.getElementById("list_categories_container").style.display = "none";
    document.getElementById("single_item_container").style.display = "none";
    document.getElementById("new_item_container").style.display = "none";
    document.getElementById("update_item_container").style.display = "none";
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
    document.getElementById("cart_btn").addEventListener('click', showCart, false);

    //document.getElementById("categories_btn").click();
    document.getElementById("items_btn").click();
    
}