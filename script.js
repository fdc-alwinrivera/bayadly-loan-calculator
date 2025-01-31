$(document).ready(function() {
    $("#loan-form").on("submit", function(event) {
        event.preventDefault();

        // Get the input values
        const loanAmount = parseFloat($("#loan-amount").val());
        const interestRate = parseFloat($("#interest-rate").val()) / 100; // Monthly interest rate (as decimal)
        const loanTerm = parseInt($("#loan-term").val()); // Loan term in months

        // Check if interest rate is 0% (no interest)
        let monthlyPayment, totalPayment, totalInterest;
        if (interestRate === 0) {
            monthlyPayment = loanAmount / loanTerm; // No interest, just divide loan amount by term
            totalPayment = loanAmount; // Total payment is the same as loan amount
            totalInterest = 0; // No interest
        } else {
            // Calculate the monthly payment with interest
            monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
            totalPayment = monthlyPayment * loanTerm;
            totalInterest = totalPayment - loanAmount;
        }

        // Display the results
        $("#monthly-payment").text(`₱${monthlyPayment.toFixed(2)}`);
        $("#total-payment").text(`₱${totalPayment.toFixed(2)}`);
        $("#total-interest").text(`₱${totalInterest.toFixed(2)}`);

        // Show the results section
        $("#result").fadeIn();
    });
});
