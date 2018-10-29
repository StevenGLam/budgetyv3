let UIController = (function() {
  let DOMStrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDesc).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },
    addListItem: function(obj, type) {
      let html, newHtml, element;

      if (type === "inc") {
        element = DOMStrings.incomeContainer;
        html = `<div class="item clearfix" id="income-%id%">
      <div class="item__description">%description%</div>
      <div class="right clearfix">
          <div class="item__value">%value%</div>
          <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
  </div>`;
      } else if (type === "exp") {
        element = DOMStrings.expenseContainer;
        html = `<div class="item clearfix" id="expense-%id%">
      <div class="item__description">%description%</div>
      <div class="right clearfix">
          <div class="item__value">%value%</div>
          <div class="item__percentage">21%</div>
          <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
  </div>`;
      }

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields() {
      let fields = document.querySelectorAll(
        `${DOMStrings.inputDesc}, ${DOMStrings.inputValue}`
      );

      let fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach((field, i) => (field.value = ""));
      fieldsArr[0].focus();
    },
    displayBudget(obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;

      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;

      document.querySelector(DOMStrings.expenseLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = `
        ${obj.percentage}%`;
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = "---";
      }
    },
    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();
