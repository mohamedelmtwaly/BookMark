//VARIABLES
const siteNameInput = document.getElementById("siteName");
const siteUrlInput = document.getElementById("siteUrl");
const searchInput = document.getElementById("searchInput");
const addBtn = document.getElementById("addSiteBtn");
const updateBtn = document.getElementById("updateSiteBtn");
let listSites = [];
console.log(siteNameInput);
console.log(siteUrlInput);
console.log(addBtn);
console.log(updateBtn);

if (localStorage.getItem("sites") !== null) {
  listSites = JSON.parse(localStorage.getItem("sites"));
  displaySites(listSites);
}
//UPDATE LOCALSTORAGE
function updateLocalStorage() {
  localStorage.setItem("sites", JSON.stringify(listSites));
}

//UPDATE INPUTS
function updateInputs(config) {
  siteNameInput.value = config ? config.siteName : null;
  siteUrlInput.value = config ? config.siteUrl : null;
}

//DISPLAY SITES
function displaySites(arr) {
  let containerSites = ``;
  for (let i = 0; i < arr.length; i++) {
    containerSites += `<tr>
    <td>${i}</td> 
    <td>${arr[i].siteName}</td>
    <td> 
    <a href="${arr[i].siteUrl}" target="_blank">
      <button class="btn btn-warning text-white">
      <i class="fa-solid fa-eye me-2">
      </i>Visit</button>
    </a>
    </td>
    <td>
        <button onclick="setTableForUpdate(${i})"  class="btn-success btn">
          <i class="fas fa-edit me-2"></i>Update
        </button>
      </td>
    <td>
      <button onclick="deleteSite(${i})" class="btn btn-danger">
      <i class="fa-solid fa-trash-can me-2"></i>
      Delete
      </button>
    </td>
    
 </tr>`;
  }
  document.getElementById("bodyTable").innerHTML = containerSites;
}

//ADD SITE
function addSite() {
  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    let newSite = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    listSites.push(newSite);
    console.log(listSites);
    displaySites(listSites);
    updateInputs();
    updateLocalStorage();
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
  } else {
    closeWindowNotValid();
  }
}

//DELETE SITE
function deleteSite(deletedIndex) {
  listSites.splice(deletedIndex, 1);
  displaySites(listSites);
  updateLocalStorage();
}

//UPDATE SITE
let updatedIndex;
function setTableForUpdate(index) {
  updatedIndex = index;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  console.log("update");
  siteNameInput.value = listSites[index].siteName;
  siteUrlInput.value = listSites[index].siteUrl;
}

function updateSite() {
  listSites[updatedIndex].siteName = siteNameInput.value;
  listSites[updatedIndex].siteUrl = siteUrlInput.value;
  updateLocalStorage();
  displaySites(listSites);
  updateInputs();
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}

//SEARCH SITE
function searchSite() {
  let searchSiteBox = "";
  let term = searchInput.value;
  for (let i = 0; i < listSites.length; i++) {
    if (listSites[i].siteName.toLowerCase().includes(term.toLowerCase())) {
      searchSiteBox += `
    <tr>
      <td>${i}</td> 
      <td>${listSites[i].siteName}</td>
      <td> 
      <a href="${listSites[i].siteUrl}" target="_blank">
        <button class="btn btn-warning text-white">
        <i class="fa-solid fa-eye me-2">
        </i>Visit</button>
      </a>
      </td>
      <td>
          <button onclick="setTableForUpdate(${i})"  class="btn-success btn">
            <i class="fas fa-edit me-2"></i>Update
          </button>
        </td>
      <td>
        <button onclick="deleteSite(${i})" class="btn btn-danger">
        <i class="fa-solid fa-trash-can me-2"></i>
        Delete
        </button>
      </td>
      </tr>`;
    }
    document.getElementById("bodyTable").innerHTML = searchSiteBox;
  }
}

//VALIDATION
function validateInputs(element) {
  let regex = {
    siteName: /^.{3,}$/,
    siteUrl:
      /^(https?:\/\/)?((([a-zA-Z0-9_-]+)\.)+[a-zA-Z]{2,6})(:\d+)?(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

//CLOSE WINDOW NOT VALID
function closeWindowNotValid() {
  if (document.getElementById("windowNotValid").classList.contains("d-none")) {
    document
      .getElementById("windowNotValid")
      .classList.replace("d-none", "d-block");
  } else {
    document
      .getElementById("windowNotValid")
      .classList.replace("d-block", "d-none");
  }
}
