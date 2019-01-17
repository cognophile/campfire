app.service('AuthService', [
        '$rootScope', '$location', '$localStorage', 'UserFactoryService',
        function($rootScope, $location, $localStorage, userFactoryService) {
            
            // Private Properties 
            var self = this;
            var registeredUsers = [];
            var protectedPages = [
                '/dashboard',
                '/profile',
                '/blog',
                '/preferences',
                '/logout',
            ];

            // Public Properties
            self.currentUser = null;

            // Private Methods
            /**
             * Save all users to storage
             * 
             * @author: cognophile 
             * @return: void 
             */
            var saveUsers = function() {
                $localStorage.users.registeredUsersArray = registeredUsers;
            };
            
            /**
             * Save given user to storage
             * 
             * @author: cognophile
             * @param: object [User]
             * @return: void
             */
            var updateCurrentUser = function (user) {
                $localStorage.users.currentUser = user;
            }; 

            /**
             * Update the stored current session user
             * 
             * @author: cognophile
             * @return: void
             */
            var saveSessionUser = function () {
                angular.forEach(registeredUsers, function(user, index) {
                    if (user.username === self.currentUser.username) {
                        registeredUsers[index] = self.currentUser;
                    }
                });
            }

            // Public Methods
            /**
             * Logout the current session user
             * 
             * @author: cognophile
             * @return: void
             */
            self.Logout = function() {
                saveSessionUser();
                saveUsers();

                self.currentUser = {};
                $localStorage.users.currentUser = {};
            }

            /**
             * Check whether a given user is registered and log them in if so
             * 
             * @author: maskaro, cognophile
             * @param: string
             * @param: string [Details: plain text]
             * @throws: Error [Details: credentials missing|user not found]
             * @return: void
             */
            self.Authenticate = function(username, password) {
                var foundUser = false;
                password = btoa(password);

                if (!username || !password) {
                    throw new Error('AuthService/checkUser: Missing user credentials.');
                }

                for (var i = 0; i < registeredUsers.length; i++) {
                    var user = registeredUsers[i];

                    if (user.username === username && user.password === password) {
                        foundUser = true;
                        self.currentUser = user;
                        updateCurrentUser(user);
                        break;
                    }
                }

                return foundUser;
            };

            /**
             * Retrieve the list of currently loaded users
             * 
             * @author: maskaro, cognophile
             * @return: array
             */
            self.GetUsers = function() {
                return registeredUsers;
            };

            /** 
             * Verify a username is not already taken
             * 
             * @author: cognophile
             * @param: string [desired username]
             * @returns: boolean
             */
            self.VerifyUsername = function(desiredUsername) {
                var available = true; 

                angular.forEach(registeredUsers, function(user, index) {
                    if (user.username === desiredUsername) {
                        available = false;
                    }
                });

                return available;
            };

            /**
             * Add user to storage only
             * 
             * @author: maskaro
             * @param: object [User]
             * @throws: Error [Details: invalid user object]
             * @return: void
             */
            self.SaveUser = function(user) {
                if (!user.password || !user.username) {
                    throw new Error(
                        'AuthService/saveUser: User object is invalid, missing data. Object: ' + JSON.stringify(user)
                        );
                }

                registeredUsers.push(user);
                saveUsers();
            };

            /** 
             * Add user to storage and logs them in if all fine and dandy
             * 
             * @author: cognophile
             * @param: object [User]
             * @throws: Error [Details: Invalid user object
             * @return: void
             */
            self.AutoLoginSaveUser = function(user) {
                if (!user.password || !user.username) {
                    throw new Error(
                        'AuthService/autoLoginSaveUser: User object is invalid, missing data. Object: ' + JSON.stringify(user)
                        );
                }

                registeredUsers.push(user);
                self.currentUser = user;
                saveUsers();
            };

            /**
             * Configure and enforce page access control at bootstrap
             * 
             * @author: maskaro, cognophile
             * @return: void
             */
            self.SetupLocationChangeDetection = function() {
                // when the user requests a new page
                $rootScope.$on('$locationChangeStart', function(locationChangeEvent, requestedLocation, currentLocation) {

                    var requestedLocationParts = requestedLocation.split('/');
                    var authenticated = false;

                    // extract the page location from the requested location
                    var pageToAccess = '/' + requestedLocationParts.pop();

                    // check if this is not a protected page
                    if (protectedPages.indexOf(pageToAccess) === -1) {
                        // check if the user is logged in at this time, redirect them to their dashboard
                        if (!angular.equals(self.currentUser, {})) {
                            $location.path(pageToAccess);
                            return authenticated = true;
                        }

                        return;
                    }

                    // checking access to a protected page - check if user logged in
                    if (!angular.equals(self.currentUser, {})) {
                        return authenticated = true;
                    }

                    // otherwise, user is not authorised, redirect them to login
                    authenticated = false;
                    $location.path('/login');
                });
            };

            /**
             * Establish the required local storage containers
             * 
             * @author: cognophile
             * @return: void
             */
            self.PrepareStorage = function() {
                if (!$localStorage.users) {
                    $localStorage.users = {
                        registeredUsersArray: [],
                        currentUser: {},
                    };                    
                }
            };

            /**
             * Create and save a test login user [dev only]
             * 
             * @author: cognophile
             * return: void
             */
            self.CreateTestUser = function() {
                if (!$localStorage.users.registeredUsersArray.length) {
                    var userOne = userFactoryService.CreateDefaultUser(
                        'wolfal', 'Alice', 'Wolf', 'test', '18 Hawk Avenue, Cambridge, CB3 1RT'
                    );

                    var userTwo = userFactoryService.CreateDefaultUser(
                        'barneby99', 'Barneby', 'Smith', 'test', 'Flat 56B, Rose Street, Oxford, OX11 8QE'
                    );

                    registeredUsers.push(userOne);
                    registeredUsers.push(userTwo);
                    saveUsers();
                }
            };

            /**
             * Retrieve all registered users from the storage medium
             * 
             * @author: maskaro, cognophile
             * @return: void
             */
            self.GetUsersFromStorage = function() {
                registeredUsers = $localStorage.users.registeredUsersArray;
                self.currentUser = $localStorage.users.currentUser;
            };

            /**
             * Edit the matching session user account
             * 
             * @author: cognophile
             * @throws: Error [Details: user not found]
             * @return: boolean
             */
            self.EditUser = function(patch) {
                var foundUser = false;

                angular.forEach(registeredUsers, function(user, index) {
                    if (user.username === self.currentUser.username) {
                        foundUser = true;
                        user = Object.assign({}, user, patch);

                        registeredUsers[index] = user;
                        
                        self.currentUser = user;
                        updateCurrentUser(user);
                        saveUsers();
                    }
                });

                if (!foundUser) {
                    throw new Error('AuthService/editUser: Unable to edit user account.');
                }

                return foundUser;
            };

            /**
             * Update and save the value of the session users profile image property
             * 
             * @author: cognophile
             * @param: string [Details: base64]
             * @throws: Error [Details: user not found]
             * @return: boolean
             */
            self.UpdateProfileImage = function(imageData) {
                var foundUser = false;

                angular.forEach(registeredUsers, function(user, index) {
                    if (user.username === self.currentUser.username) {
                        foundUser = true;
                        user.profileImage = imageData;
                        
                        registeredUsers[index] = user;
                        
                        self.currentUser = user;
                        updateCurrentUser(user);
                        saveUsers();
                    }
                });

                if (!foundUser) {
                    throw new Error('AuthService/updateProfileImage: Unable to update image.');
                }

                return true;
            }

            /**
             * Set the theme view variables to the session users preferences
             * 
             * @author: cognophile
             * @return: void
             */
            self.LoadUserPreferences = function() {
                if (!angular.equals(self.currentUser, {})) {
                    document.body.style.setProperty("--primary-theme-color", self.currentUser.preferences.theme.primary);
                    document.body.style.setProperty("--secondary-theme-color", self.currentUser.preferences.theme.secondary);
                    document.body.style.setProperty("--text-theme-color", self.currentUser.preferences.theme.text);
                    document.body.style.setProperty("--background-theme-color", self.currentUser.preferences.theme.background);
                }
            };

            /**
             * Confirm whether a session user is present
             * 
             * @author: cognophile
             * @return: boolean
             */
            self.IsUserLoggedIn = function() {
                return (!angular.equals(self.currentUser, {})) ? true : false;
            };

            return self;
        }
    ]
);