//*****************BUDGET CONTROLLER****** */

let budgetController = (function() {
  let Expense = function(id, description, val) {
    this.id = id;
    this.description = description;
    this.val = val;
  };

  let Income = function(id, description, val) {
    this.id = id;
    this.description = description;
    this.val = val;
  };

  var totalExpenses = 0;

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    testing: function() {
      console.log(data);
    }
  };
})();

//*****************UICONTROLLER****** */

let UIController = (function() {
  let DOMStrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDesc).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
    },
    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();

//*****************CONTROLLER****** */

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

  let ctrlAddItem = function() {
    let newItem, input;
    input = UICtrl.getInput();

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    console.log(input);
  };

  return {
    init: function() {
      console.log("app started");
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
