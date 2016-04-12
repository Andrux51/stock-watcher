(function() {
    angular.module('meanjsApp').controller('WatcherController', ['$http', '$interval', '$cookies', function($http, $interval, $cookies) {
        var vm = this;

        vm.watchedStocks = [];
        vm.holdValues = [];

        vm.initialize = function() {
            // attempt to fetch watchedStocks and holdValues from $cookies
        };

        vm.setHoldValues = function(stock) {
            var existing = vm.holdValues.filter(function(s) {
                return s.t === stock.t;
            })[0];

            var holdStock = {};

            if(existing) {
                holdStock = existing;
            } else {
                // vm.watchedStocks will (guaranteed) already be populated
                holdStock = angular.copy(vm.watchedStocks.filter(function(s) {
                    return s.t === stock.t;
                })[0]);

                vm.holdValues.push(holdStock);
            }

            // make sure record values are defined
            holdStock._highEnd = holdStock._highEnd || (parseFloat(stock.pcls_fix) + 0.20);
            holdStock._lowEnd = holdStock._lowEnd || (stock.pcls_fix - 0.10);
            holdStock._bottomEnd = holdStock._bottomEnd || (stock.pcls_fix - 0.30);
            holdStock._recordHigh = holdStock._recordHigh || parseFloat(stock.l);
            holdStock._recordLow = holdStock._recordLow || parseFloat(stock.l);
            holdStock._lowEmailSent = holdStock._lowEmailSent || false;
            holdStock._bottomEmailSent = holdStock._bottomEmailSent || false;

            if(parseFloat(stock.l) >= holdStock._recordHigh) {
                holdStock._recordHigh = parseFloat(stock.l);
            }
            if(parseFloat(stock.l) <= holdStock._recordLow) {
                holdStock._recordLow = parseFloat(stock.l);
            }

            // move the goalposts forward, things are going well
            if(stock.l >= holdStock._highEnd) {
                holdStock._highEnd = parseFloat(stock.l) + 0.20;
                holdStock._lowEnd = (stock.l - 0.10);
                holdStock._bottomEnd = (stock.l - 0.30);

                holdStock._lowEmailSent = false;
                holdStock._bottomEmailSent = false;

                var emailOptions = {
                    subject: 'Stock Good ('+stock.t+') - High End Reached',
                    bodyhtml: 'Stay the course!'
                };

                $http.post('/sendmail', emailOptions)
                    .then(function(response) {
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    });
            }

            if(!holdStock._lowEmailSent && stock.l <= holdStock._lowEnd) {
                var emailOptions = {
                    subject: 'Stock Alert ('+stock.t+') - Low End Reached',
                    bodyhtml: 'Consider selling ' + stock.t + ' if today is the day.'
                };

                $http.post('/sendmail', emailOptions)
                    .then(function(response) {
                        holdStock._lowEmailSent = true;
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    });
            }

            if(!holdStock._bottomEmailSent && stock.l <= holdStock._bottomEnd) {
                var emailOptions = {
                    subject: 'Stock !ALERT! ('+stock.t+') - Bottom End Reached',
                    bodyhtml: 'Get out of ' + stock.t + ' immediately, it\'s a sinking ship!'
                };

                $http.post('/sendmail', emailOptions)
                    .then(function(response) {
                        holdStock._bottomEmailSent = true;
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    });
            }

            // console.log('tracking', vm.holdValues);
        };


        vm.init = function() {
            vm.foo = "bar";
        };

        vm.getQuoteData = function(symbol) {
            // only send an email when appropriate
            $http.get('http://finance.google.com/finance/info?q=' + symbol)
                .then(function(response) {
                    var parsed = JSON.parse(response.data.replace(/\//g, ''))[0];
                    console.log(parsed);

                    var existing = vm.watchedStocks.filter(function(stock) {
                        return stock.t === parsed.t;
                    })[0];

                    if(existing) {
                        existing = parsed;
                    } else {
                        vm.watchedStocks.push(parsed);
                    }

                    vm.setHoldValues(parsed);

                    /*
                        !! Object Keys and what they mean !!
                        c = change (open to now)
                        c_fix = (change value without plus sign)
                        cp = change percentage
                        cp_fix = (change percentage?)
                        e = exchange (e.g. NASDAQ)
                        ec = extended trade change (after hours)
                        ec_fix = ^^^
                        ecp = extended trade change %
                        ecp_fix = ^^^
                        el = extended hours value (in $)
                        el_cur = ^^^
                        el_fix = ^^^
                        elt = extended hours last trade (datetime)
                        id = stock id (unique to google?)
                        l = current price (last trade)
                        l_cur = ^^^
                        l_fix = ^^^
                        lt = last trade (datetime)
                        lt_dts = last trade (ISO8601 timestamp)
                        ltt = last trade time (hour:minutes)
                        pcls_fix = previous close price
                        s = ??? (2???)
                        t = symbol
                    */
                }, function(error) {
                    console.log(error);
                });
        };

        vm.autoRefresh = function(stock) {
            vm.getQuoteData(stock.t);

            if(stock.interval) {
                $interval.cancel(stock.interval);
                stock.interval = undefined;
            }

            stock.interval = $interval(function() {
                vm.getQuoteData(stock.t);
            }, 5000);
        };
    }]);
})();
