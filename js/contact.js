let positionOfContact;
let contacts = [];
let contactsSorted = [];
let initialLetters = [];
let contactIsSelected = false;

async function initContact() {
  await includeHTML();
  changeSelectedTab("tab-contacts");
  await loadContacts();
  await renderContactList();
  checkWindowWidth();
}


window.onresize = checkWindowWidth;


function checkWindowWidth() {
  if (contactIsSelected && window.innerWidth < 975) {
    document.getElementById('bg-contact-list').classList.add('d-none');
    document.getElementById('contact-arrow-return').classList.remove('d-none');
    document.getElementById('ctn-content-contacts').classList.remove('d-none');
    document.getElementById('ctn-content-contacts').style = 'left: var(--margin-left-content) !important';
  } 
  else if (contactIsSelected) {
    document.getElementById('bg-contact-list').classList.remove('d-none');
    document.getElementById('contact-arrow-return').classList.add('d-none');
    document.getElementById('ctn-content-contacts').classList.remove('d-none');
    document.getElementById('ctn-content-contacts').style = 'left: calc(var(--margin-left-content) + var(--width-contacts-overview)) !important';
  } else if (!contactIsSelected && window.innerWidth < 975) {
    document.getElementById('bg-contact-list').classList.remove('d-none');
    document.getElementById('ctn-content-contacts').classList.add('d-none');
  } 
}


function returnToContactList() {
  contactIsSelected = false;
  renderContactList();
  checkWindowWidth();
}


/**
 * This function loads all contacts currently existing into a JSON-Array
 */
async function loadContacts() {
  let resp = await fetch("../contacts.json");
  contacts = await resp.json();
}


/**
 * This function renders the loaded contacts alphabetically sorted into the contact list
 */
async function renderContactList() {
  await sortArrayContacts();
  await createArrayInitialLetters();
  document.getElementById('ctn-contact-list').innerHTML = '';

  for (j = 0; j < initialLetters.length; j++) {
    document.getElementById('ctn-contact-list').innerHTML += await generateInitialLetterHTML(initialLetters[j]);
    for (k=0; k < contactsSorted.length; k++) {
      if (contactsSorted[k]['nameContact'][0] == initialLetters[j]) {
        document.getElementById(`contact-list-letter-${initialLetters[j]}`).innerHTML += await generateSingleListContactHTML(k);
        document.getElementById(`contact-list-single-contact-acronym-${contactsSorted[k]['idContact']}`).style.backgroundColor = contactsSorted[k]['colorContact'];
      }
    }
  }
}


/**
 * This function sorts the loaded array "contacts" alphabetically 
 * 
 * AT THE MOMENT THE ARRAY IS ONLY SORTED BY THE FULL NAME OF THE CONTACT - THE LAST NAME IS NOT CONSIDERED SEPERATLY 
 */
async function sortArrayContacts() {
  contactsSorted = contacts.sort((a, b) => a.nameContact.localeCompare(b.nameContact));
}


/**
 * This function creates an alphabetically sorted array with all the initial letters currently available in the loaded array "contacts" 
 */
async function createArrayInitialLetters() {
  initialLetters = [];

  for (i = 0; i < contacts.length; i++) {
    let intialLetterName = contacts[i]['nameContact'][0];
    if (!initialLetters.includes(intialLetterName)) {
      initialLetters.push(intialLetterName.toUpperCase());
    }
  }

  initialLetters.sort();
}


/**
 * This function opens the detailed view of a contact and ensures that only the selected contact is marked in the contact list
 * 
 * @param {string} idContact - id of the contact for which the details shall be displayed
 */
async function openContactDetail(idContact) {
  contactIsSelected = true;
  checkWindowWidth();

  await resetPreviousSelectedContact();
  markSelectedContact(idContact);

  positionOfContact = contactsSorted.findIndex((id) => id['idContact'] == idContact);
  document.getElementById('wrapper-contact-details').innerHTML = await generateContactDetailHTML(positionOfContact);
  document.getElementById(`contacts-detail-acronym-${idContact}`).style.backgroundColor = contactsSorted[positionOfContact]['colorContact'];

  document.getElementById('wrapper-contact-details').classList.remove("d-none");
  document.getElementById('wrapper-contact-details').classList.add("translate-x");
  setTimeout(() => {document.getElementById("wrapper-contact-details").classList.remove("translate-x");}, 100);
}


// function checkWidthWindow() {
//   if (window.innerWidth < 784) {
//     document.getElementById('bg-contact-list').classList.add('d-none');
//     document.getElementById('ctn-content-contacts').style = 'display: block';
//     document.getElementById('ctn-content-contacts').style = 'left: var(--margin-left-content) !important';
//   }
// }



