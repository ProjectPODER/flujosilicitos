'use strict';

/* Controllers */
angular.module('cargoApp.controllers')
  .controller('homeController', function($rootScope,$scope,cargosFactory, $filter) {
  	$scope.ready= false;
  	
    $scope.autoPersons = [];
  	


  	$scope.activePersons = [];
    $scope.estado = "";
  	$rootScope.observers =[];


  	


  var onDataLoaded = function(){
     console.log('then');
     $scope.estado = "Motor de Visualizacion";
      for (var i = 0; i < $rootScope.observers.length; i++) {
        var observer = $rootScope.observers[i];
        observer();
      };
      $scope.estado = "Listo!";
      $scope.ready= true;
  };

  cargosFactory.load($scope,onDataLoaded);





    $scope.add = function(autoPersona, id){

      $scope.autocomplete = " ";
      autoPersona.agregada = true;
    	
      var person = cargosFactory.getFullPerson(id);
      person.autoPersona = autoPersona;
      $scope.activePersons.push(person);


    	var idPersonas = cargoTimeline.options.filtro.idPersonas;
    	idPersonas.push(person.id);
			var timelineParams = {
			   filtro: { idPersonas: idPersonas },
			   mostrarPor: "cargo",
			};
    	window.cargoTimeline.update(timelineParams);


    };
    $scope.remove = function(person){
    	var indexOf = $scope.activePersons.indexOf(person);
    	if (indexOf > -1){
    		 $scope.activePersons.splice(indexOf, 1);
    	}
      person.autoPersona.agregada = false;
    	indexOf = cargoTimeline.options.filtro.idPersonas.indexOf(person.id);
    	if (indexOf > -1){
    		 cargoTimeline.options.filtro.idPersonas.splice(indexOf, 1);
    	}
    	var idPersonas = cargoTimeline.options.filtro.idPersonas;
			var timelineParams = {
			   filtro: { idPersonas: idPersonas },
			   mostrarPor: "cargo",
			};
    	window.cargoTimeline.update(timelineParams);

    };

    $scope.clearAll = function(){
      for (var i = 0; i < $scope.activePersons.length; i++) {
        $scope.activePersons[i].autoPersona.agregada = false;
      };
      $scope.activePersons = [];
      var idPersonas = [];
      var timelineParams = {
         filtro: { idPersonas: idPersonas },
         mostrarPor: "cargo",
      };
      window.cargoTimeline.update(timelineParams);

    }




  });

