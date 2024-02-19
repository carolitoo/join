let positionOfContact;
let contacts = [];
let contactsSorted = [];
let initialLetters = [];
let contactIsSelected = false;
let extractedContactNumbers = [];
let currentUserAsContact = [];
let guest = false;




async function initContact() {
  await includeHTML();
  changeSelectedTab("tab-contacts");
  await loadUserData();
  await loadContacts();
  await getLoggedInEmail();
  await checkIfGuestOrCurrentUser();
  await renderAcronym(loggedInEmail);
  await sortArrayContacts();
  await renderContactList();
  checkWindowWidth();
}

/**
 * This function checks whether a guest is logging in or whether it is a personal account.
 * 
 * @returns returns true if the current user is the guest user. returns false if the user is using personalized access.
 */

async function checkIfGuestOrCurrentUser() {
  currentUserAsContact = contacts.find(c => c.emailContact === loggedInEmail);

  if (currentUserAsContact && currentUserAsContact.emailContact === 'guest@account') {
    guest = true;
    loggedInEmail = 'guest@account';
    return true;
  }
  return currentUserAsContact;
}



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
  await clearContactList();
  await loadContacts();
  await renderContactList();
  // Check the window width and update the view accordingly
  checkWindowWidth();
}


/**
 * This function finds the currentUser and updates the interface with the user's personalized acronym-based icon.
 * 
 * @param {string} loggedInEmail - currently used email-adress
 * @returns - an array with all access information about the current user.
 */
async function renderAcronym(loggedInEmail) {
  currentUser = users.find(u => u.email == loggedInEmail);
  generateUserIcon(currentUser.acronym);
  return currentUser;
}



async function proofIfContactsexist() {
  if (contacts.length === 0) {
    document.getElementById("ctn-contact-list").innerHTML = await generateNoContactsHTML();
    return true;
  }
  return false;
}



/**
 * This function renders the loaded contacts alphabetically sorted into the contact list
 */
async function renderContactList() {
  if (!guest && currentUserAsContact) {
    await renderCurrentUserAsContact();
  }
  const proofExecuted = await proofIfContactsexist();
  if (!proofExecuted) {
    for (let j = 0; j < initialLetters.length; j++) {
      const initialLetter = initialLetters[j].toUpperCase();
      if (guest && currentUserAsContact && contactFirstNameInitial.toUpperCase() === currentUserAsContact["firstName"][0].toUpperCase() && k !== 0) {
        continue;
      }
      await generateAndInsertInitialLetterHTML(initialLetter);
      const contactListLetter = document.getElementById(`contact-list-letter-${initialLetter}`);
      if (!contactListLetter.hasAttribute("data-iteration-done")) {
        await processContactsForInitialLetter(contactsSorted, initialLetter);
        contactListLetter.setAttribute("data-iteration-done", true);
        // Check if any contacts with the current initial letter exist after deletion
        await checkIfContactLetterstillThere(contactsSorted, initialLetter, contactListLetter);
      }
      await updateContactElementStylesForInitialLetter(contactsSorted, initialLetter);
    }
  }
}


async function generateAndInsertInitialLetterHTML(initialLetter) {
  const initialLetterHTML = await generateInitialLetterHTML(initialLetter);
  document.getElementById("ctn-contact-list").innerHTML += initialLetterHTML;
}


async function checkIfContactLetterstillThere(contactsSorted, initialLetter, contactListLetter) {
  const contactsWithInitial = contactsSorted.filter(contact => contact["firstName"][0].toUpperCase() === initialLetter);
  if (contactsWithInitial.length === 0) {
    contactListLetter.parentNode.removeChild(contactListLetter);
  }
}


