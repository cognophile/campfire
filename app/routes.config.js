app.config (
	[
		'$routeProvider', '$windowProvider',
		function ($routeProvider, $windowProvider)
		{
		    $routeProvider.when (
					'/dashboard', {
						templateUrl: 'app/dashboard/dashboard.view.html',
						controller: 'DashboardController'
					}
				)
				.when (
					'/login', {
						templateUrl: 'app/login/login.view.html',
						controller: 'LoginController'
					}
				)
				.when (
					'/logout', {
						template: '&nbsp;',
						controller: 'LogoutController'
					}
				)
				.when (
					'/register', {
						templateUrl: 'app/registration/registration.view.html',
						controller: 'RegistrationController'
					}
				) 
				.when (
					'/blog', {
						templateUrl: 'app/blog/blog.view.html',
						controller: 'BlogController'
					}
				)
				.when (
					'/public', {
						templateUrl: 'app/blog/search/search.view.html',
						controller: 'BlogSearchController'
					}
				)
				.when (
					'/profile', {
						templateUrl: 'app/user-profile/user-profile.view.html',
						controller: 'UserProfileController'
					}
				)
				.when (
					'/about', {
						templateUrl: 'app/about/about.view.html',
						controller: 'AboutController'
					}
				)
				.when (
					'/preferences', {
						templateUrl: 'app/preferences/preferences.view.html',
						controller: 'PreferencesController'
					}
				)
				.otherwise(
				    {
						redirectTo: '/dashboard'
					}
				);
			
			  var $window = $windowProvider.$get();
  		}
	  ]
);