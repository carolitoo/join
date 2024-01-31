async function initSummary() {
    await includeHTML();
    await loadUserData();
    // await loadTasks();
    greetingUser();
    changeSelectedTab('tab-summary');
}

async function greetingUser() {
    const loggedInEmail = await getLoggedInEmail();
    let currentUser = users.find(u => u.email === loggedInEmail);
    const greetingText = document.getElementById('greetingText');

    if (currentUser) {
        if (currentUser.name.toLowerCase() === 'guest') {
            greetingText.innerHTML = 'Good Morning';
        } else {
            currentUser = currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1);
            greetingText.innerHTML = `Good Morning, 
            <br><span class="greeting-username-format">${currentUser}</span>`;
        }
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
