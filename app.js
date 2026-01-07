let transactions = [];
let whatToDo = "";
let nextID = 0;
let type = "";
let amount = 0;
let category = "";
let note = "";
let isValid = true;
let deleteId = 0;

while (true) {
  whatToDo = prompt(
    "=== Budget Tracker ===\nType one option:\nADD - Add a transaction\nLIST - List all transactions\nTOTAL - Show totals (income/expense)\nBALANCE - Show current balance\nDELETE - Delete a transaction\nSEARCH - Search transactions\nEXIT - Exit\n\nYour choice:"
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
        "Please select one of the following (salary/passive income/other)"
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
        "Expense category (food, rent, transport, fuel, utilities, entertainment, health, other):"
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
        console.log(
          `${transactions[i].id}. ${transactions[i].type}  |  ${transactions[i].amount}€  |  ${transactions[i].category}  |  ${transactions[i].note} `
        );
      }
    }
  } else if (whatToDo === "EXIT") {
    alert("Goodbye! Your session has ended.");
    break;
  } else if (whatToDo === "TOTAL") {
    let totalIncome = 0;
    let totalExpense = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "income") {
        totalIncome += transactions[i].amount;
      } else {
        totalExpense += transactions[i].amount;
      }
    }
    console.log(
      "=== Totals ===\nTotal income: " +
        totalIncome +
        "€" +
        "\nTotal expense: " +
        totalExpense +
        "€"
    );
  } else if (whatToDo === "BALANCE") {
    let totalIncome = 0;
    let totalExpense = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "income") {
        totalIncome += transactions[i].amount;
      } else {
        totalExpense += transactions[i].amount;
      }
    }
    let totalBalance = 0;
    totalBalance = totalIncome - totalExpense;
    console.log("=== Balance ===\nBalance: " + totalBalance + "€");
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
        if (searchBy2 === "income") {
          for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].type === "income") {
              console.log(
                `${transactions[i].id}. ${transactions[i].type}  |  ${transactions[i].amount}€  |  ${transactions[i].category}  |  ${transactions[i].note} `
              );
            }
          }
        } else if (searchBy2 === "expense") {
          for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].type === "expense") {
              console.log(
                `${transactions[i].id}. ${transactions[i].type}  |  ${transactions[i].amount}€  |  ${transactions[i].category}  |  ${transactions[i].note} `
              );
            }
          }
        }
      } else if (searchBy === "category") {
      } else {
        alert("Invalid input");
      }
    }
  } else {
    alert("Invalid option. Type: ADD, LIST, TOTAL, BALANCE, DELETE or EXIT.");
  }
}
