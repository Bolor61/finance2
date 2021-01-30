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
    expensePercentageLabel: '.item__percentage',
    dateLabel: '.budget__title--month',
  };

  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function (too, type) {
    too = '' + too;
    var x = too.split('').reverse().join('');
    var y = '';
    var count = 1;
    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ',';
      count++;
    }
    var z = y.split('').reverse().join('');

    if (z[0] === ',') z = z.substr(1, z.length - 1);

    if (type === 'inc') z = '+ ' + z;
    else z = '- ' + z;

    return z;
  };

  return {
    displayDate: function () {
      var today = new Date();
      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      document.querySelector(DOMstrings.dateLabel).textContent =
        months[today.getMonth()] + ' ' + today.getFullYear();
    },

    changeType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ' ,' +
          DOMstrings.inputDescription +
          ' , ' +
          DOMstrings.inputValue
      );

      nodeListForeach(fields, function (el) {
        el.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.addBtn).classList.toggle('red');
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // inc or exp iig butsaana
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    displayPercentages: function (allPercentages) {
      // Zarlagiin NodeList iig oloh (dom iin 1 elelmentiig buyu 1 tag iig node gej nerledeg)
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );

      // Element bolgonii % d zarlagiin %iig massivaas avch shivj oruulah
      nodeListForeach(elements, function (el, index) {
        el.textContent = allPercentages[index];
      });
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
      var type;
      if (tusuv.tusuv > 0) type = 'inc';
      else type = 'exp';

      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        'inc'
      );
      document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(
        tusuv.totalExp,
        'exp'
      );

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
      html = html.replace('$VALUE$', formatMoney(item.value, type));

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
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
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
      if (data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huvi = 0;
    },

    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPercentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });

      return allPercentages;
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

      // Tusviig shineer tootsoolood delgetsend uzuulne
      updateTusuv();
    }
  };

  var updateTusuv = function () {
    // 4. tusviig tootsoolno

    financeController.tusuvTootsooloh();

    // 5. etssiin uldegdel delgetsend gargana
    var tusuv = financeController.tusviigAvah();

    // 6. Tusviin tootsoog delgetsend gargana.
    uiController.tusviigUzuuleh(tusuv);

    // 7. elementuudiin % iig tootsolono
    financeController.calculatePercentages();

    //8. elementuudiin tootsoolson %iig huleej avna
    var allPercentages = financeController.getPercentages();

    //9. Edgeer % iif delgetsend gargana
    uiController.displayPercentages(allPercentages);
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
      .querySelector(DOM.inputType)
      .addEventListener('change', uiController.changeType);

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

          //2. delgets deerees ene elementiig ustgana
          uiController.deleteListItem(id);

          //3.  uldegdel tootsoog shinechilj haruulna
          // Tusviig shineer tootsoolood delgetsend uzuulne
          updateTusuv();
        }
      });
  };

  return {
    // app iig ehluulhed delegtsen haragdah baidal
    init: function () {
      console.log(' Application started ....');
      uiController.displayDate();
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
