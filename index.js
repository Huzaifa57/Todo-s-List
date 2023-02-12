function getAndupdate() {
  let tit = document.getElementById("title").value;
  let desc = document.getElementById("description").value;

  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemsJsonArray = JSON.parse(itemJsonArrayStr);
    itemsJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  }
  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemsJsonArray = JSON.parse(itemJsonArrayStr);
  }

  let tableBody = document.getElementById("table-Body");
  let str = "";

  itemsJsonArray.forEach((element, index) => {
    str += `
   
     <tr>
     <th scope="row">${index + 1}</th>
     <td>${element[0]}</td>
     <td>${element[1]}</td>
     <td><button class="btn btn-sm btn-primary"  onclick =  "deleted(${index})">Delete</button></td>
   </tr>`;
  });
  tableBody.innerHTML = str;
}

add = document.getElementById("add");

add.addEventListener("click", getAndupdate);
update();

function deleted(itemsIndex) {
  console.log("Delete", itemsIndex);

  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemsJsonArray = JSON.parse(itemJsonArrayStr);
  itemsJsonArray.splice(itemsIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  update();
}

function clearStorage() {
  if (confirm("Do you really want to clear the whole list?")) {
    console.log("Clearing the storage");
    window.localStorage.clear();
    update();
  }
}
