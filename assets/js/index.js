//INPUTS
var siteNameInputs = document.getElementById('siteName');
var siteUrlInputs = document.getElementById('siteUrl');
var sitesList=[];
//btn close window
var btnClose= document.getElementById('btnClose');
//GET DATA FROM LOCALSTORAGE
if (localStorage.getItem('books') !==null) {
  sitesList = JSON.parse(localStorage.getItem('books'));
  displaySites(sitesList);
}
//DISPLAY PRODUCTS 
function displaySites(arr) {

var containerSites=``; 

  for (let i = 0; i < arr.length; i++) {
    
    containerSites +=`<tr>
    <td>${i}</td> 
    <td>${arr[i].siteName}</td>
    <td> 
    <a href="${arr[i].siteUrl}" target="_blank">
      <button class="btn btn-success ">
      <i class="fa-solid fa-eye pe-2">
      </i>Visit</button>
    </a>
    </td>
    <td>
      <button onclick="deleteSite(${i});" class="btn btn-danger">
      <i class="fa-solid fa-trash-can "></i>
      Delete
     </button>
    </td>
 </tr>`;
  }
  document.getElementById('bodyTable').innerHTML= containerSites;


}

//UPDATE LOCALSTORAGE
function updateLocalStorge() {
  localStorage.setItem('books',JSON.stringify(sitesList));
}
//UPDATE INPUTS 
function updateInputs(config) {
  siteNameInputs.value=config?config.siteName:null; 
  siteUrlInputs.value=config?config.siteUrl:null; 
}
//ADD NEWSITE
function addSite() { 

if ( siteNameInputs.classList.contains('is-valid') && siteUrlInputs.classList.contains('is-valid') ) {
  newSite={
    siteName:siteNameInputs.value,
    siteUrl:siteUrlInputs.value
  };

  sitesList.push(newSite);
  displaySites(sitesList);
  updateLocalStorge();
  updateInputs();
 
} else {
  closeWindowNotValid();
}
  
 }
 //Delete SITE
 function deleteSite(deletedIndex) {
  sitesList.splice(deletedIndex,1);
  displaySites(sitesList);
  updateLocalStorge();
 }

 //VALIDATE INPUT

 function validateInputs(element) {
   var regex ={
    siteName: /^.{3,}$/,
    siteUrl: /^(https?:\/\/)?((([a-zA-Z0-9_-]+)\.)+[a-zA-Z]{2,6})(:\d+)?(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
   
   
  } else {

    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
  }
 }

//CLOSE WINDOW NOT VALID
function closeWindowNotValid() {

  if ( document.getElementById('windowNotValid').classList.contains('d-none')) {

  
  
    document.getElementById('windowNotValid').classList.replace('d-none', 'd-block');

  }else{

    document.getElementById('windowNotValid').classList.replace('d-block','d-none');
  }

}
