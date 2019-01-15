app.run(['AuthService', 'BlogService',
    function(authService, blogService) 
    {
            authService.PrepareStorage();
            blogService.PrepareStorage();
            
            authService.CreateTestUser();
            authService.GetUsersFromStorage();
            authService.SetupLocationChangeDetection();            
            authService.LoadUserPreferences();
        }
    ]
); 