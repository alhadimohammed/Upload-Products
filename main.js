let title = document.getElementById ("title");
let price = document.getElementById ("price");
let taxes = document.getElementById ("taxes");
let ads = document.getElementById ("ads");
let discount = document.getElementById ("discount");
let totle = document.getElementById ("totle");
let count = document.getElementById ("count");
let category = document.getElementById ("category");
let create = document.getElementById ("create");

// let tbody = document.getElementById ("tbody");

let mode = "create";
let takeid = 0;


// get totle
function gettotle(){
    if (price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        totle.innerHTML = result;
        totle.style.background = "#98db98"
    }else {
        totle.innerHTML = "";
        totle.style.background = "rgb(216, 160, 160)";
    }
}


let alldata;
if (localStorage.length != 0){
    alldata = JSON.parse(localStorage.data)
}else {
    alldata = [];
}


create.onclick = function(){               /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let newdata = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totle:totle.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }


    if (ceakdata()){
        if (mode === "create"){
            if (newdata.count > 1){
                for (let i = 0; i < newdata.count; i++){
                    alldata.push (newdata);
                }
            }else {
                alldata.push (newdata);
            }
        }else {
            alldata[takeid] = (newdata);
            count.style.display = "block";
    
            mode = "create";
            create.innerHTML = mode;
            create.style.background = "#c1c1db";
    
        }

        localStorage.setItem ("data", JSON.stringify(alldata))

        showdata();
        cleardata();
        gettotle();

    }else {
        if (title.value == ""){
            title.focus ()
        }else if (price.value == ""){
            price.focus ()
        }else if (totle.value == ""){
            totle.focus ()
        }else {
            category.focus ()
        }
    }
}

// clear data
function cleardata(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    totle.innerHTML = "";
    count.value = "";
    category.value = "";
}

// show data
function showdata(){
    let table = "";
    for (let i = 0; i < alldata.length; i++){
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${alldata[i].title}</td>
                <td>${alldata[i].price}</td>
                <td>${alldata[i].taxes}</td>
                <td>${alldata[i].ads}</td>
                <td>${alldata[i].discount}</td>
                <td>${alldata[i].totle}</td>
                <td>${alldata[i].category}</td>
                <td id="tdhead">
                <img onclick = "deletdata(${i})" id = "delete" src="icone/delete.svg" alt="">
                <img onclick = "updatedata(${i})" id = "update" src="icone/update.svg" alt="">
                </td>
                <td>
                </td>
            </tr>`
        }
    // <button>delete</button>
    // <button>update</button>


    let bntdeletall = document.getElementById ("deleteAll");

    if (alldata.length > 0){
        bntdeletall.innerHTML = `<button onclick = "deletealldata()">Delete All [${alldata.length}]</button>`
    }else {
        bntdeletall.innerHTML = "";
    }

    document.getElementById ("tbody").innerHTML = table;
    gettotle();
}

showdata();    

// delete data
function deletdata(i){
    alldata.splice(i,1);
    localStorage.data = JSON.stringify(alldata)
    showdata();
}

// delete all
function deletealldata(){
    localStorage.clear ();  
    alldata.splice(0);
    showdata();
}

// update data 
function updatedata(i){
    title.value = alldata[i].title;
    price.value = alldata[i].price;
    taxes.value = alldata[i].taxes;
    ads.value = alldata[i].ads;
    discount.value = alldata[i].discount;
    category.value = alldata[i].category;

    gettotle();
    count.style.display = "none";
    
    mode = "Update";
    create.innerHTML = mode;
    create.style.background = "rgb(152, 219, 152)";

    takeid = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}

// ceak data 
function ceakdata(){
    if (
        title.value != "" &&
        price.value != "" &&
        totle.innerHTML != "" &&
        category.value != ""){

        return true
    }else {

        return false
    }
}


// search data 
let modesearch = "title";
let search = document.getElementById ("search");

function searchdata(id){
    if (id == "searchtitle"){
        modesearch = "title";
        let searcbtn = document.getElementById ("searchtitle");
        searcbtn.style.background = "#98db98";
        searcbtn.style.color = "black";

        let searcbtnanotitle = document.getElementById ("searchcategory");
        searcbtnanotitle.style.background = "#c1c1db";
    }else {
        modesearch = "category";
        let searchbtn = document.getElementById ("searchcategory");
        searchbtn.style.background = "#98db98";
        searchbtn.style.color = "black";

        let searcbtnanocato = document.getElementById ("searchtitle");
        searcbtnanocato.style.background = "#c1c1db"
    }
    search.placeholder = ("Search By " + id);
}




// console.log ()

function searchindata(){
    let table = "";
    for (let i = 0; i < alldata.length; i++){
        if (modesearch == "title") {
            if (alldata[i].title.includes (search.value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${alldata[i].title}</td>
                        <td>${alldata[i].price}</td>
                        <td>${alldata[i].taxes}</td>
                        <td>${alldata[i].ads}</td>
                        <td>${alldata[i].discount}</td>
                        <td>${alldata[i].totle}</td>
                        <td>${alldata[i].category}</td>
                        <td>
                            <button onclick = "updatedata(${i})" id = "update">update</button>
                        </td>
                        <td>
                            <button onclick = "deletdata(${i})" id = "delete">delete</button>
                        </td>
                    </tr>
                `
            }

        
        }else {
            if (alldata[i].category.includes (search.value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${alldata[i].title}</td>
                        <td>${alldata[i].price}</td>
                        <td>${alldata[i].taxes}</td>
                        <td>${alldata[i].ads}</td>
                        <td>${alldata[i].discount}</td>
                        <td>${alldata[i].totle}</td>
                        <td>${alldata[i].category}</td>
                        <td></td>
                        <td></td>
                    </tr>
                        `
                    }
        }

        document.getElementById ("tbody").innerHTML = table;
    }
}
search.value = "";


let iconeshearc = document.querySelector ("#iconeshearc");
let divsearch = document.querySelector ("#divsearch");
divsearch.style.display = "none"
let modedivsearch = true;

iconeshearc.onclick =  function(){
    ("test");
    if (modedivsearch){
        divsearch.style.display = "block"
        
        setTimeout(function(){
            iconeshearc.classList.add ("upsearch");
            iconeshearc.classList.remove  ("iconeshearc");
            modedivsearch = false;
    
    
            divsearch.classList.add ("undivsearch");
            divsearch.classList.remove ("divsearch");
        },500)
    }else {
        iconeshearc.classList.add ("iconeshearc");
        iconeshearc.classList.remove  ("upsearch");
        modedivsearch = true;

        divsearch.classList.add ('divsearch');
        divsearch.classList.remove ('undivsearch');

        setTimeout(function(){
            divsearch.style.display = "none"
        },1000)
    }
}
console.log (iconeshearc);
console.log (divsearch);