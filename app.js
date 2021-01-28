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
        type: document.querySelector(DOMstrings.inputType).value, // inc or exp iig butsaana
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },

    addListItem: function (item, type) {
      // Orlogo zarlagiin elementiig aguulsan html iig beltgene

      var html, list;
      if (type === 'inc') {
        list = '.income__list';
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = '.expenses__list';
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> ';
      }
      // ter html dotoroo orlogo zarlagiin utguudiig replace ashiglaj uurchilj ugnu
      html = html.replace('%id%', item.id);
      html = html.replace('%DESCRIPTION%', item.description);
      html = html.replace('$VALUE$', item.value);

      // beltgesen html ee DOM ruu hiij ugnu

      document.querySelector(list).insertAdjacentHTML('beforeend', html);
    },
  };
})();

// Sanhuutei ajillah controller
var financeController = (function () {
  // baiguulagch function ashiglaad object hiie

  //private function
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //private function
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //private data

  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, desc, val) {
      var item;
      var id;

      // id = identification massive dotor buh zarlaguudaa hiisen bgaa shineer zarlaga orj irehed masssive iin idnuudiin hamgiin suuliinhiin n id g abad 1 iig nemj yavahaar hiie
      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if (type === 'inc') {
        item = new Income(id, desc, val);
      } else {
        //type === exp
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);

      return item;
    },

    seeData: function () {
      return data;
    },
  };
})();

// programm iig holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. oruulah ugugdliig delegtsees olj avna
    var input = uiController.getInput();

    // 2. olj avsan ugugdluuudee sanhuugiin controllert damjuulj tand hadgalna
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );

    // 3.olj avsan ugugdluudiig web deeree tohitoh hesegt n gargana
    uiController.addListItem(item, input.type);

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
