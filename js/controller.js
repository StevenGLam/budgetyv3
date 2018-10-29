let controller = (function(budgetCtrl, UICtrl) {
  var setUpEventListeners = function() {
    let DOM = UICtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", e => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };
  let updateBudget = () => {
    budgetCtrl.calculateBudget();
    let budget = budgetCtrl.getBudget();
    console.log(budget);
    UICtrl.displayBudget(budget);
  };
  let ctrlAddItem = function() {
    var newItem, input;
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //console.log(input);
      UICtrl.addListItem(newItem, input.type);

      UICtrl.clearFields();

      updateBudget();
    }
  };

  return {
    init: function() {
      console.log("app started");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0
      });
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
