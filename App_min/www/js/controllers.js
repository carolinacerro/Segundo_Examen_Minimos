angular.module('starter.controllers', [])

.constant('ApiEndpoint', {
    url: 'http://localhost:8080/api'
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})



    .controller('homeCtrl', function($scope, $http, ApiEndpoint, $ionicPopup) {


  $scope.newStudent = {};
  $scope.selected = false;


  $scope.registrarAlumno = function() {
    $http.post(ApiEndpoint.url + '/student', $scope.newStudent)
      .success(function(data) {
        $scope.newStudent = {};

        $scope.students = data;
        var alertPopup = $ionicPopup.alert({
          title: 'Alerta',
          template: 'Registrado OK!'
        });
      })
      .error(function(data) {
        console.log('Error: ' + data);
        var alertPopup = $ionicPopup.alert({
          title: 'Alerta',
          template: '¡Faltan Datos o los Datos no son correctos!'
        });
      });
  };

})


.controller('subjectsCtrl', function($scope, $http, ApiEndpoint) {

  $scope.newSubject = {};
  $scope.subjects = {};


  $http.get(ApiEndpoint.url + '/subject').success(function(data) {
    $scope.subjects = data;

  })
    .error(function(data) {

    });


  $scope.addSubject = function() {
    $http.post(ApiEndpoint.url + '/subject', $scope.newSubject)
      .success(function(data) {
        $scope.newSubject = {};
        $scope.subjects = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };


  $scope.deleteSubject = function(id) {
    $http.delete(ApiEndpoint.url + '/subject/' + id)
      .success(function(data) {
        $scope.newSubject = {};
        $scope.subjects = data;
        $scope.selected = false;

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

})

.controller('subjectsDetailCtrl', function($scope, $http, ApiEndpoint, $state, $ionicPopup) {


  $scope.updatedSubject = {};
  $scope.studentsList = {};
  $scope.subject = {};
  $scope.subjectID = ($state.params.subjectId);
  console.log($scope.subjectID);
  var liststudents = [];


  $http.get(ApiEndpoint.url + '/subject/' + $scope.subjectID)
    .success(function(data) {
      $scope.subject = data;
      console.log($scope.subject);


      angular.forEach($scope.subject.students, function(student, key) {

          $http.get(ApiEndpoint.url + '/student/' + student)
            .success(function(data) {
              $scope.student = data;
              liststudents.push($scope.student);
              $scope.studentsList = liststudents;

            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
      });

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });


  $scope.addStudent = function() {
    console.log($scope.subjectID);
    console.log($scope.newStudent);
    $http.post(ApiEndpoint.url + '/subject/' + $scope.subjectID, $scope.updatedSubject)
      .success(function(data) {
        $scope.subject = data;
        $state.reload();

        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: 'Todo OK!'
        });
      })
      .error(function(data) {
        console.log('Error: ' + data);
        var alertPopup = $ionicPopup.alert({
          title: 'Alert',
          template: 'No tenemos al Estudiante en la base de datos'
        });
      });
  };

})

.controller('studentsCtrl', function($scope, $http, ApiEndpoint) {

  $scope.students = {};


  $http.get(ApiEndpoint.url + '/student').success(function(data) {
    $scope.students = data;

  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

})

.controller('studentsDetailCtrl', function($scope, $http, ApiEndpoint, $state) {


  $scope.studentID = ($state.params.studentId);
  console.log($scope.studentID);


  $http.get(ApiEndpoint.url + '/student/' + $scope.studentID)
    .success(function(data) {
      $scope.student = data;

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });


  $scope.remove = function(id) {
    $http.delete(ApiEndpoint.url + '/student/' + id)
      .success(function(data) {
        $state.go('app.students');
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };


});
