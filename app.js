let transactions = [];
let whatToDo = "";
let nextID = 0;
let type = "";
let amount = 0;
let category = "";
let note = "";
let isValid = true;
let deleteId = 0;

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

function searchByType(transaction, type) {
  const results = [];
  for (let i = 0; i < transaction.length; i++) {
    if (transaction[i].type === type) {
      results.push(transaction[i]);
    }
  }
  return results;
}

function searchByCategory(transaction, category) {
  const results = [];
  for (let i = 0; i < transaction.length; i++) {
    if (transaction[i].category === category) {
      results.push(transaction[i]);
    }
  }
  return results;
}

while (true) {
  whatToDo = prompt(
    "=== Budget Tracker ===\nType one option:\nADD - Add a transaction\nLIST - List all transactions\nTOTAL - Show totals (income/expense)\nBALANCE - Show current balance\nDELETE - Delete a transaction\nSEARCH - Search transactions\nEXIT - Exit\n\nYour choice:",
  )
    .trim()
    .toUpperCase();

  if (whatToDo === "ADD") {
    isValid = true;
    type = prompt("Transaction type (income / expense):").trim().toLowerCase();
    if (type === "income") {
      amount = Number(prompt("Enter amount (positive number):"));
      if (amount <= 0 || isNaN(amount)) {
        alert("Invalid amount. Please enter a number greater than 0.");
        isValid = false;
        continue;
      }
      category = prompt(
        "Please select one of the following (salary/passive income/other)",
      )
        .trim()
        .toLowerCase();
      if (
        category !== "salary" &&
        category !== "passive income" &&
        category !== "other"
      ) {
        alert("Invalid Category. Please enter one of the given category");
        continue;
      }
    } else if (type === "expense") {
      amount = Number(prompt("Enter amount (positive number):"));
      if (amount <= 0 || isNaN(amount)) {
        alert("Invalid amount. Please enter a number greater than 0.");
        isValid = false;
        continue;
      }

      //Category needs to take specific values from an array (food, rent, transport, fuel, utilities, entertainment, health, other)

      category = prompt(
        "Expense category (food, rent, transport, fuel, utilities, entertainment, health, other):",
      )
        .trim()
        .toLowerCase();
      if (category === "") {
        alert("Category is required. Please enter a valid expense category.");
        isValid = false;
        continue;
      }
    } else {
      alert("Invalid type. Please enter 'income' or 'expense'.");
      isValid = false;
    }
    if (isValid) {
      note = prompt("Optional note (press OK to skip):").trim();
      if (note === "") {
        note = "-";
      }
      nextID += 1;
      let transaction = {
        type: type,
        amount: amount,
        category: category,
        note: note,
        id: nextID,
      };

      transactions.push(transaction);
    }
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
      deleteId = Number(prompt("Enter transaction id to delete:"));
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
          "INCOME:\nSalary\nPassive income\nOther\n\nEXPENSE:\nFood\nRent\nTransport\nFuel\nUtilities\nEntertainment\nHealth\nOther",
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
