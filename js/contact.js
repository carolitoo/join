let positionOfContact;
let contacts = [];
let contactsSorted = [];
let initialLetters = [];
let contactIsSelected = false;

async function initContact() {
  await includeHTML();
  changeSelectedTab("tab-contacts");
  await loadDummyContacts();
  await loadNewUserContacts();
  await renderContactList();
  checkWindowWidth();
}


window.onresize = checkWindowWidth;


/**
 * This function ensures that all elements are displayed correctly regardless of the width of the window and whether a contact is selected or not
 */
function checkWindowWidth() {
  if (contactIsSelected && window.innerWidth < 975) {
    document.getElementById("bg-contact-list").classList.add("d-none");
    document.getElementById("contact-arrow-return").classList.remove("d-none");
    document.getElementById("ctn-content-contacts").classList.remove("d-none");
    document.getElementById("ctn-content-contacts").style =
      "left: var(--margin-left-content) !important";
    document.getElementById("ctn-content-contacts").style =
      "left: var(--margin-left-content) !important";
  } else if (contactIsSelected) {
    document.getElementById("bg-contact-list").classList.remove("d-none");
    document.getElementById("contact-arrow-return").classList.add("d-none");
    document.getElementById("ctn-content-contacts").classList.remove("d-none");
    document.getElementById("ctn-content-contacts").style =
      "left: calc(var(--margin-left-content) + var(--width-contacts-overview)) !important";
    document.getElementById("ctn-content-contacts").style =
      "left: calc(var(--margin-left-content) + var(--width-contacts-overview)) !important";
    closeSubmenuContact();
  } else if (!contactIsSelected && window.innerWidth < 975) {
    document.getElementById("bg-contact-list").classList.remove("d-none");
    document.getElementById("ctn-content-contacts").classList.add("d-none");
  }
  }


/**
 * This function navigates back to the contact list and resets the currently selected user
 */
async function returnToContactList() {
  contactIsSelected = false;
  await renderContactList();
  checkWindowWidth();
}


/**
 * This function loads all contacts currently existing into a JSON-Array
 */
async function loadDummyContacts() {
  let resp = await fetch("../contacts.json");
  contacts = await resp.json();
}


/**
 * JS DOC ERGÄNZEN
 */
async function loadNewUserContacts(){
  const response = await getItem('contacts');//wie kommen Werte züruck in's user-array? - Rückfrage: müssen die Werte überhaupt zurück (z.B. wegen Änderung Mailadresse)?//
  const ContactsData = response['data']['value'];
  if (ContactsData) {
     contacts = JSON.parse(ContactsData);
  }
}


/**
 * This function renders the loaded contacts alphabetically sorted into the contact list
 */
