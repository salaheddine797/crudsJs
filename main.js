let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

// get Total

function getTotal() {

    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(218, 31, 31)';
    }


}


// create Product

let dataProd;

if (localStorage.product != null) {
    dataProd = JSON.parse(localStorage.product);
} else {
    dataProd = [];
}



submit.onclick = function () {
    let newProd = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != ''&& price.value != '' && category.value != '' && newProd.count < 100) {
        if (mood === 'create') {



            if (newProd.count > 1) {
                for (let i = 0; i < newProd.count; i++) {
                    dataProd.push(newProd);
                }
            } else {
                dataProd.push(newProd);
            }
        } else {
            dataProd[tmp] = newProd;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }

    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataProd));
    
    showData();
}


// clear inputs after clicking create

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}



// read


function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataProd.length; i++) {
        table += `
        <tr>
                <td>${i+1}</td>
                <td>${dataProd[i].title}</td>
                <td>${dataProd[i].price}</td>
                <td>${dataProd[i].taxes}</td>
                <td>${dataProd[i].ads}</td>
                <td>${dataProd[i].discount}</td>
                <td>${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (dataProd.length > 0) {
        btnDelete.innerHTML = `
        <td><button onclick="deleteAll()">Delete All(${dataProd.length})</button></td>
        `;
    } else {
        btnDelete.innerHTML = '';
    }
}

showData();

// delete

function deleteData(i) {
    dataProd.splice(i, 1);
    localStorage.product = JSON.stringify(dataProd);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataProd.splice(0);
    showData();
}


// update

function updateData(i) {
    title.value = dataProd[i].title;
    price.value = dataProd[i].price;
    taxes.value = dataProd[i].taxes;
    ads.value = dataProd[i].ads;
    discount.value = dataProd[i].discount;
    count.style.display = 'none';
    getTotal();
    category.value = dataProd[i].category;
    submit.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}



// search

let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');

    if (id == 'searchTitle') {
        searchMood = 'title';

    } else {
        searchMood = 'category';

    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();

}

function searchData(value) {
    let table = '';

    for (let i = 0; i < dataProd.length; i++) {
        if (searchMood == 'title') {


            if (dataProd[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                        <td>${i}</td>
                        <td>${dataProd[i].title}</td>
                        <td>${dataProd[i].price}</td>
                        <td>${dataProd[i].taxes}</td>
                        <td>${dataProd[i].ads}</td>
                        <td>${dataProd[i].discount}</td>
                        <td>${dataProd[i].total}</td>
                        <td>${dataProd[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                    </tr>
                `;
            }
        } else {

            if (dataProd[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                        <td>${i}</td>
                        <td>${dataProd[i].title}</td>
                        <td>${dataProd[i].price}</td>
                        <td>${dataProd[i].taxes}</td>
                        <td>${dataProd[i].ads}</td>
                        <td>${dataProd[i].discount}</td>
                        <td>${dataProd[i].total}</td>
                        <td>${dataProd[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                    </tr>
                `;
            }
        }

    }

    document.getElementById('tbody').innerHTML = table;
}
