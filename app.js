//Delgetstei ajillah controller

var uiController = (function () {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
    incomeList: '.income__list',
    expenseList: '.expenses__list',
    tusuvLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    containerDiv: '.container',
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // inc or exp iig butsaana
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },

    // delegtsend oruulsan utguudiig tseverledeg function
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ',' + DOMstrings.inputValue
      );

      // conver list to Array

      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (el, idex, array) {
        el.value = '';
      });
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = '';
      // }

      // sumiig haana baiglahiig zaadag bih element focus tai bgaa
      fieldsArr[0].focus();
    },

    // tusviig web deer uzuuleh
    tusviigUzuuleh: function (tusuv) {
      document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        tusuv.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        tusuv.totalExp;

      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi;
      }
    },

    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el); // uuriiguu ustgaj bn gesen ug
    },

    addListItem: function (item, type) {
      // Orlogo zarlagiin elementiig aguulsan html iig beltgene

      var html, list;
      if (type === 'inc') {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">$VALUE$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div> ';
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

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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

    tusuv: 0,

    huvi: 0,
  };

  return {
    tusuvTootsooloh: function () {
      // niit orlogiin niilberiig tootsoolno
      calculateTotal('inc');
      // niit zarlagiig tootsoolno
      calculateTotal('exp');

      // tusviig shineer tootsoolno
      data.tusuv = data.totals.inc - data.totals.exp;

      // orlogo zarlagiin % iig tootsoolno
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    // sanhuugiin modylaas orlogo zarlagiig ustgadag function

    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },

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

    if (input.description !== '' && input.value !== '') {
      // 2. olj avsan ugugdluuudee sanhuugiin controllert damjuulj tand hadgalna
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3.olj avsan ugugdluudiig web deeree tohitoh hesegt n gargana
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      // 4. tusviig tootsoolno

      financeController.tusuvTootsooloh();

      // 5. etssiin uldegdel delgetsend gargana
      var tusuv = financeController.tusviigAvah();

      // 6. Tusviin tootsoog delgetsend gargana.
      uiController.tusviigUzuuleh(tusuv);
    }
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

    document
      .querySelector(DOM.containerDiv)
      .addEventListener('click', function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (id) {
          //inc-2
          var arr = id.split('-');
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          console.log(type + ' ==>' + itemId);

          // 1. Sanhuugiin module aas type, id ashiglaad ustgana
          financeController.deleteItem(type, itemId);

          // delgets deerees ene elementiig ustgana
          uiController.deleteListItem(id);

          // uldegdel tootsoog shinechilj haruulna
        }
      });
  };

  return {
    // app iig ehluulhed delegtsen haragdah baidal
    init: function () {
      console.log(' Application started ....');
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