async function renderContactList() {
  if (contacts.length == 0) {
    document.getElementById("ctn-contact-list").innerHTML =
      await generateNoContactsHTML();
  } else {
    await sortArrayContacts();
    await createArrayInitialLetters();
    document.getElementById("ctn-contact-list").innerHTML = "";

    for (j = 0; j < initialLetters.length; j++) {
      document.getElementById("ctn-contact-list").innerHTML +=
        await generateInitialLetterHTML(initialLetters[j]);
      for (k = 0; k < contactsSorted.length; k++) {
        if (contactsSorted[k]["nameContact"][0] == initialLetters[j]) {
          document.getElementById(
            `contact-list-letter-${initialLetters[j]}`
          ).innerHTML += await generateSingleListContactHTML(k);
          document.getElementById(
            `contact-list-single-contact-acronym-${contactsSorted[k]["idContact"]}`
          ).style.backgroundColor = contactsSorted[k]["colorContact"];
        }
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
  contactsSorted = contacts.sort((a, b) =>
    a.nameContact.localeCompare(b.nameContact)
  );
}


/**
 * This function creates an alphabetically sorted array with all the initial letters currently available in the loaded array "contacts"
 */
async function createArrayInitialLetters() {
  initialLetters = [];

  for (i = 0; i < contacts.length; i++) {
    let intialLetterName = contacts[i]["nameContact"][0];
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

  positionOfContact = contactsSorted.findIndex((id) => id["idContact"] == idContact);
  document.getElementById("wrapper-contact-details").innerHTML = await generateContactDetailHTML(positionOfContact);
  document.getElementById(`contacts-detail-acronym-${idContact}`).style.backgroundColor = contactsSorted[positionOfContact]["colorContact"];

  checkEmptyPhoneNumber(positionOfContact);
  slideInAnimationOfContact();
}


/**
 * This function checks if a phone number is available - in case that there is no phone number "n.a." is displayed instead of the phone number/ an empty field
 * 
 * @param {number} positionOfContact - position of the contact currently selected in the array "contactsSorted"
 */
function checkEmptyPhoneNumber (positionOfContact) {
  if (contactsSorted[positionOfContact]['phoneContact'] == "") {
    document.getElementById('contacts-detail-phone').innerHTML = "n.a.";
    document.getElementById('contacts-detail-phone').style.color = "#a8a8a8";
  }
}


/**
 * This functions resets the format for all contacts in the contact list (required in case that a contact was selected previously)
 * The function also hides the details of the previous contact (essential for the correct display of the slide-in animation of the following contact)
 */
async function resetPreviousSelectedContact() {
  for (i = 0; i < contactsSorted.length; i++) {
    let idContact = contactsSorted[i]["idContact"];
    document.getElementById(`${idContact}`).style = `pointer-events: auto`;
    document.getElementById(`${idContact}`).style.backgroundColor = "white";
    document.getElementById(`${idContact}`).style.color = "black";
  }
  document.getElementById("wrapper-contact-details").classList.add("d-none");
}


/**
 * This function marks the currently selected contact in the contact list
 *
 * @param {string} idContact - id of the contact for which the details are displayed
 */
function markSelectedContact(idContact) {
  document.getElementById(`${idContact}`).style = `pointer-events: none`;
  document.getElementById(`${idContact}`).style.backgroundColor = "#2A3647";
  document.getElementById(`${idContact}`).style.color = "white";
}


/**
 * This function manages the slide-in animation when opening the detailed view for a contact
 */
function slideInAnimationOfContact() {
  document
    .getElementById("wrapper-contact-details")
    .classList.add("translate-x");
  setTimeout(() => {
    document
      .getElementById("wrapper-contact-details")
      .classList.remove("d-none");
  }, 10);
  setTimeout(() => {
    document
      .getElementById("wrapper-contact-details")
      .classList.remove("translate-x");
  }, 100);
}


/**
 * This function allows the user to add a new contact to the contact list/ array contacts 
 */
async function addNewContact() {
  document.getElementById("overlay-contacts").classList.remove("d-none");
  document.getElementById("overlay-contacts").innerHTML =
    await generateOverlayAddContact();
  
  // + ZU ARRAY "CONTACTS" HINZUFÜGEN & IM BACKEND SPEICHERN (RS TEAM - ANLAGE ID/ ERMITTLUNG ACRONYM/ LOGIK HINTERGRUNDFARBE)
  await renderContactList();
  // + POP-UP MIT BESTÄTIGUNG DER ANLAGE DES KONTAKTS + NEUEN KONTAKT ÖFFNEN
}


/**
 * This function allows the user to reset the inserted values when adding a contact 
 */
function resetAddContact() {
  document.getElementById("contacts-detail-input-name").value = '';
  document.getElementById("contacts-detail-input-mail").value = '';
  document.getElementById("contacts-detail-input-phone").value = '';
}


/**
 * This function opens a small submenu to enable the user to delete or edit a contact (only relevant for mobile view)
 * 
 * @param {number} positionOfContact - position of the contact currently selected in the array "contactsSorted"
 */
async function openSubmenuContact(positionOfContact) {
  document.getElementById("btn-contact-mobile").classList.add("d-none");
  document.getElementById("overlay-contacts-submenu").classList.remove("d-none");
  document.getElementById('ctn-contacts-submenu').innerHTML = await generateSubmenuEditDeleteContactHTML(positionOfContact);
}


/**
 * This function closes the overlay containing the submenu for editing/ deleting a contact and displays the show-more-button (only relevant for mobile view)
 */
function closeSubmenuContact() {
  document.getElementById("overlay-contacts-submenu").classList.add("d-none");
  document.getElementById("btn-contact-mobile").classList.remove("d-none");
}


/**
 * This function allows the user to edit a contact, after saving a pop-up with a confirmation is displayed and the edited contact is opened
 * 
 * @param {number} positionOfContact - position of the contact currently selected in the array "contactsSorted"
 */
async function editContact(positionOfContact) {
  // + KONTAKT SPEICHERN/ ÜBERSCHREIBEN & IM BACKEND SPEICHERN // PRÜFEN, OB AUCH USER-ARRAY ANGEPASST WERDEN MUSS
  document.getElementById("overlay-contacts").classList.add("d-none");
  await renderContactList();
  // + POP-UP MIT BESTÄTIGUNG DER ÄNDERUNG DES KONTAKTS
  // openContactDetail(contactsSorted[positionOfContact]["idContact"]); // PRÜFEN, OB ERFORDERLICH
}


/**
 * This function opens the overlay for editing a existing contact - the input fields are prefilled with the selected contact
 * 
 * @param {number} positionOfContact - - position of the contact currently selected in the array "contactsSorted"
 */
async function openEditContactOverlay(positionOfContact) {
  document.getElementById("overlay-contacts").classList.remove("d-none");
  document.getElementById("overlay-contacts").innerHTML = await generateOverlayEditContact(positionOfContact);
  document.getElementById("acronym-contacts-edit-add").style.backgroundColor = contactsSorted[positionOfContact]["colorContact"];

  document.getElementById("contacts-detail-input-name").value = contactsSorted[positionOfContact]["nameContact"];
  document.getElementById("contacts-detail-input-mail").value = contactsSorted[positionOfContact]["emailContact"];
  document.getElementById("contacts-detail-input-phone").value = contactsSorted[positionOfContact]["phoneContact"];
}


/**
 * This function deletes the currently selected/ displayed contact, then updates the array contacts and
 * The function renders the contact list without the deleted contact and resets the detailed view
 *
 * !!! LÖSCHUNG AUS TASKS & UPDATE BACKEND MUSS NOCH ERGÄNZT WERDEN
 *
 * @param {number} positionOfContact - position of the contact currently selected in the array "contactsSorted"
 */
function deleteContact(positionOfContact) {
  // deleteUserFromAssignedTasks();
  contactsSorted.splice(positionOfContact, 1);
  contacts = contactsSorted;
  // setItem() - nach Abstimmung Architektur für users/ contacts einfügen

  document.getElementById("wrapper-contact-details").innerHTML = '';

  returnToContactList();
  closeSubmenuContact();
  closeContactsDetails();
}


/**
 * This function closes the overlay for adding oder editing a contact
 */
function closeContactsDetails() {
  document.getElementById("overlay-contacts").classList.add("d-none");
}