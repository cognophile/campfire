app.controller('NavigationController', ['$scope', 'AuthService', '$location',
        function ($scope, authService, $location) {
            $scope.$location = $location;

            $scope.navbarItems = [
                {
                    title: 'About',
                    link: '/about',
                    requiresAuthorisation: false,
                    renderWhenLoggedIn: false
                },
                {
                    title: 'Search Blogs',
                    link: '/public',
                    requiresAuthorisation: false,
                    renderWhenLoggedIn: false
                },
                { 
                    title: 'Register',
                    link: '/register',                                   
                    requiresAuthorisation: false,
                    renderWhenLoggedIn: false
                },
                {
                    title: 'Login',
                    link: '/login',
                    requiresAuthorisation: false,
                    renderWhenLoggedIn: false
                },
                {
                    title: 'Dashboard',
                    link: '/dashboard',
                    requiresAuthorisation: true,
                    renderWhenLoggedIn: true
                },
                {
                    title: 'Preferences',
                    link: '/preferences',
                    requiresAuthorisation: true,
                    renderWhenLoggedIn: true
                },
                {
                    title: 'Logout',
                    link: '/logout',
                    requiresAuthorisation: true,
                    renderWhenLoggedIn: true
                },
            ];
            
            /** 
             * Determine if a menu item is to be rendered, or not
             * 
             * @author: cognophile
             * @param: page | string
             * @return: boolean
             */
            $scope.itemIsVisible = function (page) {
                if (page.requiresAuthorisation 
                    && !authService.IsUserLoggedIn())
                {
                    return false;
                }
                
                if (!page.requiresAuthorisation 
                    && !authService.IsUserLoggedIn()) 
                {
                    return true;
                }

                 if (page.requiresAuthorisation 
                    && authService.IsUserLoggedIn() 
                    && page.renderWhenLoggedIn) 
                {
                    return true;
                }
                
                return false;
            }
        }
    ]
);