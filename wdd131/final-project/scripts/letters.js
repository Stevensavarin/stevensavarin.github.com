document.addEventListener("DOMContentLoaded", () => {
    // Selects the form and email input elements
    const form = document.querySelector(".join__form");
    const emailInput = document.querySelector(".join__input");

    // Adds a 'submit' event listener to the form
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the form from submitting the usual way

        const email = emailInput.value.trim(); // Gets the email value and trims whitespace

        // Checks if the email has a valid format
        if (validateEmail(email)) {
            // Checks if the email is already registered
            if (isEmailRegistered(email)) {
                alert("This email is already registered. Please use another email."); // Warns the user if the email exists
            } else {
                // Registers the email in localStorage and shows a success message
                registerEmail(email);
                alert("Thank you for subscribing! We'll keep you updated.");
                emailInput.value = ""; // Clears the input field
            }
        } else {
            alert("Please enter a valid email address."); // Alerts if the email format is invalid
        }
    });

    // Validate the email format using a regular expression
    function validateEmail(email) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email); // Returns true if the email matches the pattern
    }

    // Check if the email is already registered in localStorage
    function isEmailRegistered(email) {
        const emails = JSON.parse(localStorage.getItem("registeredEmails")) || [];
        return emails.includes(email);
    }

    // Save the new email in localStorage
    function registerEmail(email) {
        const emails = JSON.parse(localStorage.getItem("registeredEmails")) || [];
        emails.push(email);
        localStorage.setItem("registeredEmails", JSON.stringify(emails));
    }
});
