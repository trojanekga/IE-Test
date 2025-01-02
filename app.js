//import { createClient } from '@supabase/supabase-js';

// Supabase URL & API key (put in .env in future)
const url = 'https://rpnrsneajuspqyssgjcs.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnJzbmVhanVzcHF5c3NnamNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2MTA2MjgsImV4cCI6MjA1MTE4NjYyOH0.8METShd8jr6ZGUxsq0FlA0UnkqHt-S5rD4iWgc3avt0';

//Create database connection
const database = supabase.createClient(url, key);

// Save from pop-up window with user input (modal)
let save = document.querySelector("#save");
save.addEventListener("click", async (e) => {
    e.preventDefault();
    let mfr = document.querySelector("#mfr").value;
    let typeName = document.querySelector("#typeName").value;
    let typeId = document.querySelector("#typeId").value;
    let styleName = document.querySelector("#styleName").value;
    let styleId = document.querySelector("#styleId").value;
    let colorNumber = document.querySelector("#colorNumber").value;
    let colorName = document.querySelector("#colorName").value;
    let size = document.querySelector("#size").value;

    // Validate data (no special characters)
    const fields = { mfr, typeName, typeId, styleName, styleId, colorNumber, colorName, size }
    for (const [key, value] of Object.entries(fields)) {
        if (containsSpecialCharacters(value)) {
            alert(`Invalid characters detected in ${key}. Please remove special characters.`);
            return;
        }
    }

    save.innerText = "Saving....";
    //save.setAttribute("disabled", true);
    let res = await database.from("flooring").insert({
        mfr: mfr,
        typeName: typeName,
        typeId: typeId,
        styleName: styleName,
        styleId: styleId,
        colorNumber: colorNumber,
        colorName: colorName,
        size: size
    })
    if (res.error) {
        alert(`Failed to add item: ${res.error.message}`);
        save.innerText = "Save"
        //save.setAttribute("disabled", false);
    } else {
        alert("Item added successfully")
        save.innerText = "Save"
        //save.setAttribute("disabled", false);
        mfr = "";
        typeName = "";
        typeId = "";
        styleName = "";
        styleId = "";
        colorNumber = "";
        colorName = "";
        size = "";

        document.getElementById("mfr").value = "";
        document.getElementById("typeName").value = "";
        document.getElementById("typeId").value = "";
        document.getElementById("styleName").value = "";
        document.getElementById("styleId").value = "";
        document.getElementById("colorNumber").value = "";
        document.getElementById("colorName").value = "";
        document.getElementById("size").value = "";
        getFlooring();
        // HTML button click will close window
    }
})

// Create HTML display table from database
const getFlooring = async () => {
    let tbody = document.getElementById("tbody");
    let loading = document.getElementById("loading");
    let tr = "";
    loading.innerText = "Loading...."
    const res = await database.from("flooring").select("*");
    if (res) {
        for (var i in res.data) {
            tr += `<tr>

         <td>${res.data[i].mfr}</td>
         <td>${res.data[i].typeName}</td>
         <td>${res.data[i].typeId}</td>
         <td>${res.data[i].styleName}</td>
         <td>${res.data[i].styleId}</td>
         <td>${res.data[i].colorNumber}</td>
         <td>${res.data[i].colorName}</td>
         <td>${res.data[i].size}</td>
         <td><button class="btn btn-primary" data-bs-toggle="modal"
         onclick='editFlooring(${res.data[i].id})' data-bs-target="#editModal">Edit</button></td>
         <td><button onclick='deleteFlooring(${res.data[i].id})' class="btn btn-danger">Delete</button></td>
         </tr>`;
        }
        tbody.innerHTML = tr;
        loading.innerText = ""

    }

}

getFlooring();

