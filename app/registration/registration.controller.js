app.controller('RegistrationController', ["$scope", 'AuthService', '$location', 'UserFactoryService',
        function ($scope, authService, $location, userFactoryService) 
        {
            /**
             * Register a new user with the application
             * 
             * @author: cognophile
             * @return: boolean | void
             */
            $scope.Register = function () 
            {
                if (!$scope.username || !$scope.firstname ||
                    !$scope.surname || !$scope.password || 
                    !$scope.passwordConfirm || !$scope.address) {
                    notify("Oops!", "All fields need to be completed to save your account changes.");
                    return false;
                }

                if (authService.VerifyUsername($scope.username) === false) {
                    notify('Oops!', 'This username already exists - please select another!');
                    return false;
                }

                if ($scope.password !== $scope.passwordConfirm) {
                    notify("Oops!', 'Passwords don't match! Please enter matching passwords to register.");
                    return false;
                } 
                
                var newUser = userFactoryService.CreateDefaultUser(
                    $scope.username, $scope.firstname, 
                    $scope.surname, $scope.password, 
                    $scope.address
                );
                
                try { 
                    authService.AutoLoginSaveUser(newUser);
                    notify("Success!", "Thanks for registering, " + newUser.firstname + " " + newUser.surname + "! Your account (" + newUser.username + ") has been registered.");
                    $location.path('/dashboard');
                } catch (ex) {
                    console.log('RegistrationController/ProcessRegistration: Exception - ', ex);
                    notify("Oops!", "We don't seem to be able to register you right now, please try again later.");
                }            
            };

            /**
             * Retrieve registered users 
             * @return: Array
             */
            $scope.GetUsers = function() {
                return authService.GetUsers();
            }
        }
    ]
);