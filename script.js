

"use strict";

const passwordInput = document.getElementById("password");
const passwordForm = document.getElementById("passwordForm");
const togglePassword = document.getElementById("togglePassword");
const clearButton = document.getElementById("clearButton");

const strengthLabel = document.getElementById("strengthLabel");
const strengthBar = document.getElementById("strengthBar");
const strengthProgress = document.getElementById("strengthProgress");
const strengthDescription = document.getElementById("strengthDescription");
const suggestionsList = document.getElementById("suggestionsList");

const requirements = {
    length: document.getElementById("lengthRequirement"),
    uppercase: document.getElementById("uppercaseRequirement"),
    lowercase: document.getElementById("lowercaseRequirement"),
    number: document.getElementById("numberRequirement"),
    special: document.getElementById("specialRequirement"),
    longLength: document.getElementById("longLengthRequirement")
};

const strengthLevels = [
    {
        label: "Very Weak",
        color: "#dc2626",
        description: "This password needs significant improvement."
    },
    {
        label: "Weak",
        color: "#ea580c",
        description: "Your password is weak. Add more security features."
    },
    {
        label: "Fair",
        color: "#d97706",
        description: "Your password has some good features but can improve."
    },
    {
        label: "Strong",
        color: "#16a34a",
        description: "Good work! Your password meets several security criteria."
    },
    {
        label: "Very Strong",
        color: "#047857",
        description: "Excellent complexity. Avoid reusing this password."
    }
];

function analyzePassword(password) {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
        longLength: password.length >= 12
    };

    const score = Object.values(checks).filter(Boolean).length;

    return { checks, score };
}

function updateRequirements(checks) {
    Object.entries(requirements).forEach(([key, element]) => {
        if (!element) return;

        const passed = checks[key];
        element.classList.toggle("met", passed);

        const icon = element.querySelector(".requirement-icon");

        if (icon) {
            icon.textContent = passed ? "✓" : "○";
        }

        element.setAttribute(
            "aria-label",
            element.textContent.trim() +
            (passed ? ": satisfied" : ": not satisfied")
        );
    });
}

function generateSuggestions(password, checks) {
    const suggestions = [];

    if (password.length === 0) {
        return ["Enter a password to receive recommendations."];
    }

    if (!checks.length) {
        suggestions.push("Use at least 8 characters.");
    }

    if (!checks.longLength) {
        suggestions.push("Aim for 12 or more characters.");
    }

    if (!checks.uppercase) {
        suggestions.push("Include at least one uppercase letter.");
    }

    if (!checks.lowercase) {
        suggestions.push("Include at least one lowercase letter.");
    }

    if (!checks.number) {
        suggestions.push("Include at least one number.");
    }

    if (!checks.special) {
        suggestions.push("Add a special character, such as ! or #.");
    }

    if (/(.)\1{2,}/.test(password)) {
        suggestions.push(
            "Avoid repeating the same character several times."
        );
    }

    if (/1234|abcd|qwerty|password/i.test(password)) {
        suggestions.push(
            "Avoid common words and predictable sequences."
        );
    }

    if (suggestions.length === 0) {
        suggestions.push("All listed requirements are satisfied.");
        suggestions.push(
            "Use a unique password and consider a password manager."
        );
    }

    return suggestions;
}

function updateStrength(password, score) {
    if (password.length === 0) {
        strengthLabel.textContent = "Not evaluated";
        strengthLabel.style.color = "#64748b";
        strengthBar.style.width = "0%";
        strengthBar.style.backgroundColor = "#94a3b8";
        strengthProgress.setAttribute("aria-valuenow", "0");

        strengthDescription.textContent =
            "Enter a password to see your security assessment.";

        return;
    }

    let levelIndex;

    if (password.length < 8 || score <= 1) {
        levelIndex = 0;
    } else if (score === 2) {
        levelIndex = 1;
    } else if (score === 3) {
        levelIndex = 2;
    } else if (score === 4) {
        levelIndex = 3;
    } else {
        levelIndex = 4;
    }

    const level = strengthLevels[levelIndex];
    const progressValues = [15, 30, 50, 75, 100];
    const progress = progressValues[levelIndex];

    strengthLabel.textContent = level.label;
    strengthLabel.style.color = level.color;

    strengthBar.style.width = progress + "%";
    strengthBar.style.backgroundColor = level.color;

    strengthProgress.setAttribute(
        "aria-valuenow",
        String(progress)
    );

    strengthDescription.textContent = level.description;
}

