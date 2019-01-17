app.controller('DashboardController', ["$scope", "AuthService", "$location",
        function ($scope, authService, $location) 
        {
            $scope.currentUser = authService.currentUser;
        }
    ] 
);