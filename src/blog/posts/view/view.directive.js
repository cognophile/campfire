app.directive('viewPost', [
  '$window',
  function($window) {
    var directive = {}; 

    directive.templateUrl = 'app/blog/posts/view/view.view.html';

    directive.scope = {
      post: '=',
    };

    directive.controller = function ($scope, $element, $attrs) {
      
      /**
       * Return to the previous page
       * 
       * @author: cognophile
       * @return: void
       */
      $scope.GoBack = function() {
        $window.location.reload();
      };
    };

    return directive;
  },
]);
