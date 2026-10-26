// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Mobile menu close when a navigation link is clicked
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// =========================
// DONATION AMOUNT SELECTION
// =========================

const amountButtons = document.querySelectorAll(".amount-btn");
const customAmount = document.getElementById("customAmount");
const donateButton = document.getElementById("donateButton");

let selectedAmount = 500;

function updateDonationButton(amount) {
    selectedAmount = amount;
    donateButton.textContent =
        "Donate ₹" + amount.toLocaleString("en-IN") + " →";
}

amountButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        amountButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        customAmount.value = "";

        const amount = Number(button.dataset.amount);

        updateDonationButton(amount);
    });
});

// Custom amount input
customAmount.addEventListener("input", function () {
    amountButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    const amount = Number(customAmount.value);

    if (
        Number.isFinite(amount) &&
        amount >= 1 &&
        amount <= 1000000
    ) {
        updateDonationButton(amount);
    } else {
        donateButton.textContent = "Donate Now →";
    }
});

// Demo only: no real payment is processed
donateButton.addEventListener("click", function () {
    const amount = customAmount.value.trim() !== ""
        ? Number(customAmount.value)
        : selectedAmount;

    if (
        !Number.isFinite(amount) ||
        amount < 1 ||
        amount > 1000000
    ) {
        alert("Please enter a valid donation amount between ₹1 and ₹10,00,000.");
        return;
    }

    alert(
        "Thank you for your interest in donating ₹" +
        amount.toLocaleString("en-IN") +
        "!\n\nThis is a demo website. No payment has been made."
    );
});


// =========================
// VOLUNTEER FORM
// =========================

const volunteerForm = document.getElementById("volunteerForm");
const formMessage = document.getElementById("formMessage");

volunteerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!volunteerForm.checkValidity()) {
        volunteerForm.reportValidity();
        return;
    }

    const name = document.getElementById("volName").value.trim();

    formMessage.textContent =
        "Thank you, " + name +
        "! Your demo form has been validated successfully.";

    formMessage.style.color = "#168653";

    alert(
        "Thank you, " + name + "!\n\n" +
        "Your form passed the demo validation. " +
        "The information has not been sent or saved."
    );

    volunteerForm.reset();
});


// =========================
// FOOTER YEAR
// =========================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();