var app = angular.module("dartsScore", []);
// var app = angular.module('dartsScore', ['ngAnimate']);

app.controller("firstCtrl", function($scope, $rootScope) {
  $scope.player1;
  $scope.player2;
  $scope.selectgame;
  $scope.selectrounds;
  $scope.submit = function() {
    $rootScope.$broadcast('myEvent', {
      myPlayer1: $scope.player1 || 'Player 1',
      myPlayer2: $scope.player2 || 'Player 2',
      selectedGame: $scope.selectgame,
      myPlayer1Score: $scope.selectgame,
      myPlayer2Score: $scope.selectgame,
      selectRounds :$scope.selectrounds
    })
    $scope.onsubmit = true;
  }
  $scope.$on('clickToMenu', function(event, message) {
    $scope.onsubmit = false;
  })
});

app.controller("secondCtrl", function($scope, $rootScope) {
  var i = 1;
  $scope.selectRounds;
  $scope.wins1 = 0;
  $scope.wins2 = 0;
  $scope.myPlayer1;
  $scope.myPlayer2;
  $scope.selectedGame;
  $scope.myPlayer1Score;
  $scope.myPlayer1Score;
  $scope.selectRounds;
  $scope.firstPlayer = "player_score_active";

  $scope.$on('myEvent', function(event, message) {
    $scope.onsubmit = true;
    $scope.gamesettings = true;
    $scope.selectedGame = message.selectedGame;
    $scope.myPlayer1 = message.myPlayer1;
    $scope.myPlayer2 = message.myPlayer2;
    $scope.myPlayer1Score = message.myPlayer1Score;
    $scope.myPlayer2Score = message.myPlayer2Score;
    $scope.selectRounds = message.selectRounds;
  })

  $scope.goToMenu = function() {
    $rootScope.$broadcast('clickToMenu', {});
    $scope.onsubmit = false;
    $scope.number = '';
    $scope.myPlayer1Score = '';
    $scope.myPlayer2Score = '';
  }

  $scope.deleteNumber = function() {
    $scope.number = '';
  }

  $scope.claculateScore = function() {
    if (i % 2 != 0 ) {
      if ( $scope.myPlayer1Score - $scope.number < 0 ) {
        $scope.number = '';
        alert('This is not a posible score!');
        $scope.firstPlayer = "";
        $scope.secondPlayer = "player_score_active";
      } else {
        $scope.myPlayer1Score = $scope.myPlayer1Score - $scope.number;
        $scope.number = '';
        $scope.firstPlayer = "";
        $scope.secondPlayer = "player_score_active";
      }
    } else {
      if ( $scope.myPlayer2Score - $scope.number < 0 ) {
        $scope.number = '';
        $scope.firstPlayer = "player_score_active";
        $scope.secondPlayer = "";
        alert('This is not a posible score!');
      } else {
        $scope.myPlayer2Score = $scope.myPlayer2Score - $scope.number;
        $scope.number = '';
        $scope.firstPlayer = "player_score_active";
        $scope.secondPlayer = "";
      }
    }
    i++

    if ( $scope.myPlayer1Score === 0) {
      alert( $scope.myPlayer1 + ' win!');
      $scope.myPlayer1Score = $scope.selectedGame;
      $scope.myPlayer2Score = $scope.selectedGame;
      $scope.wins1 = $scope.wins1 + 1;
    } else if ( $scope.myPlayer2Score  === 0 ) {
      alert( $scope.myPlayer2 + ' win!');
      $scope.myPlayer1Score = $scope.selectedGame;
      $scope.myPlayer2Score = $scope.selectedGame;
      $scope.wins2 = $scope.wins2 + 1;
    }

    if ( $scope.wins1 == $scope.selectRounds ) {
      alert('Winer! ' + $scope.myPlayer1 + ' has won the game!' );
      $rootScope.$broadcast('clickToMenu', {});
      $scope.onsubmit = false;
      $scope.myPlayer1Score = '';
      $scope.myPlayer2Score = '';
      $scope.wins1 = 0;
      $scope.wins2 = 0;
    } else if ($scope.wins2 == $scope.selectRounds) {
      alert('Winer! ' + $scope.myPlayer2 + ' has won the game!' );
      $rootScope.$broadcast('clickToMenu', {});
      $scope.onsubmit = false;
      $scope.myPlayer1Score = '';
      $scope.myPlayer2Score = '';
      $scope.wins1 = 0;
      $scope.wins2 = 0;
    }
  }
});
