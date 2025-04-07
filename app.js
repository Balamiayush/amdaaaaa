// Function to calculate the currency breakdown for a given amount
function breakdown() {
  // Define the available denominations in descending order
  const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

  // Prompt the user to enter the amount
  let amount = parseInt(prompt("Enter the amount:"));

  // Validate the input amount
  if (isNaN(amount) || amount <= 0) {
    // Display an error message if the input is invalid
    alert("Please enter a valid amount.");
    return;
  }

  // Initialize the result string
  let result = "Currency Breakdown:\n";

  // Iterate over each denomination
  denominations.forEach(note => {
    // Calculate the count of the current denomination
    const count = Math.floor(amount / note);

    // If the count is greater than 0, add it to the result string
    if (count > 0) {
      result += `${note} x ${count}\n`;
      // Update the remaining amount
      amount %= note;
    }
  });

  // Display the currency breakdown
  alert(result);
}

// Call the breakdown function
breakdown()