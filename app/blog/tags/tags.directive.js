app.directive('postTags', [
  '$window',
  function($window) {
    var directive = {}; 

    directive.templateUrl = 'app/blog/tags/tags.view.html';

    directive.scope = {
      post: '=',
    };

    directive.controller = function ($scope, $element, $attrs) {};

    return directive;
  },
]);
