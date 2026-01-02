let transactions = [];
let whatToDo = "";
let nextID = 0;
let type = "";
let amount = 0;
let category = "";
let note = "";
let isValid = true;

while (true) {
  whatToDo = prompt(
    "Tell me what to do: '1.Add transaction (ADD)' , '2.List transactions (LIST)' ,'3.Balance (BALANCE)' ,'4.Total (TOTAL)' , '5.Exit(EXIT)'"
  )
    .trim()
    .toUpperCase();

  if (whatToDo === "ADD") {
    isValid = true;
    type = prompt("What type do you want to add? ('income' or 'expense')")
      .trim()
      .toLowerCase();
    if (type === "income") {
      amount = Number(prompt("Write the amount you gained"));
      if (amount <= 0 || isNaN(amount)) {
        alert("you gave a negative number or zero");
        isValid = false;
        continue;
      }
      category = "income";
    } else if (type === "expense") {
      amount = Number(prompt("Write the amount you spend"));
      if (amount <= 0 || isNaN(amount)) {
        alert("you gave a negative number or zero");
        isValid = false;
        continue;
      }
      category = prompt(
        "What category did you spend? (food, rent, gifts, fuel, other)"
      ).trim();
      if (category === "") {
        alert("You didnt specify the category");
        isValid = false;
        continue;
      }
    } else {
      alert("Invalid value.");
      isValid = false;
    }
    if (isValid) {
      note = prompt("Do you want to leave a note?");
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
      console.log("No transactions yet");
    } else {
      for (let i = 0; i < transactions.length; i++) {
        console.log(
          `${transactions[i].id}. ${transactions[i].type}, ${transactions[i].amount}, ${transactions[i].category}, ${transactions[i].note} `
        );
      }
    }
  } else if (whatToDo === "EXIT") {
    alert("You exited the app");
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
      "Your Total icome is: " +
        totalIncome +
        "\n" +
        "Your Total expenses are: " +
        totalExpense
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
    console.log("Your Balance is: " + totalBalance);
  } else {
    alert("Invalid option");
  }
}
