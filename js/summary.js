let loggedInEmail;
let currentUser;

//aktuell noch Problem mit einbindung der contact.js (widow-with - class in unbekanntem html eingebunden (contact.html))//
async function initSummary() {
    await includeHTML();
    await loadUserData();
    await loadContacts();
    await getLoggedInEmail();
    await identifyCurrentUser();
    await personalizeAppContent(currentUser);
    // await loadTasks();
    changeSelectedTab('tab-summary');
}


async function getLoggedInEmail() {
    try {
        const response = await getItem('loggedInEmail');
        loggedInEmail = response['data']['value'];
        return loggedInEmail;
    } catch (error) {
        alert('An error has occurred', error);
        return '';
    }
}

async function identifyCurrentUser() {
    currentUser = users.find(u => u.email === loggedInEmail);
    return currentUser;
}


async function personalizeAppContent(currentUser) {
    if (currentUser.name.toLowerCase() !== 'guest') {
        const acronym = currentUser.acronym;
        generateGreeting(currentUser, acronym);
        createOwnContact(currentUser);
    } else {
        const acronym = currentUser.acronym;
        generateGreeting(currentUser, acronym);
    }
}


//erstmal Weglassen//
async function createOwnContact(currentUser) {
    const existingContact = await checkIfContactAlreadyExist();
    if (!existingContact) {
        let currentUserAsContact = {
            ID: `contact-${currentUser.ID}`,
            name: currentUser.name,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            acronymContact: currentUser.acronym,
            colorContact: setBackgroundcolor(),
            emailContact: currentUser.email,
            phoneContact: ""
        }
        contacts.push(currentUserAsContact);
        await setItem('contacts', JSON.stringify(contacts));
    }
}


async function checkIfContactAlreadyExist() {
    loggedInEmail = await getLoggedInEmail();
    return contacts.find(contact => contact.email === loggedInEmail);
}


async function generateGreeting() {
    const currentHour = new Date().getHours();

    if (currentUser.name.toLowerCase() === 'guest') {
        greetingGuest(currentHour);
    } else {
        greetingUser(currentHour);
    }
    generateUserIcon();
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

function greetingUser(currentHour) {
    const greetingText = document.getElementById('greetingText');
    greetingText.innerHTML = `${getGreeting(currentHour)}, 
    <br><span class="greeting-username-format">${currentUser.firstName} ${currentUser.lastName}</span>`;
}



function greetingGuest(currentHour) {
    const greetingText = document.getElementById('greetingText');
    greetingText.innerHTML = getGreeting(currentHour);
}
