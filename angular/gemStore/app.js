(function(){
  var app = angular.module('gemStore', []);

  app.controller('StoreController', function(){
    this.product = gems;
  });

  var gems = [
    {
    name: 'Dodecahedron',
    price: 2.95,
    description: 'Some gems have hidden qualities beyond their lusture, beyond their shine.. Dodeca is one of those gem.',
    canPurchase: false
  },
  {
    name: 'Polyhedron',
    price: 6.25,
    description: '..',
    canPurchase: false
  }
];
  app.controller('PanelController', function(){
    this.tab = 1;

    this.selectTab = function(setTab){
      this.tab = setTab;
    }

    this.isSelected = function(checkTab){
      return this.tab === checkTab;
    }
});
})();
