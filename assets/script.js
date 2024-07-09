const repaymentBox = document.getElementById("repaymentBox");
const interestOnlyBox = document.getElementById("interestOnlyBox");
const radioButtons = document.querySelectorAll('input[name="mortgageType"]');

function updateBackgroundsandBorder() {
    repaymentBox.style.backgroundColor = document.getElementById("repayment").checked ? 'var(--light-lime)' : 'white';
    repaymentBox.style.border = document.getElementById("repayment").checked ? '1.5px solid var(--lime)' : '1px solid var(--slate-500)';
    interestOnlyBox.style.backgroundColor = document.getElementById("interestOnly").checked ? 'var(--light-lime)' : 'white';
    interestOnlyBox.style.border = document.getElementById("interestOnly").checked ? '1.5px solid var(--lime)' : '1px solid var(--slate-500)';
}

radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', updateBackgroundsandBorder);
});

// Initialize the background colors and borders on page load
updateBackgroundsandBorder();

repaymentBox.addEventListener("click", function() {
    document.getElementById("repayment").checked = true;
    updateBackgroundsandBorder();
});

interestOnlyBox.addEventListener("click", function() {
    document.getElementById("interesetOnly").checked = true;
    updateBackgroundsandBorder();
});

repaymentBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        document.getElementById("repayment").checked = true;
        updateBackgroundsandBorder();
    }
});

interestOnlyBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        document.getElementById("interestOnly").checked = true;
        updateBackgroundsandBorder();
    }
});