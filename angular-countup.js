/**
 * Angular countup
 * An angular countup directive to countup from a set time
 *
 *
 */

angular.module('angular-countup', []).
    directive('ilnCountup', [
        '$interval',
        function ( $interval ) {
        return {
            restrict: 'E',
            template:
                '<div id="iln-time-diff">'+
                '<span id="iln-time-diff-hour">{{ hour }}</span>'+
                '<span id="iln-time-diff-minute">{{ minute }}</span>'+
                '<span id="iln-time-diff-second">{{ second }}</span>'+
                '</div>',
            link:   function ( scope, elm, attrs ) {

                scope.$watch( attrs.startTime, function ( value ) {
                    // do nothing if the value comes in empty, null or undefined
                    if ((value !== null) && (value !== undefined) && (value !== '')) {

                        var startTime = value;
                        var currentTime = new Date().getTime();
                        var initialTime = currentTime - startTime;
                        /**
                         * Convert number in miliseconds to hh:mm:ss
                         * @param {Number} _milsec
                         * @return {String} _r
                         */
                        var convertTime = function( _milsec ){

                            var _sec = _milsec / 1000;

                            var _h = Math.floor(((_sec % 31536000) % 86400) / 3600);
                            if( _h <= 9 ){
                                _h = '0' + _h;
                            }

                            var _m = Math.floor((((_sec % 31536000) % 86400) % 3600) / 60);
                            if( _m <= 9 ){
                                _m = '0' + _m;
                            }

                            var _s = Math.floor(((_sec % 31536000) % 86400) % 3600) % 60;
                            if( _s <= 9 ){
                                _s = '0' + _s;
                            }
                            var _r = _h +':'+ _m +':'+ _s;
                            return _r;
                        };
                        // set initial time
                        scope.ilnTimeDifference = convertTime( initialTime );

                        var timerCountup = $interval(function(){
                            // count up the time by 1 sec
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