async function processContactsForInitialLetter(contacts, initialLetter) {
  let htmlContent = '';

  for (let k = 0; k < contacts.length; k++) {
    const contactFirstNameInitial = contacts[k]["firstName"][0];
    if (guest && currentUserAsContact && contactFirstNameInitial.toUpperCase() === currentUserAsContact["firstName"][0].toUpperCase() && k !== 0) {
      continue;
    }

    if (contactFirstNameInitial == initialLetter) {
      htmlContent += await generateSingleListContactHTML(k);
    }
  }
  document.getElementById(`contact-list-letter-${initialLetter}`).innerHTML += htmlContent;
}



async function updateContactElementStylesForInitialLetter(contacts, initialLetter) {
  for (let k = 0; k < contacts.length; k++) {
    const contactFirstNameInitial = contacts[k]["firstName"][0];
    if (guest && currentUserAsContact && contactFirstNameInitial.toUpperCase() === currentUserAsContact["firstName"][0].toUpperCase()) {
      continue;
    }
    if (contactFirstNameInitial == initialLetter) {
      const contactElement = document.getElementById(`contact-list-single-contact-acronym-${contacts[k]["ID"]}`);

      if (contactElement) {
        contactElement.style.backgroundColor = contacts[k]["colorContact"];
      }
    }
  }
}


async function generateSingleListContactHTML(positionOfContact) {
  const contactFirstNameInitial = contactsSorted[positionOfContact]["firstName"][0];
  if (guest && currentUserAsContact && contactFirstNameInitial.toUpperCase() === currentUserAsContact["firstName"][0].toUpperCase()) {
    return '';
  }
}


async function clearContactList() {
  document.getElementById("ctn-contact-list").innerHTML = "";
}


async function renderCurrentUserAsContact() {
  const currentUserHTML = await generateSingleListContactHTMLCurrentUSER(currentUserAsContact);
  document.getElementById("ctn-contact-list").innerHTML += currentUserHTML;
  document.getElementById(`contact-list-single-contact-acronym-${currentUserAsContact["ID"]}`).style.backgroundColor = currentUserAsContact["colorContact"];
}


/**
 * This function sorts the loaded array "contacts" alphabetically
 *
 */
async function sortArrayContacts() {
  contactsSorted = [...contacts].sort((a, b) => {
    // Move currentUserAsContact to the beginning of the array
    if (a === currentUserAsContact) return -1;
    if (b === currentUserAsContact) return 1;

    const nameA = a.name || '';
    const nameB = b.name || '';
    return nameA.localeCompare(nameB);
  });
  await createArrayInitialLetters();
  console.log('test', contactsSorted);
}


/**
 * This function creates an alphabetically sorted array with all the initial letters currently available in the loaded array "contacts"
 */
async function createArrayInitialLetters() {
  initialLetters = [];

  for (i = 0; i < contacts.length; i++) {
    const firstNameInitial = contacts[i]["firstName"][0];

    if (!initialLetters.includes(firstNameInitial)) {
      initialLetters.push(firstNameInitial.toUpperCase());
    }
  }
  initialLetters.sort();
}

/**
 * This function generates values after filling in the input fields and uses them to create a new contact.
 */
async function createContact() {
  let nameInput = document.getElementById('contacts-detail-input-name').value;
  let emailInput = document.getElementById('contacts-detail-input-mail').value;
  let phoneNumberInput = document.getElementById('contacts-detail-input-phone').value;

  let newContact = {
      "ID": new Date().getTime(),
      "firstName": filterFirstName(nameInput),
      "lastName": filterLastName(),
      "name": filterFirstName(nameInput) + ' ' + filterLastName(),
      "acronymContact": getAcronym(),
      "colorContact": setBackgroundcolor(),
      "emailContact": emailInput,
      "phoneContact": phoneNumberInput
  };
  await addNewContact(newContact);
}



/**
 * This function opens the detailed view of a contact and ensures that only the selected contact is marked in the contact list
 *
/**
 * @param {string} ID - id of the contact for which the details shall be displayed
 */
