//aktuell noch Problem mit einbindung der contact.js (widow-with - class in unbekanntem html eingebunden (contact.html))//
async function initSummary() {
    await proofAuthentification();
    await includeHTML();
    await loadUserData();
    await identifyCurrentUser();
    await loadAllContacts();
    // await loadTasks();
    changeSelectedTab('tab-summary');
}

/**
 * This function tests whether there was a registration with an e-mail address. If not, you will be redirected back to the login. Otherwise the user-data will be filtered.
 */
async function proofAuthentification() {
    const loggedInEmail = await getLoggedInEmail();

    if (loggedInEmail !== '[]') {
    } else {
        alert('No user found');
        window.location.href = './index.html';
    }
}


async function getLoggedInEmail() {
    try {
        const response = await getItem('loggedInEmail');
        const LoggedInEmail = response['data']['value'];
        return LoggedInEmail;
    } catch (error) {
        alert('An error has occurred', error);
        return '';
    }
}


async function identifyCurrentUser() {
    const loggedInEmail = await getLoggedInEmail();
    const currentUser = users.find(u => u.email === loggedInEmail);
    personalizeAppContent(currentUser)
}


function personalizeAppContent(currentUser) {
    if (currentUser.name.toLowerCase() !== 'guest') {
        const acronym = currentUser.acronym;
        generateGreeting(currentUser, acronym);
        createOwnContact(currentUser);
    } else {
        const acronym = currentUser.acronym;
        generateGreeting(currentUser, acronym);
    }
}



async function createOwnContact(user) {
    const existingContact = await checkIfContactAlreadyExist();

    if (!existingContact) {
        const loggedInEmail = await getLoggedInEmail();
        const newUserContact = {
            idContact: `contact-${user.userID}`,
            nameContact: user.name,
            firstName: user.name.split(' ')[0],
            lastName: checkIfLastNameExist(user.name.split(' ')),
            acronymContact: user.acronym,
            colorContact: '',
            emailContact: loggedInEmail,
            phoneContact: '',
            assignedTasks: [],
        }
        setBackgroundcolor(newUserContact);
        contacts.push(newUserContact);
        storeContactItems();
    }
}

async function checkIfContactAlreadyExist() {
    const loggedInEmail = await getLoggedInEmail();
    return contacts.find(contact => contact.emailContact === loggedInEmail);
}



async function generateGreeting(currentUser, acronym) {
    const nameParts = currentUser.name.split(' ');
    const firstName = capitalizeFirstLetter(nameParts[0]);//
    const lastName = checkIfLastNameExist(nameParts);//

    const currentHour = new Date().getHours();

    if (currentUser.name.toLowerCase() === 'guest') {
        greetingGuest(currentHour);
    } else {
        greetingUser(currentHour, firstName, lastName);
    }
    generateUserIcon(acronym);
}


function checkIfLastNameExist(nameParts) {
    let lastName = '';
    if (nameParts.length > 1) {
        lastName = nameParts[nameParts.length - 1];
        lastName = capitalizeFirstLetter(nameParts[nameParts.length - 1]);
    }
    return lastName;
}

function getGreeting(hour) {
    if (hour >= 5 && hour < 12) {
        return 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
}

function greetingUser(currentHour, firstName, lastName) {
    const greetingText = document.getElementById('greetingText');
    greetingText.innerHTML = `${getGreeting(currentHour)}, 
    <br><span class="greeting-username-format">${firstName} ${lastName}</span>`;
}



function greetingGuest(currentHour) {
    const greetingText = document.getElementById('greetingText');
    greetingText.innerHTML = getGreeting(currentHour);
}



//soll die function hier bleiben oder zu template.js verschoben werden//?
function generateUserIcon(acronym) {
    const userIcon = document.getElementById('iconUserheader');
    userIcon.textContent = acronym;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


async function storeContactItems() {
    await setItem('contacts', JSON.stringify(contacts));
}


