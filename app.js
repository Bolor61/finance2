//Delgetstei ajillah controller

var uiController = (function () {})();

// Sanhuutei ajillah controller
var financeController = (function () {})();

// programm iig holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. oruulah ugugdliig delegtsees olj avna
    console.log('delegtsees ugugdul avah heseg');

    // 2. olj avsan ugugdluuudee sanhuugiin controllert damjuulj tand hadgalna

    // 3. olj avsan ugugdluudiig web deeree tohitoh hesegt n gargana

    // 4. tusviig tootsoolno

    // 5. etssiin uldegdel delgetsend gargana
  };

  document.querySelector('.add__btn').addEventListener('click', function () {
    ctrlAddItem();
  });

  document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