async function openContactDetail(ID) {
  contactIsSelected = true;
  positionOfContact = contactsSorted.findIndex(contact => String(contact.ID) === String(ID));
  const isCurrentUser = currentUserAsContact && String(currentUserAsContact.ID) === String(ID);

  checkWindowWidth();
  await resetPreviousSelectedContact();
  markSelectedContact(ID);

  if (isCurrentUser) {
    await openContactDetailCurrentUser(positionOfContact)
  }
  else {
    document.getElementById("wrapper-contact-details").innerHTML = await generateContactDetailHTML(positionOfContact);
  }
  document.getElementById(`contacts-detail-acronym-${ID}`).style.backgroundColor = contactsSorted[positionOfContact]["colorContact"];
  slideInAnimation('wrapper-contact-details', 'translate-x', false);
}


/**
 * This function generates an extra 'open-contact-view' to hide the delete-button to prevent the current user from being deleted.
 * 
 * @param {number} positionOfContact - the position of the currently selected contact
 */
async function openContactDetailCurrentUser(positionOfContact) {

  document.getElementById("wrapper-contact-details").innerHTML = await generateContactDetailHTML(positionOfContact);
  const deleteButtonContainer = document.getElementById("trash-bin-container");
  deleteButtonContainer.style.display = "none";
}


/**
 * This functions resets the format for all contacts in the contact list (required in case that a contact was selected previously)
 * The function also hides the details of the previous contact (essential for the correct display of the slide-in animation of the following contact)
 */
async function resetPreviousSelectedContact() {
  for (i = 0; i < contactsSorted.length; i++) {
    let ID = contactsSorted[i]["ID"];
    document.getElementById(`${ID}`).style = `pointer-events: auto`;
    document.getElementById(`${ID}`).style.backgroundColor = "white";
    document.getElementById(`${ID}`).style.color = "black";
  }
  document.getElementById("wrapper-contact-details").classList.add("d-none");
}


/**
 * This function marks the currently selected contact in the contact list
 *
 * @param {string} ID - id of the contact for which the details are displayed
 */
function markSelectedContact(ID) {
  document.getElementById(`${ID}`).style = `pointer-events: none`;
  document.getElementById(`${ID}`).style.backgroundColor = "#2A3647";
  document.getElementById(`${ID}`).style.color = "white";
}


/**
 * This function manages the slide-in animation when opening or editing an element - depending on the parameters the element stays permanently or just pops up
 * 
 * @param {string} idOfElement - id of the element that is suppossed to appear 
 * @param {string} className - class that defines where the element slides in from 
 * @param {boolean} letElementDisappear - defines whether the element lasts or disappears after sliding-in
 */
function slideInAnimation(idOfElement, className, letElementDisappear) {
  document
    .getElementById(idOfElement)
    .classList.add(className);
  setTimeout(() => {
    document
      .getElementById(idOfElement)
      .classList.remove("d-none");
  }, 10);
  setTimeout(() => {
    document
      .getElementById(idOfElement)
      .classList.remove(className);
  }, 100);

  if (letElementDisappear == true) {
    setTimeout(() => {
      document
        .getElementById(idOfElement)
        .classList.add("d-none");
    }, 1500);
  }
}


/**
 * This function opens the overlay for adding a new contact
 */
async function openAddContactOverlay() {
  document.getElementById("overlay-contacts").classList.remove("d-none");
  document.getElementById("overlay-contacts").innerHTML = await generateOverlayAddContact();
}

/**
 * This function adds the new contact to the existing contact list and opens it directly in the detail view.
 * 
 * @param {array} newContact - the new contact to be added to the existing contacts.
 */
async function addNewContact(newContact) {
  const contactExists = await checkIfContactexist(newContact);
  if (!contactExists) {
    contacts.push(newContact);
    contactsSorted.push(newContact);
    contactsSorted.sort((a, b) => a.name.localeCompare(b.name));
    await setItem('contacts', contacts);
    await clearContactList();
    await renderContactList(newContact);
    resetAddContact();
    document.getElementById("overlay-contacts").classList.add("d-none");
    slideInAnimation('pop-up-contacts-add', 'translate-y', true);
    await openContactDetail(newContact["ID"]);
  }
}


