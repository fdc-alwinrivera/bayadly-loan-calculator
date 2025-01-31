$(document).ready(function() {
    $("#loan-form").on("submit", function(event) {
        event.preventDefault();

        // Get the input values
        const loanAmount = parseFloat($("#loan-amount").val());
        const interestRate = parseFloat($("#interest-rate").val()) / 100; // Monthly interest rate (as decimal)
        const loanTerm = parseInt($("#loan-term").val()); // Loan term in months

        // Calculate the monthly payment
        const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
        
        // Calculate total payment and total interest
        const totalPayment = monthlyPayment * loanTerm;
        const totalInterest = totalPayment - loanAmount;

        // Display the results
        $("#monthly-payment").text(`₱${monthlyPayment.toFixed(2)}`);
        $("#total-payment").text(`₱${totalPayment.toFixed(2)}`);
        $("#total-interest").text(`₱${totalInterest.toFixed(2)}`);

        // Show the results section
        $("#result").fadeIn();
    });
});
