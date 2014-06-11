'use strict';

/*
 * Angular countup
 * An angular countup directive to countup from a set time
 *
 *
 *
 */

angular.module('angular-countup', []).
    directive('ilnCountup', [
        '$interval',
        function ( $interval ) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div id="iln-countup">{{ ilnTimeDifference }}</div>',
            link:   function ( scope, elm, attrs ) {

                scope.$watch( attrs.startTime, function ( value ) {
                    // let's do nothing if the value comes in empty, null or undefined
                    if ((value !== null) && (value !== undefined) && (value !== '')) {

                        var startTime = value;
                        var currentTime = new Date().getTime();
                        var initialTime = currentTime - startTime;
                        /**
                         * Convert number in miliseconds to hh:mm:ss
                         * @param {Number} _milsec
                         * @return {Number} _s
                         */
                        var convertTime = function( _milsec ){

                            var _sec = _milsec / 1000;
                            var _h = 0;
                            var _m = 0;
                            var _s = 0;

                            _h = Math.floor(((_sec % 31536000) % 86400) / 3600);
                            if( _h <= 9 ){
                                _h = '0' + _h;
                            }

                            _m = Math.floor((((_sec % 31536000) % 86400) % 3600) / 60);
                            if( _m <= 9 ){
                                _m = '0' + _m;
                            }

                            _s = Math.floor(((_sec % 31536000) % 86400) % 3600) % 60;
                            if( _s <= 9 ){
                                _s = '0' + _s;
                            }
                            var _r = _h +':'+ _m +':'+ _s;
                            return _r;
                        };
                        // set initial time
                        scope.ilnTimeDifference = convertTime( initialTime );

                        var timerCountup = $interval(function(){
                            initialTime = initialTime + 1000;
                            scope.ilnTimeDifference = convertTime( initialTime );
                        }, 1000);

                        // kill $interval
                        scope.$on(
                            '$destroy',
                            function( event ) {
                                $interval.cancel( timerCountup );
                            }
                        );

                     }
                });
            }
        };
    }]);
