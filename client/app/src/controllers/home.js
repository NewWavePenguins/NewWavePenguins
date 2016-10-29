angular.module('home.controllers', ['ui.router', 'myApp.services'])
.controller('homeController', function($scope, $http, Goals) {

  Goals.getGoalsArray().then(function(array){
    $scope.goals = array; 
    console.log('scope.goals',$scope.goals);
  });

//   $scope.goals = [
//   {
//     "id": "5814ee8b79e36cfba0ba72fc",
//     "title": "Learn Piano",
//     "userId": "5814ee4d6a443ff8bf513563",
//     "children": [
//       {
//         "id": "5814eeb779e36cfba0ba72fd",
//         "title": "Take Lessons",
//         "children": [],
//         "completed": false,
//         "goalId": "5814ee8b79e36cfba0ba72fc"
//       },
//       {
//         "id": "5814eec179e36cfba0ba72fe",
//         "title": "Watch Videos",
//         "children": [],
//         "completed": false,
//         "goalId": "5814ee8b79e36cfba0ba72fc"
//       },
//       {
//         "id": "5814eec879e36cfba0ba72ff",
//         "title": "Practice",
//         "children": [
//           {
//             "id": "5814eed379e36cfba0ba7300",
//             "title": "Read Books",
//             "children": [],
//             "completed": false,
//             "goalId": "5814ee8b79e36cfba0ba72fc"
//           },
//           {
//             "id": "5814eedb79e36cfba0ba7301",
//             "title": "Play",
//             "children": [
//               {
//                 "id": "5814eee679e36cfba0ba7302",
//                 "title": "Play Song 1",
//                 "children": [],
//                 "completed": false,
//                 "goalId": "5814ee8b79e36cfba0ba72fc"
//               },
//               {
//                 "id": "5814eee979e36cfba0ba7303",
//                 "title": "Play Song 2",
//                 "children": [],
//                 "completed": false,
//                 "goalId": "5814ee8b79e36cfba0ba72fc"
//               }
//             ],
//             "completed": false,
//             "goalId": "5814ee8b79e36cfba0ba72fc"
//           }
//         ],
//         "completed": false,
//         "goalId": "5814ee8b79e36cfba0ba72fc"
//       }
//     ],
//     "completed": false,
//     "goalId": "5814ee8b79e36cfba0ba72fc"
//   }
// ];
});
