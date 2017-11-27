
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

function showItem(event, id) {
    event.preventDefault();
    
    hideAllSections();
    
    var htmlContainer = document.getElementById('single_item_container');
    htmlContainer.style.display = "inline-block";
    
    httpRequest('GET', '/items/' + id, undefined, function (data) {
        console.log(data);
        document.getElementById('single_item_id').innerHTML=data.id;
        document.getElementById('single_item_image').innerHTML =  `<img src="${baseURL}/../images/${data.image}"/>`;
        document.getElementById('single_item_name').innerHTML = data.name;
        document.getElementById('single_item_desc').innerHTML = data.descriptionShort;
        document.getElementById('single_item_colour').innerHTML = data.colour;
        document.getElementById('single_item_descLong').innerHTML = data.descriptionLong;
        document.getElementById('single_item_price').innerHTML = '$' + data.price;

        document.getElementById('single_item_button').innerHTML = `<button class="create" onclick="addToCart(event)">Add to my cart</button>`;

        if(getCookie('isAdmin')==1){ 
            document.getElementById('single_itemUpdate_button').innerHTML = `<button class="create" onclick="showUpdateItem(event, ${data.id})">Update</button>`;
            document.getElementById('single_itemDelete_button').innerHTML = `<button class="create" onclick="deleteItem(event, ${data.id})">Delete</button>`;
       }else{
            document.getElementById('single_itemUpdate_button').innerHTML = '';
            document.getElementById('single_itemDelete_button').innerHTML = '';
       }
    });
}


function showNewItem(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('new_item_container');
    htmlContainer.style.display = "block";

    document.getElementById("new_item_title").value = '';
    document.getElementById("new_item_descShort").value = '';
    document.getElementById("new_item_descLong").value = '';
    document.getElementById("new_item_colour").value = '';
    document.getElementById("new_item_price").value = '';
    document.getElementById("new_item_image").value = '';
}

function showUpdateItem(event,id) {
    event.preventDefault();
    
    hideAllSections();

    document.getElementById("update_item_title").value = '';
    document.getElementById("update_item_descShort").value = '';
    document.getElementById("update_item_descLong").value = '';
    document.getElementById("update_item_colour").value = '';
    document.getElementById("update_item_price").value = '';
    document.getElementById("update_item_imageView").value = '';

    var htmlContainer = document.getElementById('update_item_container');
    htmlContainer.style.display = "block";

    httpRequest('GET', '/items/' + id , undefined, function (data) {
        document.getElementById('single_item_id').innerHTML=data.id;
        document.getElementById("update_item_title").value = data.name;
        document.getElementById("update_item_descShort").value = data.descriptionShort;
        document.getElementById("update_item_descLong").value = data.descriptionLong;
        document.getElementById("update_item_colour").value = data.colour;
        document.getElementById("update_item_price").value = data.price;
        document.getElementById("update_item_imageView").innerHTML = `<img src="${baseURL}/../images/${data.image}"/>`; 
        
        document.getElementById("update_btn").innerHTML=`<button class="create" onclick="UpdateItem(event,${data.id})">Update</button`;
    });
}
function deleteItem(event, id){
    event.preventDefault();
    //var id = document.getElementById('single_item_id').innerHTML;
    //id = parseInt(id,10);

    httpRequest('DELETE', '/items/' + id , undefined, function (){
        console.log('Succesfully deleted item', id);
        showItems(event);
    });

}
function UpdateItem(event,id){
    event.preventDefault();
    
    var title = document.getElementById("update_item_title").value;
    var descShort = document.getElementById("update_item_descShort").value;
    var descLong = document.getElementById("update_item_descLong").value;
    var price = document.getElementById("update_item_price").value;
    var colour = document.getElementById("update_item_colour").value;

    var file = document.getElementById("update_item_image").files[0];

    
    var data = {
        id: id,
        name: title,
        descriptionShort: descShort,
        descriptionLong: descLong,
        colour: colour,
        price: price
    }

    console.log(file);
    httpRequest('PUT', '/items/'+id, data, function () {
        console.log('Successful updated of item', id);
        fileUploadItems(`/items/`+id+`/image`, file, function(){
            console.log('File uploaded successfully!');
            showItem(event, id);
        });
    
        
    }); 
}

function createItem(event){
    event.preventDefault();
    
    var title = document.getElementById("new_item_title").value;
    var descShort = document.getElementById("new_item_descShort").value;
    var descLong = document.getElementById("new_item_descLong").value;
    var price = document.getElementById("new_item_price").value;
    var colour = document.getElementById("new_item_colour").value;

    var file = document.getElementById("new_item_image").files[0];

    var data = {
        name: title,
        descriptionShort: descShort,
        descriptionLong: descLong,
        colour:colour,
        price: price
    }

    httpRequest('POST', '/items/', data, function (newRecord) {
        console.log('Successful creation of new item', newRecord);

        fileUploadItems(`/items/${newRecord.id}/image`, file, function(){
            console.log('File uploaded successfully!');
            showItem(event,newRecord.id);
        });
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