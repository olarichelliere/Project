
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