// Edit item 
const editFlooring = async (id) => {
    const res = await database.from("flooring").select("*").eq("id", id);
    if (res) {
        document.getElementById("id").value = res.data[0].id;
        document.getElementById("edit-mfr").value = res.data[0].mfr;
        document.getElementById("edit-typeName").value = res.data[0].typeName;
        document.getElementById("edit-typeId").value = res.data[0].typeId;
        document.getElementById("edit-styleName").value = res.data[0].styleName;
        document.getElementById("edit-styleId").value = res.data[0].styleId;
        document.getElementById("edit-colorNumber").value = res.data[0].colorNumber;
        document.getElementById("edit-colorName").value = res.data[0].colorName;
        document.getElementById("edit-size").value = res.data[0].size;
    }
}

const update = document.getElementById("update");

// Update item from edit screen
update.addEventListener("click", async () => {

    let id = document.getElementById("id").value;
    let mfr = document.getElementById("edit-mfr").value
    let typeName = document.getElementById("edit-typeName").value;
    let typeId = document.getElementById("edit-typeId").value;
    let styleName = document.getElementById("edit-styleName").value;
    let styleId = document.getElementById("edit-styleId").value;
    let colorNumber = document.getElementById("edit-colorNumber").value;
    let colorName = document.getElementById("edit-colorName").value;
    let size = document.getElementById("edit-size").value;

    // Validate data (no special characters)
    const fields = { mfr, typeName, typeId, styleName, styleId, colorNumber, colorName, size }
    for (const [key, value] of Object.entries(fields)) {
        if (containsSpecialCharacters(value)) {
            alert(`Invalid characters detected in ${key}. Please remove special characters.`);
            return;
        }
    }

    update.innerText = "Updating...."
    //update.setAttribute("disabled", true);
    const res = await database.from("flooring").update({
        mfr, typeName, typeId, styleName, styleId, colorNumber, colorName, size
    }).eq("id", id)

    if (res) {
        alert("Item updated successfully")
        update.innerText = "Update"
        //update.setAttribute("disabled", false);
        mfr = "";
        typeName = "";
        typeId = "";
        styleName = "";
        styleId = "";
        colorNumber = "";
        colorName = "";
        size = "";
        getFlooring();
        // HTML button click will close window

    } else {
        alert("Failed to update item")
        update.innerText = "Update"
        //update.setAttribute("disabled", false);
    }
})

// Delete item
const deleteFlooring = async (id) => {
    const res = await database.from("flooring").delete().eq("id", id)

    if (res) {
        alert("Deleted successfully")
        getFlooring();

    } else {
        alert("Failed to delete item")
    }
}

// Filter/search functionality
function filterTable(data, query){
    return data.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(query.toLowerCase())
        )
    );
}

// Listener for search input to begin filtering on keystrokes
document.getElementById('search-input').addEventListener('input', async (e) => {
    const query = e.target.value;
    const originalData = await fetchData();
    const filteredData = filterTable(originalData, query);
    renderTable(filteredData);
});

// Fetch data for search/filter
async function fetchData() {
    const { data, error } = await database.from('flooring').select('*');
    if (error) {
        console.error('Error fetching data:', error);
        return [];
    }
    return data;
}

// Render table after filter/search
function renderTable(data) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${row.mfr}</td>
        <td>${row.typeName}</td>
        <td>${row.typeId}</td>
        <td>${row.styleName}</td>
        <td>${row.styleId}</td>
        <td>${row.colorNumber}</td>
        <td>${row.colorName}</td>
        <td>${row.size}</td>

        <td><button class="btn btn-primary" data-bs-toggle="modal"
         onclick='editFlooring(${row.id})' data-bs-target="#editModal">Edit</button></td>
        <td><button onclick='deleteFlooring(${row.id})' class="btn btn-danger">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}


// Function called for ensuring no special characters in user input
function containsSpecialCharacters(input){
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    return specialCharPattern.test(input);
}

// Function below is deprecated with modal 'data-bs-dismiss="modal"' property!
// function closeDialog() {
//     let d = document.getElementById('editModal');
//     d.style.display = "none";
// }

