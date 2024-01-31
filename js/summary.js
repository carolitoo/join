async function initSummary() {
    await includeHTML();
    await loadUserData();
    // await loadTasks();
    greetingUser();
    changeSelectedTab('tab-summary');
}

async function greetingUser() {
    const loggedInEmail = await getLoggedInEmail();
    const currentUser = users.find(u => u.email === loggedInEmail);

    const nameParts = currentUser.name.split(' ');
    const firstName = capitalizeFirstLetter(nameParts[0]);
    const lastName = checkIfLastNameExist(nameParts);

    const greetingText = document.getElementById('greetingText');

    if (currentUser) {
        if (currentUser.name.toLowerCase() === 'guest') {
            greetingText.innerHTML = 'Good Morning';
            generateUserIcon(firstName, lastName);
        } else {
            greetingText.innerHTML = `Good Morning, 
            <br><span class="greeting-username-format">${firstName} ${lastName}</span>`;
        }
        generateUserIcon(firstName, lastName);
    }
}


function checkIfLastNameExist(nameParts) {
    let lastName = '';
    if (nameParts.length > 1) {
        lastName = nameParts[nameParts.length - 1];
        lastName = capitalizeFirstLetter(nameParts[nameParts.length - 1]);
    }
    return lastName;
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
