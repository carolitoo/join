/**
 * This function returns the HTML-Code in case that there are no contacts available in the array "contacts"
 *
 * @returns - HTML-Code if no contacts are availabe
 */
async function generateNoContactsHTML() {
  return /*html*/ `
    <div class="contacts-no-contacts">No contacts available</div>
    `;
}

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
    `;
}

/**
 * This function returns the HTML-Code for a single contact element in the contact list
 *
 * @param {number} positionOfContact - position of the contact in the array "contactSorted" for which the HTML-Code is generated
 * @returns - HTML-Code for a single contact element in the contact list
 */
async function generateSingleListContactHTML(positionOfContact) {
  return /*html*/ `
    <div class="contact-list-single-contact" id="${contactsSorted[positionOfContact]["idContact"]}" onclick="openContactDetail('${contactsSorted[positionOfContact]["idContact"]}')">
      <div class="contact-list-single-contact-acronym" id="contact-list-single-contact-acronym-${contactsSorted[positionOfContact]["idContact"]}">${contactsSorted[positionOfContact]["acronymContact"]}</div>
      <div class="contact-list-single-contact-right">
        <div class="contact-list-single-contact-name">${contactsSorted[positionOfContact]["nameContact"]}</div>
        <div class="contact-list-single-contact-mail">${contactsSorted[positionOfContact]["emailContact"]}</div>
      </div>
    </div>
    `;
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
      <div class="contacts-detail-acronym" id="contacts-detail-acronym-${contactsSorted[positionOfContact]["idContact"]}">${contactsSorted[positionOfContact]["acronymContact"]}</div>
      <div class="ctn-contacts-details-name-right">
        <div class="contacts-detail-name">${contactsSorted[positionOfContact]["nameContact"]}</div>
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
                <div class="contacts-detail-mail">${contactsSorted[positionOfContact]["emailContact"]}</div>
              </div>
              <div class="contacts-detail-mail-phone">
                <span>Phone</span>
                <div>${contactsSorted[positionOfContact]["phoneContact"]}</div>
              </div>
      </div>
    `;
}

async function generateOverlayEditContact(positionOfContact) {
  return /*html*/ `
  <div class="ctn-contacts-edit-add">
    <div class="ctn-headline-contacts-edit-add">
      <img class="logo-contacts-edit-add" src="./assets/img/logo_light.svg" />
      <h1 class="headline-contacts-edit-add" id="headline-contacts-edit-add">
        Edit contact
      </h1>
      <div class="separator-contacts-edit-add"></div>
    </div>
    <div class="acronym-contacts-edit-add">TW</div>
    <div class="ctn-contacts-detail-close">
      <img
        class="contacts-detail-close"
        src="./assets/img/close_black.svg"
        onclick="closeContactsDetails()"
      />
    </div>
    <form
      class="form-contacts-edit-add"
      onsumit="editContact(${positionOfContact})"
      action="./contact.html"
    >
      <div class="ctn-input-contact-edit-add">
        <div>
          <input
            type="text"
            id="contacts-detail-input-name"
            minlength="3"
            placeholder="Name"
            required
          />
          <img class="input-icon" src="./assets/img/person.svg" />
        </div>
        <div>
          <input
            type="email"
            id="contacts-detail-input-mail"
            placeholder="Email"
            required
          />
          <img class="input-icon" src="./assets/img/mail.svg" />
        </div>
        <div>
          <input
            type="text"
            id="contacts-detail-input-phone"
            pattern="[+][0-9]*"
            placeholder="Phone"
            oninvalid="this.setCustomValidity('Please enter a valid phone number')"
            oninput="this.setCustomValidity('')"
          />
          <img class="input-icon" src="./assets/img/phone.svg" />
        </div>
      </div>
      <div class="ctn-btns-contact-edit-add">
        <div class="btn-outline" onclick="deleteContact(${positionOfContact})">
          Delete
        </div>
        <button class="btn-db">
          Save
          <img src="./assets/img/check_white.svg" />
        </button>
      </div>
    </form>
  </div>;
  `;
}

async function generateOverlayAddContact() {
  return /*html*/ `
  <div class="ctn-contacts-edit-add">
        <div class="ctn-headline-contacts-edit-add">
          <img class="logo-contacts-edit-add" src="./assets/img/logo_light.svg" />
          <h1 class="headline-contacts-edit-add" id="headline-contacts-edit-add">
            Add contact
          </h1>
          <div class="sub-headline-contacts-add" id="sub-headline-contacts-add">
            Tasks are better with a team!
          </div>
          <div class="separator-contacts-edit-add"></div>
        </div>
        <div class="acronym-contacts-edit-add"><img class="icon-acronym-contacts-add" src="./assets/img/person_white.svg"></div>
        <div class="ctn-contacts-detail-close">
          <img
            class="contacts-detail-close"
            src="./assets/img/close_black.svg"
            onclick="closeContactsDetails()"
          />
        </div>
        <form
          class="form-contacts-edit-add"
          onsumit="addContact()"
          action="./contact.html"
        >
          <div class="ctn-input-contact-edit-add">
            <div>
              <input
                type="text"
                id="contacts-detail-input-name"
                minlength="3"
                placeholder="Name"
                required
              />
              <img class="input-icon" src="./assets/img/person.svg" />
            </div>
            <div>
              <input
                type="email"
                id="contacts-detail-input-mail"
                placeholder="Email"
                required
              />
              <img class="input-icon" src="./assets/img/mail.svg" />
            </div>
            <div>
              <input
                type="text"
                id="contacts-detail-input-phone"
                pattern="[+][0-9]*"
                placeholder="Phone"
                oninvalid="this.setCustomValidity('Please enter a valid phone number')"
                oninput="this.setCustomValidity('')"
              />
              <img class="input-icon" src="./assets/img/phone.svg" />
            </div>
          </div>
          <div class="ctn-btns-contact-edit-add">
            <div class="btn-outline btn-cancel-contacts" onclick="deleteContact()">
              Cancel
              <img class="icon-btn-cancel-contacts" id="icon-btn-cancel-contacts" src="./assets/img/close_black.svg" />
            </div>
            <button class="btn-db">
              Create Contact
              <img src="./assets/img/check_white.svg" />
            </button>
          </div>
        </form>
      </div>
  `;
}
