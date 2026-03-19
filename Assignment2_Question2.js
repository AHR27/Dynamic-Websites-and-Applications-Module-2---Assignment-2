// Select DOM elements
const form = document.getElementById('paymentForm');
const payPalRadio = document.getElementById('payPal');
const paymentRadios = document.getElementsByName('payment');
// Select all credit card related inputs including CVV 
const ccInputs = document.querySelectorAll('#ccFields input');
const shippingToggle = document.getElementById('sameAsBilling');
const shippingFields = document.getElementById('shippingFields');

/**
 * (a) Dynamic UI States: Conditional Disabling [cite: 29, 30]
 * Disables and greys out CC fields if PayPal is selected.
 */
function updatePaymentFields() {
    const isPayPal = payPalRadio.checked;
    ccInputs.forEach(input => {
        input.disabled = isPayPal;
        if (isPayPal) {
            input.value = ""; // Clear data if disabled
            input.required = false;
        } else {
            input.required = true; // Make required if Visa/MasterCard
        }
    });
}

/**
 * (a) Dynamic UI States: Shipping Toggle [cite: 31]
 * Shows/Hides shipping address based on the checkbox.
 */
shippingToggle.addEventListener('change', () => {
    shippingFields.style.display = shippingToggle.checked ? 'none' : 'block';
});

// Event listeners for payment method changes
paymentRadios.forEach(radio => {
    radio.addEventListener('change', updatePaymentFields);
});

/**
 * (b) Modern Validation 
 */
form.addEventListener('submit', (event) => {
    const emailField = document.getElementById('email');
    // Email Regex: [cite: 34]
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset custom validity
    emailField.setCustomValidity("");

    // Validate Email format [cite: 34, 35]
    if (!emailRegex.test(emailField.value)) {
        emailField.setCustomValidity("Please enter a valid email address (e.g., name@domain.com).");
    }

    // Use Constraint Validation API to show messages 
    if (!form.checkValidity()) {
        event.preventDefault(); // Stop submission
        form.reportValidity();  // Display native tooltips with custom messages
    }
});

// Initialize the state on page load
updatePaymentFields();