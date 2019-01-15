app.controller('UserProfileController', ["$scope", "AuthService", "UserFactoryService", 'Flash', "$http", "$route",
        function ($scope, authService, userFactoryService, Flash, $http, $route) 
        {
            $scope.currentUser = authService.currentUser;

            /**
             * Convert array buffer type to Base64 string
             *  
             * @see: https://stackoverflow.com/a/11562550/5012644
             * @param: array
             * @return: string
             */
            function arrayBufferToBase64(bufferArray) {
                return btoa([].reduce.call(new Uint8Array(bufferArray),
                    function(p,c) { return p+String.fromCharCode(c)},''));
            }

            /**
             * Edit the currently logged-in user
             * 
             * @author: cognophile
             * @return: boolean
             */
            $scope.EditUser = function() {
                if (!$scope.newUsername || !$scope.newFirstname ||
                    !$scope.newSurname || !$scope.newPassword || !$scope.newAddress) {
                    notify("Oops!", "All fields need to be completed to save your account changes.");
                    return false;
                }

                var patchedUser = userFactoryService.CreateEditedUser(
                    $scope.newUsername, $scope.newFirstname, 
                    $scope.newSurname, $scope.newPassword,
                    $scope.newAddress, $scope.currentUser.preferences, 
                    $scope.currentUser.profileImage
                );

                try {
                    var isSuccessful = authService.EditUser(patchedUser);

                    if (isSuccessful) {
                        var message = '<strong>Saved!</strong> Your account has been updated!'; 
                        Flash.create('success', message);
                    }
                    else {
                        var message = '<strong>Oops!</strong> Your account couldn\'t been updated!'; 
                        Flash.create('danger', message);
                    }

                    $route.reload();
                    return isSuccessful;
                }
                catch (ex) {
                    console.log(ex);
                    notify('Oops!', "An unknown error occurred. See log for details.");
                    return false;
                }
            } 

            /**
             * Toggle the visibility of the edit form
             * 
             * @author: cognophile
             * @return: void
             */
            $scope.ToggleEditForm = function() {
                var editSection = document.getElementById("user-edit-section");
                editSection.style.visibility = editSection.style.visibility === 'hidden' ? 'visible' : 'hidden';
            }

            /**
             * Update the profile image associated with the current user account
             * 
             * @author: maskaro, cognophile
             * @return: void
             */
            $scope.EditProfileImage = function() {
                var newUrl = prompt('Enter the URL of your new profile image!');

                var regex = new RegExp("^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$", 'gi');
                var isValid = regex.test(newUrl);

                if (!newUrl || !isValid) {
                    alert('The URL looks invalid. Make sure you\'ve entered a full and valid URL. The image will not be changed.');
                    return false;
                }

                $http.get(newUrl, { responseType: 'arraybuffer' })
                    .then(function (response) {
                        return response.data;
                    })
                    .then(function (responseData) {
                        var imageB64 = arrayBufferToBase64(responseData);
                        var fileExtension = newUrl.split('.').pop();

                        return 'data:image/' + fileExtension + ';base64,' + imageB64;
                    })
                    .then(function (imageData) {
                        try {
                            var isSuccessful = authService.UpdateProfileImage(imageData);

                            if (!isSuccessful) {
                                notify('Oops!', 'Couldn\t save the profile image. Please try again.');
                                return false;
                            }

                            var message = '<strong>Saved!</strong> Your avatar has been updated!';
                            Flash.create('success', message);
                        } 
                        catch(ex) {
                            console.log(ex);
                            notify('Oops!', 'An unknown error occurred. See log for details.');
                            return false;
                        }

                        $route.reload();
                    });
            }
        }
    ]
);

