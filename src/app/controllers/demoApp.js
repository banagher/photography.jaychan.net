'use strict';

var demoApp = angular.module('demoApp', ['ngRoute']);

var controllers = {};

demoApp.config(function($routeProvider) {

	$routeProvider
		.when('/view1', {
			controller: 'simpleController',
			templateUrl: 'partials/view1.html'
		})
		.when('/view2', {
			controller: 'simpleController',
			templateUrl: 'partials/view2.html'
		})
		.otherwise({ redirectTo: '/view1.html' });
});

demoApp.factory('simpleFactory', function() {
	var customers = [
		{ name: 'Alan Chan', city: 'Perth' },
		{ name: 'Jacky Chan', city: 'Sydney' },
		{ name: 'Sonny Chan', city: 'Melbourne' },
		{ name: 'Raymond Chan', city: 'Brisbane' }
	];

	var factory = {};
	factory.getCustomers = function() {
		return customers;
	};
	/*	factory.postCustomer = function(customer) {
		}
	*/

	return factory;
});

controllers.simpleController = function($scope, simpleFactory) {
	$scope.customers = [];

	init();

	function init() {
		$scope.customers = simpleFactory.getCustomers();
	}

	$scope.addCustomer = function() {
		console.log('pushed');
		$scope.customers.push(
			{
				name: $scope.newCustomer.name,
				city: $scope.newCustomer.city
			});
	};
};

demoApp.controller(controllers);

/*demoApp.controller('simpleController', function($scope) {
	$scope.customers = [
		{ name: 'Alan Chan', city: 'Perth' },
		{ name: 'Jacky Chan', city: 'Sydney' },
		{ name: 'Sonny Chan', city: 'Melbourne' },
		{ name: 'Raymond Chan', city: 'Brisbane' }
	];

	$scope.addCustomer = function() {
		console.log('pushed');
		$scope.customers.push(
			{
				name: $scope.newCustomer.name,
				city: $scope.newCustomer.city
			});
	};
});*/
