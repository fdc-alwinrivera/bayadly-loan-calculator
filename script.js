$(document).ready(function() {
    $("#loan-form").on("submit", function(event) {
        event.preventDefault();

        // Get the input values
        const loanAmount = parseFloat($("#loan-amount").val());
        const interestRate = parseFloat($("#interest-rate").val()) / 100; // Convert to decimal
        const loanTerm = parseInt($("#loan-term").val());

        // Clear previous error messages
        $(".error-message").remove();
        
        let hasError = false;

        // Validation function
        function validateInput(selector, value, message) {
            if (isNaN(value) || value <= 0) {
                $(selector).after(`<p class="error-message" style="color: red;">${message}</p>`);
                hasError = true;
            }
        }

        // Validate inputs
        validateInput("#loan-amount", loanAmount, "Enter a valid loan amount.");
        validateInput("#interest-rate", interestRate * 100, "Enter a valid interest rate.");
        validateInput("#loan-term", loanTerm, "Enter a valid loan term.");

        // If there's an error, stop and hide the results
        if (hasError) {
            $("#result").hide();
            return;
        }

        // Calculate the loan payments
        let monthlyPayment, totalPayment, totalInterest;
        if (interestRate === 0) {
            monthlyPayment = loanAmount / loanTerm;
            totalPayment = loanAmount;
            totalInterest = 0;
        } else {
            monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
            totalPayment = monthlyPayment * loanTerm;
            totalInterest = totalPayment - loanAmount;
        }

        // Display results
        $("#monthly-payment").text(`₱${monthlyPayment.toFixed(2)}`);
        $("#total-payment").text(`₱${totalPayment.toFixed(2)}`);
        $("#total-interest").text(`₱${totalInterest.toFixed(2)}`);

        // Show results section
        $("#result").fadeIn();
    });
});