async function checkIfContactexist(newContact) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].emailContact == newContact.emailContact) {
      let emailInput = document.getElementById('contacts-detail-input-mail');
      displayErrorMessage('Contact already exists', emailInput);
      return true; // Contact exists, return true
    }
  }
  return false;
}



function displayErrorMessage(message, element) {
  const errorMessageId = 'customErrorMessage';
  let existingErrorMessage = document.getElementById(errorMessageId);
  if (existingErrorMessage) {
    existingErrorMessage.innerHTML = message;
  } else {
    let errorMessage = document.createElement('div');
    errorMessage.innerHTML = message;
    errorMessage.id = errorMessageId;
    errorMessage.style.cssText = 'color: red; margin: -27px 0 9px 6px; font-size: small;';
    element.parentNode.appendChild(errorMessage);
  }
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
 * This function opens the overlay for editing a existing contact - the input fields are prefilled with the selected contact
 * 
 * @param {number} positionOfContact - - position of the contact currently selected in the array "contactsSorted"
 */
async function openEditContactOverlay(positionOfContact) {
  document.getElementById("overlay-contacts").classList.remove("d-none");
  document.getElementById("overlay-contacts").innerHTML = await generateOverlayEditContact(positionOfContact);
  document.getElementById("acronym-contacts-edit-add").style.backgroundColor = contactsSorted[positionOfContact]["colorContact"];

  document.getElementById("contacts-detail-input-name").value = contactsSorted[positionOfContact]["name"];
  document.getElementById("contacts-detail-input-mail").value = contactsSorted[positionOfContact]["emailContact"];
  document.getElementById("contacts-detail-input-phone").value = contactsSorted[positionOfContact]["phoneContact"];
}


/**
 * This function allows the user to edit a contact, after saving a pop-up with a confirmation is displayed and the edited contact is opened
 * 
 * @param {number} positionOfContact - position of the contact currently selected in the array "contactsSorted"
 */
async function editContact(positionOfContact) {
  const editedName = document.getElementById('contacts-detail-input-name').value;
  const editedEmail = document.getElementById('contacts-detail-input-mail').value;
  const editedPhone = document.getElementById('contacts-detail-input-phone').value;

  contactsSorted[positionOfContact].name = editedName;
  contactsSorted[positionOfContact].emailContact = editedEmail;
  contactsSorted[positionOfContact].phoneContact = editedPhone;
  await setItem('contacts', JSON.stringify(contactsSorted));

  document.getElementById("overlay-contacts").classList.add("d-none");
  slideInAnimation('pop-up-contacts-edit', 'translate-y', true);
  await openContactDetail(contactsSorted[positionOfContact]["ID"]);
}


/**
 * This function deletes the currently selected/ displayed contact, then updates the array contacts and
 *
 * !!! LÖSCHUNG AUS TASKS & UPDATE BACKEND MUSS NOCH ERGÄNZT WERDEN
 * @param {number} positionOfContact - position of the contact currently selected in the array "contactsSorted"
 */
async function deleteContact(positionOfContact) {
  try {
    const confirmation = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmation) {
      return;
    }
    let updatedContactsSorted = await spliceContacts(positionOfContact);
    await setItem('contacts', JSON.stringify(updatedContactsSorted));
    checkWindowWidth();
    await clearContactWrapper();
    await returnToContactList();

    closeSubmenuContact();
    closeContactsDetails();
    slideInAnimation('pop-up-contacts-delete', 'translate-y', true);

  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}




async function spliceContacts(positionOfContact) {
  contactsSorted.splice(positionOfContact, 1);
  return [...contactsSorted]; // Return a new array with the contact removed
}

async function clearContactWrapper() {
  document.getElementById("wrapper-contact-details").innerHTML = '';
}


/**
 * This function closes the overlay for adding oder editing a contact
 */
function closeContactsDetails() {
  document.getElementById("overlay-contacts").classList.add("d-none");
}