app.config (
	[
		'$routeProvider', '$windowProvider',
		function ($routeProvider, $windowProvider)
		{
		    $routeProvider.when (
					'/dashboard', {
						templateUrl: 'src/dashboard/dashboard.view.html',
						controller: 'DashboardController'
					}
				)
				.when (
					'/login', {
						templateUrl: 'src/login/login.view.html',
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
						templateUrl: 'src/registration/registration.view.html',
						controller: 'RegistrationController'
					}
				) 
				.when (
					'/blog', {
						templateUrl: 'src/blog/blog.view.html',
						controller: 'BlogController'
					}
				)
				.when (
					'/public', {
						templateUrl: 'src/blog/search/search.view.html',
						controller: 'BlogSearchController'
					}
				)
				.when (
					'/profile', {
						templateUrl: 'src/user-profile/user-profile.view.html',
						controller: 'UserProfileController'
					}
				)
				.when (
					'/about', {
						templateUrl: 'src/about/about.view.html',
						controller: 'AboutController'
					}
				)
				.when (
					'/preferences', {
						templateUrl: 'src/preferences/preferences.view.html',
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