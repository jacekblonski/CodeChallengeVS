const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

const emailPattern = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const emailRegEx = new RegExp(emailPattern);

function validate(caller) {

    let isValid = true;

    isValid = validateUsername(caller == usernameInput) && isValid;
    isValid = validateEmail(caller == emailInput) && isValid;
    isValid = validatePassword(caller == passwordInput) && isValid;
    isValid = validateConfirm(caller == confirmInput) && isValid;
    isValid = validateMatch((caller == confirmInput || caller == passwordInput) && validatePassword(false)) && isValid;

    if (isValid) {
        document.getElementById('submit').removeAttribute("disabled");
    }
    else {
        document.getElementById('submit').setAttribute("disabled", "true");
    }
}

function validateUsername(active) {
    const usernameError = document.getElementById('username_error');
    if ((usernameInput.value.length > 1) && (usernameInput.value.length <= 15)) {
        usernameError.innerHTML = ("");
        usernameError.setAttribute("hidden", "true");
        return true;
    } else if (usernameInput.value.length > 15) {
        if (active) {
            usernameError.innerHTML = ("Username must be no more than 15 characters");
            usernameError.removeAttribute("hidden");
        };
        return false;
    } else if (usernameInput.value.length < 1) {
        if (active) {
            usernameError.innerHTML = ("Username required");
            usernameError.removeAttribute("hidden");
        };
        return false;
    } else {
        if (active) {
            usernameError.innerHTML = ("Invalid Username");
            usernameError.removeAttribute("hidden");
        };
        return false;
    }
}

function validateEmail(active) {
    const emailError = document.getElementById('email_error');
    if (emailRegEx.test(emailInput.value)) {
        emailError.innerHTML = ("");
        emailError.setAttribute("hidden", "true");
        return true;
    } else if (emailInput.value) {
        if (active) {
            emailError.innerHTML = ("Invalid Email");
            emailError.removeAttribute("hidden");
        };
        return false;
    } else {
        if (active) {
            emailError.innerHTML = ("Email address required");
            emailError.removeAttribute("hidden");
        };
        return false;
    }
}

function validatePassword(active) {
    const passwordError = document.getElementById('password_error');
    if (passwordInput.value) {
        passwordError.innerHTML = ("");
        passwordError.setAttribute("hidden", "true");
        return true;
    } else {
        if (active) {
            passwordError.innerHTML = ("Password required");
            passwordError.removeAttribute("hidden");
        };
        return false;
    }
}

function validateConfirm(active) {
    const confirmError = document.getElementById('confirm_error');
    if (confirmInput.value) {
        confirmError.innerHTML = ("");
        confirmError.setAttribute("hidden", "true");
        return true;
    } else {
        if (active) {
            confirmError.innerHTML = ("Please reenter password");
            confirmError.removeAttribute("hidden");
        };
        return false;
    }
}

function validateMatch(active) {
    const confirmError = document.getElementById('confirm_error');
    if (passwordInput.value && confirmInput.value) {
        if (passwordInput.value == confirmInput.value) {
            confirmError.innerHTML = ("");
            confirmError.setAttribute("hidden", "true");
            return true;
        } else {
            if (active) {
                confirmError.innerHTML = ("Passwords do not match");
                confirmError.removeAttribute("hidden");
            };
            return false;
        }
    }
}

function submit() {
    alert("Submitted!");
}