async function initSummary() {
    await includeHTML();
    await loadUserData();
    // await loadTasks();
    identifyNewUser();
    changeSelectedTab('tab-summary');
}


async function identifyNewUser() {
    const loggedInEmail = await getLoggedInEmail();
    const currentUser = users.find(u => u.email === loggedInEmail);
    generateGreeting(currentUser);
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


async function generateGreeting(currentUser) {
    const greetingText = document.getElementById('greetingText');
    const nameParts = currentUser.name.split(' ');
    const firstName = capitalizeFirstLetter(nameParts[0]);
    const lastName = checkIfLastNameExist(nameParts);

    const currentHour = new Date().getHours();

    if (currentUser.name.toLowerCase() === 'guest') {
        greetingGuest(greetingText, currentHour);
    } else {
        greetingUser(greetingText, currentHour, firstName, lastName);
    }
    generateUserIcon(firstName, lastName);
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

function greetingUser(greetingText, currentHour, firstName, lastName) {
    greetingText.innerHTML = `${getGreeting(currentHour)}, 
    <br><span class="greeting-username-format">${firstName} ${lastName}</span>`;
}



function greetingGuest(greetingText, currentHour,) {
    greetingText.innerHTML = getGreeting(currentHour);
}



//soll die function hier bleiben oder zu template.js verschoben werden//?
function generateUserIcon(firstName, lastName) {
    const userIcon = document.getElementById('iconUserheader');

    const formattedFirstNameInitial = firstName.charAt(0).toUpperCase();
    const formattedLastNameInitial = lastName.charAt(0).toUpperCase();

    userIcon.textContent = formattedFirstNameInitial + formattedLastNameInitial;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