/**
 * This functions resets the format for all contacts in the contact list (required in case that a contact was selected previously)
 */
async function resetPreviousSelectedContact() {
  for (i=0; i< contactsSorted.length; i++) {
    let idContact = contactsSorted[i]['idContact'];
    document.getElementById(`${idContact}`).style = `pointer-events: auto`;
    document.getElementById(`${idContact}`).style.backgroundColor = 'white';
    document.getElementById(`${idContact}`).style.color = 'black';
  }
}

/**
 * This function marks the currently selected contact in the contact list
 * 
 * @param {string} idContact - id of the contact for which the details are displayed
 */
function markSelectedContact(idContact) {
  document.getElementById(`${idContact}`).style = `pointer-events: none`;
  document.getElementById(`${idContact}`).style.backgroundColor = '#2A3647';
  document.getElementById(`${idContact}`).style.color = 'white';
}


function openSubmenuContact() {
  
}


function editContact(positionOfContact) {
}



function deleteContact(positionOfContact) {
}




 // **** GENERATE HTML-CODE **** //


 /**
  * This function generates the HTML-Code for the initial letter separator in the contact list
  * 
  * @param {string} initalLetter - letter for the alphabetically order in the contact list
  * @returns - HTML-Code for the initial letter separator in the contact list
  */
async function generateInitialLetterHTML(initalLetter) {
  return /*html*/ `
  <div id="contact-list-letter-${initalLetter}">
    <div class="contact-list-initial-letter">${initalLetter}</div>
    <div class="contact-list-separator"></div>
  </div>
  `
}


/**
 * This function returns the HTML-Code for a single contact element in the contact list
 * 
 * @param {number} positionOfContact - position of the contact in the array "contactSorted" for which the HTML-Code is generated
 * @returns - HTML-Code for a single contact element in the contact list
 */
async function generateSingleListContactHTML(positionOfContact) {
  return /*html*/ `
  <div class="contact-list-single-contact" id="${contactsSorted[positionOfContact]['idContact']}" onclick="openContactDetail('${contactsSorted[positionOfContact]['idContact']}')">
    <div class="contact-list-single-contact-acronym" id="contact-list-single-contact-acronym-${contactsSorted[positionOfContact]['idContact']}">${contactsSorted[positionOfContact]['acronymContact']}</div>
    <div class="contact-list-single-contact-right">
      <div class="contact-list-single-contact-name">${contactsSorted[positionOfContact]['nameContact']}</div>
      <div class="contact-list-single-contact-mail">${contactsSorted[positionOfContact]['emailContact']}</div>
    </div>
  </div>
  `
}


/**
 * This function returns the HTML-Code for the detailed view of the selected contact
 * 
 * @param {number} positionOfContact - position of the contact in the array "contactSorted" for which the detailed view shall be displayed
 * @returns - HTML-Code for the detailed view of the selected contact
 */
async function generateContactDetailHTML(positionOfContact) {
  return /*html*/ `
    <div class="ctn-contacts-details-name">
    <div class="contacts-detail-acronym" id="contacts-detail-acronym-${contactsSorted[positionOfContact]['idContact']}">${contactsSorted[positionOfContact]['acronymContact']}</div>
    <div class="ctn-contacts-details-name-right">
      <div class="contacts-detail-name">${contactsSorted[positionOfContact]['nameContact']}</div>
      <div class="ctn-contacts-detail-edit-delete">
        <div
          class="contacts-detail-edit-delete"
          onmouseover="changeImgTo('img-contacts-detail-edit', 'edit_lb')"
          onmouseout="changeImgTo('img-contacts-detail-edit', 'edit_default')"
          onclick="editContact(${positionOfContact})"
        >
          <img
            id="img-contacts-detail-edit"
            src="./assets/img/edit_default.svg"
          />
          <span>Edit</span>
        </div>
        <div
          class="contacts-detail-edit-delete"
          onmouseover="changeImgTo('img-contacts-detail-delete', 'delete_lb')"
          onmouseout="changeImgTo('img-contacts-detail-delete', 'delete_default')"
          onclick="deleteContact(${positionOfContact})"
        >
          <img
            id="img-contacts-detail-delete"
            src="./assets/img/delete_default.svg"
          />
          <span>Delete</span>
        </div>
      </div>
    </div>
  </div>
  <div class="contacts-detail-subheadline">Contact Information</div>
          <div class="ctn-contacts-detail-mail-phone">
            <div class="contacts-detail-mail-phone">
              <span>Email</span>
              <div class="contacts-detail-mail">${contactsSorted[positionOfContact]['emailContact']}</div>
            </div>
            <div class="contacts-detail-mail-phone">
              <span>Phone</span>
              <div>${contactsSorted[positionOfContact]['phoneContact']}</div>
            </div>
    </div>
  `;
}
