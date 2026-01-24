const transactions = [];
let nextID = 0;

const incomeCategories = ["Salary", "Passive Income", "Other"];

const expenseCategories = [
  "Housing",
  "Utilities",
  "Food",
  "Eating Out",
  "Transportation",
  "Bills",
  "Subscriptions",
  "Health",
  "Entertainment",
  "Shopping",
  "Other",
];

function calculateTotals(transactions) {
  let totalIncome = 0;
  let totalExpense = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      totalIncome += transactions[i].amount;
    } else if (transactions[i].type === "expense") {
      totalExpense += transactions[i].amount;
    }
  }

  let balance = totalIncome - totalExpense;

  return {
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    totalBalance: balance,
  };
}

function formatTransaction(transaction) {
  return `${transaction.id}. ${transaction.type} | ${transaction.amount}€ | ${transaction.category} | ${transaction.note}`;
}

function searchByType(transactions, type) {
  const results = [];
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === type) {
      results.push(transactions[i]);
    }
  }
  return results;
}

function searchByCategory(transactions, category) {
  const results = [];
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].category === category) {
      results.push(transactions[i]);
    }
  }
  return results;
}

function validCategories(userInput) {
  for (let i = 0; i < incomeCategories.length; i++) {
    if (
      userInput === incomeCategories[i].trim().toLowerCase() ||
      userInput === expenseCategories[i].trim().toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

function add(categories) {
  const amount = Number(prompt("Enter amount (positive number):"));
  if (amount <= 0 || isNaN(amount)) {
    alert("Invalid amount. Please enter a number greater than 0.");
    return false;
  }
  const category = prompt(
    `Please select one of the following (${categories.join("/ ")})`,
  )
    .trim()
    .toLowerCase();
  if (!validCategories(category)) {
    alert("Invalid Category. Please enter one of the given category");
    return false;
  }
  let note = prompt("Optional note (press OK to skip):").trim();
  if (note === "") note = "-";
  return { amount: amount, category: category, note: note };
}

while (true) {
  let whatToDo = prompt(
    "=== Budget Tracker ===\nType one option:\nADD - Add a transaction\nLIST - List all transactions\nTOTAL - Show totals (income/expense)\nBALANCE - Show current balance\nDELETE - Delete a transaction\nSEARCH - Search transactions\nEXIT - Exit\n\nYour choice:",
  )
    .trim()
    .toUpperCase();

  if (whatToDo === "ADD") {
    let type = prompt("Transaction type (income / expense):")
      .trim()
      .toLowerCase();
    let categories = null;
    if (type === "income") categories = incomeCategories;
    else if (type === "expense") categories = expenseCategories;
    else {
      alert("Invalid type. Please enter 'income' or 'expense'.");
      continue;
    }
    const details = add(categories);
    if (!details) continue;

    nextID += 1;
    const transaction = {
      type: type,
      ...details,
      id: nextID,
    };

    transactions.push(transaction);
  } else if (whatToDo === "LIST") {
    if (transactions.length === 0) {
      console.log("=== Transactions ===\nNo transactions yet.");
    } else {
      console.log("=== Transactions ===");
      for (let i = 0; i < transactions.length; i++) {
        console.log(formatTransaction(transactions[i]));
      }
    }
  } else if (whatToDo === "EXIT") {
    alert("Goodbye! Your session has ended.");
    break;
  } else if (whatToDo === "TOTAL") {
    let totals = calculateTotals(transactions);
    console.log(
      "=== Totals ===\nTotal income: " +
        totals.totalIncome +
        "€" +
        "\nTotal expense: " +
        totals.totalExpense +
        "€",
    );
  } else if (whatToDo === "BALANCE") {
    let totals = calculateTotals(transactions);
    console.log("=== Balance ===\nBalance: " + totals.totalBalance + "€");
  } else if (whatToDo === "DELETE") {
    let found = false;
    if (transactions.length === 0) {
      alert("No transactions to delete");
      continue;
    } else {
      let deleteId = Number(prompt("Enter transaction id to delete:"));
      if (deleteId <= 0 || isNaN(deleteId)) {
        alert("Plese give a valid ID");
        continue;
      }
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id === deleteId) {
          transactions.splice(i, 1);
          found = true;
          break;
        }
      }
      if (found) {
        alert("Transaction #" + deleteId + " deleted");
      } else {
        alert("Invalid ID number");
      }
    }
  } else if (whatToDo === "SEARCH") {
    let searchBy = "";
    let searchBy2 = "";
    if (transactions.length === 0) {
      alert("No transactions to search");
      continue;
    } else {
      searchBy = prompt("Search by: Type or Category?").trim().toLowerCase();
      if (searchBy === "type") {
        searchBy2 = prompt("Search by: Income or Expense?")
          .trim()
          .toLowerCase();
        let results = searchByType(transactions, searchBy2);
        if (results.length === 0) {
          alert("No matching transactions found");
        } else {
          for (let i = 0; i < results.length; i++) {
            console.log(formatTransaction(results[i]));
          }
        }
      } else if (searchBy === "category") {
        searchBy2 = prompt(
          `INCOME:\n${incomeCategories.join("\n")}\n\nEXPENSE:\n${expenseCategories.join("\n")}`,
        )
          .trim()
          .toLowerCase();
        let results = searchByCategory(transactions, searchBy2);
        if (results.length === 0) {
          alert("No matching transactions found");
        } else {
          for (let i = 0; i < results.length; i++) {
            console.log(formatTransaction(results[i]));
          }
        }
      } else {
        alert("Invalid input");
      }
    }
  } else {
    alert("Invalid option. Type: ADD, LIST, TOTAL, BALANCE, DELETE or EXIT.");
  }
}