function updateSuggestions(password, checks) {
    suggestionsList.replaceChildren();

    const suggestions = generateSuggestions(password, checks);

    suggestions.forEach(suggestion => {
        const item = document.createElement("li");
        item.textContent = suggestion;
        suggestionsList.appendChild(item);
    });
}

function checkPassword() {
    const password = passwordInput.value;
    const result = analyzePassword(password);

    updateRequirements(result.checks);
    updateStrength(password, result.score);
    updateSuggestions(password, result.checks);
}

// Prevent the browser from submitting the form or putting
// the password into the URL when Enter is pressed.
passwordForm.addEventListener("submit", function (event) {
    event.preventDefault();
    checkPassword();
});


// Analyze the password automatically while typing.
passwordInput.addEventListener("input", checkPassword);


// Show or hide the password.
togglePassword.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    togglePassword.textContent = isHidden ? "Hide" : "Show";

    togglePassword.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
    );

    togglePassword.setAttribute(
        "aria-pressed",
        String(isHidden)
    );
});


// Clear the password and reset the assessment.
clearButton.addEventListener("click", function () {
    passwordInput.value = "";
    passwordInput.type = "password";

    togglePassword.textContent = "Show";

    togglePassword.setAttribute(
        "aria-label",
        "Show password"
    );

    togglePassword.setAttribute(
        "aria-pressed",
        "false"
    );

    checkPassword();
    passwordInput.focus();
});


// Initialize the application.
checkPassword();
// Password Generator
const passwordLength = document.getElementById("passwordLength");
const lengthValue = document.getElementById("lengthValue");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const generateButton = document.getElementById("generateButton");
const copyGeneratedButton = document.getElementById("copyGeneratedButton");
const generatorMessage = document.getElementById("generatorMessage");

passwordLength.addEventListener("input", function () {
    lengthValue.textContent = passwordLength.value;
});

function generateStrongPassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=";

    let characters = uppercase + lowercase;
    let password = "";

    if (includeNumbers.checked) {
        characters += numbers;
    }

    if (includeSymbols.checked) {
        characters += symbols;
    }

    if (!includeNumbers.checked && !includeSymbols.checked) {
        generatorMessage.textContent = "Enable numbers or symbols for more variety.";
    } else {
        generatorMessage.textContent = "";
    }

    const length = Number(passwordLength.value);
    const requiredCharacters = [
        uppercase,
        lowercase
    ];

    if (includeNumbers.checked) {
        requiredCharacters.push(numbers);
    }

    if (includeSymbols.checked) {
        requiredCharacters.push(symbols);
    }

    for (const group of requiredCharacters) {
        password += group[secureRandomIndex(group.length)];
    }

    while (password.length < length) {
        password += characters[secureRandomIndex(characters.length)];
    }

    password = secureShuffle(password);
    document.getElementById("password").value = password;
    document.getElementById("password").type = "text";

    const toggleButton = document.getElementById("togglePassword");
    if (toggleButton) {
        toggleButton.textContent = "Hide";
    }

    document.getElementById("password").dispatchEvent(new Event("input"));

    generatorMessage.textContent = "Strong password generated successfully!";
}

function secureRandomIndex(max) {
    const randomValues = new Uint32Array(1);
    const limit = Math.floor(4294967296 / max) * max;

    let value;
    do {
        crypto.getRandomValues(randomValues);
        value = randomValues[0];
    } while (value >= limit);

    return value % max;
}

function secureShuffle(password) {
    const characters = password.split("");

    for (let i = characters.length - 1; i > 0; i--) {
        const j = secureRandomIndex(i + 1);
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    return characters.join("");
}

generateButton.addEventListener("click", generateStrongPassword);

copyGeneratedButton.addEventListener("click", async function () {
    const passwordInput = document.getElementById("password");

    if (!passwordInput.value) {
        generatorMessage.textContent = "Generate a password first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);
        generatorMessage.textContent = "Password copied successfully!";
    } catch (error) {
        generatorMessage.textContent =
            "Copy unavailable. Open this app through localhost and check browser permissions.";
    }
});
