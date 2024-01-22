/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsUrgent(){ 
    document.getElementById('urgentButton').classList.add("urgent-btn-red");
    document.getElementById('urgentButton').classList.remove("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta w.svg';

    document.getElementById('mediumButton').classList.remove("medium-btn-yellow"); 
    document.getElementById('mediumButton').classList.add("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/prio media y.svg';

    document.getElementById('lowButton').classList.remove("low-btn-green");
    document.getElementById('lowButton').classList.add("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja.svg';
}

/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsMedium(){ 
    document.getElementById('mediumButton').classList.add("medium-btn-yellow");
    document.getElementById('mediumButton').classList.remove("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/capa 2.svg';

    document.getElementById('urgentButton').classList.remove("urgent-btn-red");
    document.getElementById('urgentButton').classList.add("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta2.svg';

    document.getElementById('lowButton').classList.remove("low-btn-green");
    document.getElementById('lowButton').classList.add("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja.svg';
}

/**
 * This function changes the colors of the priority buttons and changes the remaining two buttons back, if switched between them
 */
function changeButtonColorsLow(){ 
    document.getElementById('lowButton').classList.add("low-btn-green");
    document.getElementById('lowButton').classList.remove("prio-btn-neutral");
    document.getElementById('low-icon').src = './assets/img/Prio baja w.svg';

    document.getElementById('mediumButton').classList.remove("medium-btn-yellow");
    document.getElementById('mediumButton').classList.add("prio-btn-neutral");
    document.getElementById('medium-icon').src = './assets/img/prio media y.svg';

    document.getElementById('urgentButton').classList.remove("urgent-btn-red");
    document.getElementById('urgentButton').classList.add("prio-btn-neutral");
    document.getElementById('urgent-icon').src = './assets/img/Prio alta2.svg';
}