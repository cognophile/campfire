app.controller('LogoutController', 
     ['$location', 'AuthService',
        function ($location, authService) {            
            var resetTheme = function() {
                document.body.style.setProperty("--primary-theme-color", '#4A1087');
                document.body.style.setProperty("--secondary-theme-color", '#651FAF');
                document.body.style.setProperty("--text-theme-color", '#FFFFFF');
                document.body.style.setProperty("--background-theme-color", '#FFFFFF');
            }

            var redirect = function(path) {
                $location.path(path);
            }

            this.PerformLogout = function() {
                try {             
                    var isConfirmed = confirm('Are you sure you wish to leave?');       
                    if (isConfirmed) {
                        authService.Logout();
                        resetTheme();
                        redirect('/login');    
                    } 
                    else {
                        redirect('/dashboard');    
                    }                        
                }
                catch (ex) {
                    console.log('LogoutController/Logout: Error - ', ex);
                    notify('Oops!', 'Unable to log you out. Please check the console for details.');
                } 
            }

            this.PerformLogout();
        }
    ]
);