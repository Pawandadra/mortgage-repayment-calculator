document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('mortgageForm');
    const resultContainer = document.getElementById('resultContainer');
    const emptyContainer = document.getElementById('emptyContainer');
    const amountErr = document.getElementById('amountErr');
    const yearsErr = document.getElementById('yearsErr');
    const interestErr = document.getElementById('interestErr');
    const typeErr = document.getElementById('typeErr');
    const repaymentBox = document.getElementById("repaymentBox");
    const interestOnlyBox = document.getElementById("interestOnlyBox");
    const radioButtons = document.querySelectorAll('input[name="mortgageType"]');


    amountErr.style.display = "none";  
    yearsErr.style.display = "none";   
    interestErr.style.display = "none"; 
    typeErr.style.display = "none";
    emptyContainer.style.display = 'grid';
    resultContainer.style.display = 'none';

    // Changing Background of box when radio button is active
    function updateBackgroundsandBorder() {
        repaymentBox.style.backgroundColor = document.getElementById("repayment").checked ? 'var(--lightest-lime)' : 'white';
        repaymentBox.style.border = document.getElementById("repayment").checked ? '1.9px solid var(--lime)' : '1px solid var(--slate-300)';
        interestOnlyBox.style.backgroundColor = document.getElementById("interestOnly").checked ? 'var(--lightest-lime)' : 'white';
        interestOnlyBox.style.border = document.getElementById("interestOnly").checked ? '1.9px solid var(--lime)' : '1px solid var(--slate-300)';
    }

    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', updateBackgroundsandBorder);
    });

    // Initialize the background colors and borders on page load
    updateBackgroundsandBorder();

    repaymentBox.addEventListener("click", function () {
        document.getElementById("repayment").checked = true;
        updateBackgroundsandBorder();
    });

    interestOnlyBox.addEventListener("click", function () {
        document.getElementById("interestOnly").checked = true;
        updateBackgroundsandBorder();
    });

    repaymentBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            document.getElementById("repayment").checked = true;
            updateBackgroundsandBorder();
        }
    });

    interestOnlyBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            document.getElementById("interestOnly").checked = true;
            updateBackgroundsandBorder();
        }
    });


    // Error Handling Block

    function showError(errElement, classNo, spanId) {
        errElement.style.display = "block";
        document.getElementsByClassName("sideEle")[classNo].style.border = "1px solid var(--red)";
        document.getElementById(spanId).style.backgroundColor = "var(--red)";
        document.getElementById(spanId).style.color = "white";
    }

    document.getElementById("calculate-btn").addEventListener('click', (e) => {
        e.preventDefault();
        let isValid = true;


        const mortgageAmount = document.getElementById('mortgageAmount').value.trim();
        const mortgageTerm = document.getElementById('mortgageTerm').value.trim();
        const interestRate = document.getElementById('interestRate').value.trim();
        const mortgageType = document.querySelector('input[name="mortgageType"]:checked');

        // Hide all error messages initially
        amountErr.style.display = "none";
        yearsErr.style.display = "none";
        interestErr.style.display = "none";
        typeErr.style.display = "none";

        // Validate inputs and display error messages if necessary
        if (!mortgageAmount) {
            showError(amountErr, 0, "pound");
            isValid = false;
        }

        if (!mortgageTerm) {
            showError(yearsErr, 1, "years");
            isValid = false;
        }

        if (!interestRate) {
            showError(interestErr, 2, "percentage");
            isValid = false;
        }

        if (!mortgageType) {
            typeErr.style.display = "block";
            isValid = false;
        }

        // If the form is valid, display the result container
        if (isValid) {
            emptyContainer.style.display = 'none';
            resultContainer.style.display = 'block';
            result(mortgageAmount, mortgageTerm, interestRate, mortgageType.value);
        }
    });

    form.addEventListener('reset', () => {
        // Reset form and display empty container
        emptyContainer.style.display = 'grid';
        resultContainer.style.display = 'none';

        amountErr.style.display = "none";
        yearsErr.style.display = "none";
        interestErr.style.display = "none";
        typeErr.style.display = "none";

        document.getElementsByClassName("sideEle")[0].style.border = "";
        document.getElementById("pound").style.backgroundColor = "";
        document.getElementById("pound").style.color = "";
        document.getElementsByClassName("sideEle")[1].style.border = "";
        document.getElementById("years").style.backgroundColor = "";
        document.getElementById("years").style.color = "";
        document.getElementsByClassName("sideEle")[2].style.border = "";
        document.getElementById("percentage").style.backgroundColor = "";
        document.getElementById("percentage").style.color = "";

        repaymentBox.style.backgroundColor = 'white';
        repaymentBox.style.border = '1px solid var(--slate-300)';
        interestOnlyBox.style.backgroundColor = 'white';
        interestOnlyBox.style.border = '1px solid var(--slate-300)';

    });

    // Result

    const result = (mortgageAmount, mortgageTerm, interestRate, type) => {
        let amount = parseInt(mortgageAmount);
        let noOfYears = parseInt(mortgageTerm);
        let interest = parseFloat(interestRate);
        let monthlyPayment = 0;
        let totalValue = 0;

        if(amount < 0){
            showNotification("Mortgage Amount", "negative");
        } else if(noOfYears <= 0){
            showNotification("Mortgate Term", "zero or negative");
        } else if(interest < 0){
            showNotification("Interest Rate", "negative");
        }
        else if(type === "repayment"){
            let n = noOfYears * 12;  // n => number of months in total time period
            if(interest == 0){
                monthlyPayment = (amount/n);
                totalValue = amount;
            } else {
            let r = parseFloat(((interest/100) / 12).toFixed(10));    //r => monthly rate interest)
            monthlyPayment = (amount * (r * Math.pow((1+r), n)) / (Math.pow((1+r), n)-1));
            totalValue = monthlyPayment * n;
            }
        } else {
            monthlyPayment = (amount * ((interest / 100) / 12));
            totalValue = monthlyPayment * noOfYears * 12;
        }
        document.getElementById('monthlyPayment').innerHTML = "£" + numberWithCommas(monthlyPayment.toFixed(2));
        document.getElementById('totalAmount').innerHTML = "£" + numberWithCommas(totalValue.toFixed(2));
    }

    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    //Input Number Error Msg

    function showNotification(element, errType) {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.id = 'toastMsg';
        toast.innerHTML = `
            <span id="main">
                <span id="toastHeading">Error!</span>
            </span>
            <p id="toastSubheading"> <b>${element}</b> Can't be <b>${errType}</b></p>
        `;  
        toastContainer.appendChild(toast);

        setTimeout(function() {
            toast.style.top = '2rem';
        }, 100);
    
        setTimeout(function() {
            toast.style.top = '-7rem';
            setTimeout(function() {
                toast.remove();
            },500); 
        }, 3000);
    }
});