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

    httpRequest('GET', '/users/', undefined, function (data) {
           
        var newA = document.createElement("a");
        newA.setAttribute('id',"logout_btn");
        newA.innerHTML=`Hi ${data.firstName}(log out)`;
        htmlContainer.appendChild(newA);

        newA.addEventListener('click',function(event){
            if(event.target && event.target.id== 'logout_btn'){
                logUserOut();
            }
        });
    console.log('Successful creation of users First name');      
    });
}

function logUserOut(){
    event.preventDefault();
    httpRequest('DELETE', '/login/', undefined, function () {

        console.log('Successful deleted token');
    });
    setCookie('token', 0, -1);
    setCookie('isAdmin', 0, -1);

    if (document.contains(document.getElementById("new_category_li"))) {
        var elem = document.getElementById('new_category_li');
        elem.parentNode.removeChild(elem);
    }
    if (document.contains(document.getElementById("new_item_li"))) {
        var elem = document.getElementById('new_item_li');
        elem.parentNode.removeChild(elem);
    }
    document.getElementById('logInUser').innerHTML='';
}

function adminLayout(){
        
        var htmlContainer = document.getElementById('ulNav');

        var newA= document.createElement("a");
        newA.setAttribute('id',"new_category_btn");
        newA.innerHTML = "New Categories";

        var newLI = document.createElement("li");
        newLI.setAttribute('id',"new_category_li");
        newLI.appendChild(newA);
        htmlContainer.appendChild(newLI);

        newLI.addEventListener('click',function(event){
            if(event.target && event.target.id== 'new_category_btn'){
                showNewCategory(event);
            }
        });

        
        var newAitems= document.createElement("a");
        newAitems.setAttribute('id',"new_item_btn");
        newAitems.innerHTML = "New Item";

        var newLIitem = document.createElement("li");
        newLIitem.setAttribute('id',"new_item_li");
        newLIitem.appendChild(newAitems);
        htmlContainer.appendChild(newLIitem);

        newLIitem.addEventListener('click',function(event){
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
