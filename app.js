//Delgetstei ajillah controller

var uiController = (function () {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// Sanhuutei ajillah controller
var financeController = (function () {
  // baiguulagch function ashiglaad object hiie

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

// programm iig holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. oruulah ugugdliig delegtsees olj avna
    console.log(uiController.getInput());

    // 2. olj avsan ugugdluuudee sanhuugiin controllert damjuulj tand hadgalna
    //olj avsan ugugdluudiig web deeree tohitoh hesegt n gargana

    // 3.

    // 4. tusviig tootsoolno

    // 5. etssiin uldegdel delgetsend gargana
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener('click', function () {
      ctrlAddItem();
    });

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log(' Application started ....');
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
