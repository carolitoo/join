async function initSummary() {
    await includeHTML();
    await loadUserData();
    // await loadTasks();
    greetingUser();
    changeSelectedTab('tab-summary');
}

async function greetingUser() {
    const loggedInEmail = await getLoggedInEmail();
    const currentUser = users.find(u => u.email === loggedInEmail)

    if (currentUser) {
        const greetingUsername = document.getElementById('greetingUsername');
        greetingUsername.innerHTML = currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1);
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
