(function() {
    angular.module('meanjsApp').controller('WatcherController', ['$http', '$interval', function($http, $interval) {
        var vm = this;

        vm.watchedStocks = [];

        vm.init = function() {
            vm.foo = "bar";
        };

        vm.getQuoteData = function(symbol) {
            $http.post('/sendmail', { symbol: symbol })
                .then(function(response) {
                    console.log(response);
                }, function(error) {
                    console.log(error);
                });

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

                    /*
                        !! Object Keys and what they mean !!
                        c = change (open to now/close)
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

        vm.autoRefreshAll = function() {
            vm.watchedStocks.forEach(function(stock) {
                vm.autoRefresh(stock);
            });
        }
    }]);
})();
