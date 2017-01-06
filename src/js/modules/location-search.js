/**
 * Location Search Modules
 * ------------------------------------
 * Everything you need to never build Google Location search from scratch again.
 * @param String id The html element id of the autocomplete input.
 * @param callback Function the method to call pn place_changed
 * @return google Autocomplete object
 */


(function($) {

    if (typeof window.LocationSearch == 'undefined') window.LocationSearch = {};

    LocationSearch = {

        inputs: [],


        /**
         * Init
         * Creates a new Google Autocomplete search input.
         * @param String id The html element id of the autocomplete input.
         * @param callback Function the method to call pn place_changed
         * @return google Autocomplete object
         */

        init: function( id, callback ) {

            if($('#'+id).length <= 0){ return; }

            // Setup Input
            this.inputs[id] = {};
            this.inputs[id].id = id;
            this.inputs[id].input = document.getElementById(id);
            this.inputs[id].autocomplete = new google.maps.places.Autocomplete(this.inputs[id].input, {});
            this.inputs[id].listen = google.maps.event.addListener(this.inputs[id].autocomplete, 'place_changed', callback);
            this.index++;

            return this.inputs[id];



        },

        /**
         * Radius search
         * Search a text input value and run a callback for each result saying if its inside or outside the radius
         * @param String id The html element id of the autocomplete input.
         * @param Number km the kilometer radius
         * @param data array of coordinations. {lat:0,lng:0}
         * @param callback Function the method to call for each result
         * @return null
         */

        radiusSearch: function(id, km, data, callback){

            var place = this.inputs[id].autocomplete.getPlace();
            var lng = place.geometry

            if(!place.geometry) return false;

            // Get Searched Location Bounds
            var bounds = this.getBounds(place.geometry.location.lat(),place.geometry.location.lng(), km)

            // Filter Results
            for(var i in data){

                if(this.withinBounds(data[i].lat, data[i].lng, bounds)){

                    callback(data[i], true);

                } else {

                    callback(data[i], false);

                }

            }



        },

        /**
         * Get Bounds
         * Get a square of coordinates
         * @param Number lat the latitude
         * @param Number lng the longitude
         * @param Number distance the kilometers
         * @return Array [minLon,minLat,maxLon,maxLat]
         */

        getBounds: function(lat, lng, distance){

            var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
            if (distance < 0) return 'Illegal arguments';

            // helper functions (degrees<–>radians)
            Number.prototype.degToRad = function () {
                return this * (Math.PI / 180);
            };

            Number.prototype.radToDeg = function () {
                return (180 * this) / Math.PI;
            };

            // coordinate limits
            MIN_LAT = (-90).degToRad();
            MAX_LAT = (90).degToRad();
            MIN_LON = (-180).degToRad();
            MAX_LON = (180).degToRad();

            // Earth's radius (km)
            R = 6378.1;

            // angular distance in radians on a great circle
            radDist = distance / R;

            // center point coordinates (deg)
            degLat = lat;
            degLon = lng;

            // center point coordinates (rad)

            radLat = degLat.degToRad();
            radLon = degLon.degToRad();

            // minimum and maximum latitudes for given distance
            minLat = radLat - radDist;
            maxLat = radLat + radDist;

            // minimum and maximum longitudes for given distance
            minLon = void 0;
            maxLon = void 0;

            // define deltaLon to help determine min and max longitudes

            deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
            if (minLat > MIN_LAT && maxLat < MAX_LAT) {
                minLon = radLon - deltaLon;
                maxLon = radLon + deltaLon;
                if (minLon < MIN_LON) {
                  minLon = minLon + 2 * Math.PI;
                }
                if (maxLon > MAX_LON) {
                  maxLon = maxLon - 2 * Math.PI;
                }
            }
            // a pole is within the given distance
            else {
                minLat = Math.max(minLat, MIN_LAT);
                maxLat = Math.min(maxLat, MAX_LAT);
                minLon = MIN_LON;
                maxLon = MAX_LON;
            }
            return [
                minLon.radToDeg(),
                minLat.radToDeg(),
                maxLon.radToDeg(),
                maxLat.radToDeg()
            ];

        },

        /**
         * Within Bounds
         * Evaluate if a location is within certain bounds
         * @param Number lat the latitude
         * @param Number lng the longitude
         * @param Array bounds [minLon,minLat,maxLon,maxLat]
         * @return Boolean
         */

        withinBounds: function(lat, lng, bounds){

            if(lng > bounds[0] && lng < bounds[2] && lat > bounds[1] && lat < bounds[3]){
                return true;
            } else {
                return false;
            }

        },

        /**
         * Distance
         * Get the distance in Kilometers between two points
         * @param Object pointA the first point obj.lat obj.lng
         * @param Object pointA the first point obj.lat obj.lng
         * @return Number the kilometers between the two points
         */

        distance: function(pointA, pointB){

            var R = 6371; // km
            var dLat = (pointA.lat-pointB.lat)* Math.PI / 180;
            var dLon = (pointA.lng-pointB.lng)* Math.PI / 180;
            var lat1 = (pointB.lat)* Math.PI / 180;
            var lat2 = (pointA.lat)* Math.PI / 180;

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;

            return parseFloat(d.toFixed(1));

        },

        /**
         * Get Location By Postcode
         * @param String postcode the postcode to search google for
         * @param Function callback the function to call on a successfull return
         * @return null
         */

        getLocationByPostcode: function ( postcode, callback ){


             $.ajax('https://maps.googleapis.com/maps/api/geocode/json?address='+postcode+',+AUS&sensor=false', {

                success: function(data) {

                    var c = {};
                    c.lat = data.results[0].geometry.location.lat;
                    c.lng = data.results[0].geometry.location.lng;
                    callback(c);

                },

                error: function() {
                    console.log("Ajax Error: Get Communities");
                }

           });

        }

    }

    module.exports = LocationSearch;

})(jQuery);
