/**
 * jQuery gmap3
 * Copyright (c) 2010-2012 bumberboom.net - info(at)bumberboom(dot)net | http://blog.bumberboom.net
 * 
 * Licensed under the MIT
 * Date: 2012/07/06
 * 
 * @author bumberboom.net
 * @version	0.4
 */


(function($) {
  var name_space = 'gmap3';
	var geocoder = new google.maps.Geocoder();
	$.fn[name_space] = function(options) {
	
		if(1 < $(this).length) {
			return this;
		}
		
		var opts = $.extend({}, $.fn[name_space].defaults, options);
		
		return this.each(function() {
			var $self = $(this);
			$(this).bind('onMapReady', function() {
				for(var j = 0, max = opts.markers.length; j < max; j++) {
					addMarker($self, opts.markers[j]);
				}
			});
			addMap($(this), opts);
		});
	};
    
	function addMap($self, mpOpt) {
		var opt = {
			zoom : mpOpt.zoom,
			center : new google.maps.LatLng(mpOpt.latitude, mpOpt.longitude),
			mapTypeId : mpOpt.mapTypeId,
			navigationControl : mpOpt.navigationControl,
			mapTypeControl : mpOpt.mapTypeControl,
			scaleControl : mpOpt.scaleControl
		};
		var add = function() {
			var gmap = new google.maps.Map($self[0], opt);
			$self.data('markers', []);
			$self.data('gmap', gmap);
			$self.trigger('onMapReady');
		};
		
		if(mpOpt.address) {
			geocoder.geocode({'address': mpOpt.address}, function(results, status) {
				if(status === google.maps.GeocoderStatus.OK) {
					opt.center = results[0].geometry.location;
				} else {
					alert("『" + mpOpt.address + "』は見つかりませんでした。");
				}
				add();
			});
		} else if(mpOpt.latitude && mpOpt.longitude) {
			add();
		}
  }
        
	function addMarker($gmap, mkOpt) {
		var gmap = $gmap.data("gmap");
		var opt = {
			position : new google.maps.LatLng(mkOpt.latitude, mkOpt.longitude),
			map : gmap,
			title : mkOpt.title
		};
		if(mkOpt.icon) {
			opt.icon = mkOpt.icon;
		}
		var add = function() {
			var marker = new google.maps.Marker(opt);
			$gmap.data('markers').push(marker);
			
			if(mkOpt.content) {
				var infowindow = new google.maps.InfoWindow({
					content : mkOpt.content
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(gmap, marker);
				});
				if(mkOpt.openInfo) {
					google.maps.event.trigger(marker, 'click');
				}
			}
		};
		
		if(mkOpt.address) {
			geocoder.geocode({'address': mkOpt.address}, function(results, status) {
				if(status === google.maps.GeocoderStatus.OK) {
					opt.position = results[0].geometry.location;
				} else {
					alert("『" + mkOpt.address + "』は見つかりませんでした。");
				}
				add();
			});
		} else if(mkOpt.latitude && mkOpt.longitude) {
			add();
		}
	}
	
	function removeMarker(marker) {
		marker.setMap();
	}
	
	function removeAllMarkers($gmap) {
		var markers = $gmap.data('markers');
		for(var i = 0; i < markers.length; i++) {
			removeMarker(markers[i]);
		}
	}
	
	function panTo($gmap, pos) {
		var gmap = $gmap.data("gmap");
		gmap.panTo(pos);
	}
	
	$.gmap3 = {};
    
	$.gmap3.addMarker = function($gmap, mkOption) {
		addMarker($gmap, mkOption);
	};
	
	$.gmap3.removeAllMarkers = function($gmap) {
		removeAllMarkers($gmap);
	};
	
	$.gmap3.panTo = function($gmap, pos) {
		if(pos.address) {
			geocoder.geocode({'address': pos.address}, function(results, status) {
				if(status === google.maps.GeocoderStatus.OK) {
					panTo($gmap, results[0].geometry.location);
				} else {
					alert("『" + pos.address + "』は見つかりませんでした。");
				}
			});
		} else if(pos.latitude && pos.longitude) {
			panTo($gmap, new google.maps.LatLng(pos.latitude, pos.longitude));
		}
	};
  
	$.fn[name_space].defaults = {
		address: '',
		latitude: 0,
		longitude: 0,
		zoom: 10,
		navigationControl: true,
		mapTypeControl: true,
		scaleControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		markers: []
  };
    
})(jQuery);