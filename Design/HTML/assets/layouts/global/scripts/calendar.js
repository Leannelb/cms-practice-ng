var BrownsCalendar = function (options) {
	
	var calendar = {
		month :  moment().month(),
		year : moment().year(),
		date : moment().format("D"),
		dayOfWeek : moment().day(),
		monthLong : moment().format('MMM'),
	};
	var layout = $('body.calendar').data('calendar-type');
	var pharmacies = [];
	var defaults = {
		ui: {
			year: {
				visible: true,
				format: 'YYYY',
				startYear: '2000',
				endYear: moment().add(10, 'year').format('YYYY')
			},
			month: {
				visible: true,
				format: 'MMM',
			},
			dateHeader: {
				format: 'dddd D, MMMM YYYY',
			},
			week: {
				day: {
					format: 'D'
				},
				header: {
					format: 'dd'
				},
				startOfTheWeek: '0',
				endOfTheWeek: '6',
				visible: true
			}
		},
		now: null,
		locale: 'en',
		timeFormat: 'h:mm a',
		minTime: 0,
		maxTime: 24,
		dateFormat: 'MMMM Do YYYY',
		slotDuration: '30',
		events: [],
		eventOverlap: false,
		weekends: true,
		disableDates: [],
		onViewRenderComplete: function() {},
		onEventDblClick: function() {},
		onEventClick: function(event) {},
		onEventRender: function() {},
		onEventDragComplete: function(event) {},
		onEventResizeComplete: function(event) {},
		onTimeSlotDblClick: function(timeSlot) {},
		onDateChange: function(range) {}
	}
	
	var plugin = this;
	plugin.settings = $.extend(true, {}, defaults, options);
	
	var yearSelector = (function() {
		function yearSelector(container) {
			this.container = container;
			this.render();
		}
		var _setActive = function() {
				var diff = calendar.year - settings.ui.year.startYear
				$('.year a').removeClass('active');
				$('.year:nth-child(' + diff + ') > a').addClass('active')
			}
		var _bindEvents = function() {
				var $this = this;
				$(document).on("click", "body:not(.pending) .year-selector", function(e) {
					var year = $(this).attr('data-year');
					calendar.year = moment(year, settings.ui.year.format).year();
					_setActive();
					console.log(year);
				});
			}
		yearSelector.prototype.render = function() {
			$(this.container).html("");
			headerContent = "";
			var diffYears = settings.ui.year.endYear - settings.ui.year.startYear
			diffYears = (diffYears > 90) ? 90 : diffYears;
			var yearInc = settings.ui.year.startYear;
			for (var i = 1; i <= diffYears; i++) {
				yearInc = moment(yearInc, settings.ui.year.format).add(1, 'year').format(settings.ui.year.format);
				var activeClass = (calendar.year == yearInc) ? 'active' : '';
				headerContent += '<div class="year">';
				headerContent += '<a href="#" class="year-selector ' + activeClass + '" data-year=' + yearInc + '>' + yearInc + '</a>';
				headerContent += '</div>';
			}
			$(this.container).append(headerContent);
			BrownsCalendar.dragHandler('years');
			_setActive();
			_bindEvents();
		}
		return yearSelector;
	})();
	
	var monthSelector = (function() {
		function monthSelector(container) {
			this.container = container;
			this.render();
		}
		var _setActive = function() {
				$('.month a').removeClass('active');
				$('.month:nth-child(' + (parseInt(calendar.month) + 1) + ') > a').addClass('active');
			}
		var _bindEvents = function() {
				var $this = this;
				$(document).on("click", "body:not(.pending) .month-selector", function(e) {
					var month = $(this).attr('data-month');
					calendar.month = moment(month, settings.ui.month.format).month();
					_setActive();
					console.log(month);
				});
			}
		monthSelector.prototype.render = function() {
			$(this.container).html("");
			monthContent = "";
			var months = moment.monthsShort();
			var currentMonth = moment([calendar.year, calendar.month, calendar.date]).format(settings.ui.month.format);
			for (var i = 0; i < months.length; i++) {
				var formatedMonth = moment(months[i], 'MMMM').format(settings.ui.month.format);
				var activeClass = currentMonth == formatedMonth ? 'active' : '';
				monthContent += '<div class="month">';
				monthContent += '<a href="#" class="month-selector ' + activeClass + '" data-month="' + formatedMonth + '">' + formatedMonth + '</a>';
				monthContent += '</div>';
			}
			$(this.container).append(monthContent);
			BrownsCalendar.dragHandler('months');
			_bindEvents();
		}
		return monthSelector;
	})();
	
	var todayDate = (function() {
		function todayDate(container) {
			this.container = container;
			this.render();
		}
		todayDate.prototype.render = function() {
			$(this.container).html("");
			var today = moment([calendar.year, calendar.month, calendar.date]).format(settings.ui.dateHeader.format);
			$(this.container).append(today);
			
			if($('.mini-calendar-datepicker').length){
	        	$('.mini-calendar-datepicker').datepicker({
		        	'defaultViewDate' : { year: calendar.year, month: calendar.month, day: calendar.date }
	        	});
	        	
	        	$('.mini-calendar-datepicker').on("changeDate", function() {
				    console.log($('.mini-calendar-datepicker').datepicker('getFormattedDate'));
				});
	        	
	        }
		}
		return todayDate;
	})();
	
	var weekSelector = (function() {
		function weekSelector(container) {
			this.container = container;
			this.render();
		}
		var _setActive = function() {
				$('.week').removeClass('active');
				$(elem).closest('.week').addClass('active');
			}
		var _bindEvents = function() {
				var $this = this;
				$(document).on("click", "body:not(.pending) .date-selector", function(e) {
					$(".week-date").removeClass('active')
					$(this).children('.week-date').addClass('active');
					calendar.date = parseInt($(this).children('.week-date').children('.day').children('a').attr('data-date'));
					console.log(calendar.date);
				});
			}
		weekSelector.prototype.render = function() {
			$(this.container).html("");
			daysOfMonth = moment([calendar.year, calendar.month]).daysInMonth();
			weekContent = "";
			var weekStart = parseInt(moment(settings.ui.week.startOfTheWeek, 'd').format('d'));
			var weekEnd = parseInt(moment(settings.ui.week.endOfTheWeek, 'd').format('d'));
			for (var i = 1; i <= daysOfMonth; i++) {
				var date = moment([calendar.year, calendar.month, i]);
				var t = parseInt(moment([calendar.year, calendar.month, i]).format('d'));
				var activeClass = (calendar.date == i) ? 'active current-date' : '';
				(t == weekStart || i == 1) ? weekContent += '<div class="week ' + activeClass + '">' : '';
				if (t >= weekStart && t <= weekEnd) {
					weekContent += '<div class="day-wrapper date-selector">';
					weekContent += '<div class="week-day">';
					weekContent += '<div class="day week-header">' + date.format(settings.ui.week.header.format) + '</div>';
					weekContent += '</div>';
					weekContent += '<div class="week-date ' + activeClass + '">';
					weekContent += '<div class="day"><a href="#" data-date=' + date.format(settings.ui.week.day.format) + '>' + i + '</a></div>';
					weekContent += '</div>';
					weekContent += '</div>';
				}(t == weekEnd) ? weekContent += '</div>' : '';
			}
			weekContent += '</div>';
			$(this.container).append(weekContent);
			$('.weeks-wrapper .week .day-wrapper .week-date.active').closest(".week").addClass('active');
			BrownsCalendar.dragHandler('weeks-wrapper');
			_bindEvents();
		}
		return weekSelector;
	})();
	
	// Handles browns button toggler
    var handleBrowseButtonToggler = function () {
        // quick sidebar toggler
        $('.calendar .btn-toggle-browse-calendar').click(function (e) {
            $('.calendar .page-bar-calendar-years, .calendar .page-bar-calendar-months').toggleClass('hidden'); 
        });
    };
	
    return {
        //main function to initiate the module
        init: function () {
            this.settings = plugin.settings;
			this._setLocale();
			handleBrowseButtonToggler();
			calendar.monthLong = moment().format(this.settings.ui.month.format);
			if (this.settings.now != null) {
				calendar.month = moment(plugin.settings.now).month();
				calendar.year = moment(plugin.settings.now).year();
				calendar.date = moment(plugin.settings.now).format("D");
				calendar.dayOfWeek = moment(plugin.settings.now).day();
				calendar.monthLong = moment(plugin.now).format('MMM');
			} else {
				calendar.month = moment().month();
				calendar.year = moment().year();
				calendar.date = moment().format("D");
				calendar.dayOfWeek = moment().day();
				calendar.monthLong = moment().format('MMM');
			}
			if (!settings.ui.year.visible) $("#years").hide();
			if (!settings.ui.month.visible) $("#months").hide();
			if (!settings.ui.week.visible) $("#weeks-wrapper").hide();
			//this.yearPicker = new yearSelector("#years");
			if (!settings.weekends) {
				settings.ui.week.startOfTheWeek = 1;
				settings.ui.week.endOfTheWeek = 5;
			}
			//this.monthPicker = new monthSelector("#months");
			this.todaySet = new todayDate("#datetoday");
			
			if ($().tabdrop) {
	            $('.tabbable-tabdrop .nav-pills, .tabbable-tabdrop .nav-tabs').tabdrop('layout');
	        }
	        
	        switch (layout) {
				case "month":
					break;
				case "week":
					this.weekCalendar = new weekSelector(".weeks-wrapper");
					//construct grid dynamically
					break;
				case "day":
					break;
			}
			this.autoFocusActiveElement();
			this.scrollToElement('#weeks-wrapper .active');
			this.getPharmacyOptions('.calendar-options .dropdown-menu a');
			this.handleGridHeight('.grid');
			this.handleGridWidth('.calendar-container',200);
			
        },
        handleGridHeight: function(element) {
			var wrapper = $('.calendar .calendar-container');

	        var initGridSlimScroll = function () {
	            var gridContainer = wrapper.find(element);
	            var gridContainerHeight;
	            gridContainerHeight = $(window).height() - $('.page-header').height() - $('.page-title').height() - $('.page-bar').height() - $('.portlet-title').height() - 200;
	
	            App.destroySlimScroll(gridContainer);
	            gridContainer.attr("data-height", gridContainerHeight);
	            App.initSlimScroll(gridContainer);
	        };
	
	        initGridSlimScroll();
	        App.addResizeHandler(initGridSlimScroll); // reinitialize on window resize
	    },
	    handleGridWidth: function(element,minWidth) {
			var timer;
			this.dragGridWidth(element,minWidth);
			$(window).resize(function() {
				clearTimeout(timer);
				timer = setTimeout(function() {
					BrownsCalendar.dragGridWidth(element,minWidth);
				}, 500);
			});
	    },
	    dragGridWidth: function(element,minWidth) {
			var noOfCols = $('.calendar .calendar-container .wrapper .tble .thead .tcell .pharma').length;
			var cellWidth = $('.calendar .calendar-container .wrapper .tble .tcell').width();
			var wrapper = $('.calendar');
			var el = wrapper.find(element);
            var calContainerWidth;
            calContainerWidth = minWidth * noOfCols + minWidth;
            var parent = el.parent();
            
            if(cellWidth < minWidth){
            	el.width(calContainerWidth);
				parent.css({'overflow':'scroll','overflow-y':'hidden'});
            }
            else{
	            el.width('auto');
				parent.css({'overflow':'hidden'});
            }
            
			/*
			$(element).scrollbar();
			var lP = parent.scrollLeft();
			interact(element).draggable({
				preventDefault: "auto",
				onmove: function(event) {
					var target = event.target,
						x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
					inverseX = -(x);
					parent.scrollLeft(inverseX);
					target.setAttribute('data-x', x);
				}
			});*/
			
	    },
        getPharmacyOptions: function(element) {
			$( element ).each(function( index ) {
				var $target = $(this),
			       val = $target.attr( 'data-value' ),
			       $inp = $target.find( 'input' ),
			       idx;
			    
			    if ( $( $inp ).prop( "checked" ) ) {
				    if ( ( idx = pharmacies.indexOf( val ) ) < 0 ) {
						pharmacies.push( val );
				   	} 
			    }
			});
			console.log( pharmacies );
			this.bindPharmacyOptions(element);
			return pharmacies;
	    },
        bindPharmacyOptions: function(element) {
			$( element ).on( 'click', function( event ) {
			   var $target = $( event.currentTarget ),
			       val = $target.attr( 'data-value' ),
			       $inp = $target.find( 'input' ),
			       idx;
			
			   if ( ( idx = pharmacies.indexOf( val ) ) > -1 ) {
			      pharmacies.splice( idx, 1 );
			      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
			   } else {
			      pharmacies.push( val );
			      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
			   }
			
			   $( event.target ).blur();
			      
			   console.log( pharmacies );
			   return false;
			});
	    },
        dragHandler: function(element) {
			var el = $('#' + element);
			var parent = el.parent();
			if ($('body').hasClass('mobile')) return
			if (el.length != 1) return
			$('.drager').scrollbar();
			var lP = parent.scrollLeft();
			interact('#' + element).draggable({
				preventDefault: "auto",
				onmove: function(event) {
					var target = event.target,
						x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
					inverseX = -(x);
					parent.scrollLeft(inverseX);
					target.setAttribute('data-x', x);
				}
			})
		},
		autoFocusActiveElement: function() {
			var timer;
			$(window).resize(function() {
				clearTimeout(timer);
				timer = setTimeout(function() {
					BrownsCalendar.scrollToElement('#weeks-wrapper .active');
				}, 500);
			});
		},
		scrollToElement: function(el) {
			el = $(el);
			if (!el.length != 0) return
			var par = $(el).parent();
			var t = this._isElementInViewport(el);
			if (!t) {
				var elOffset = el.offset().left;
				var elHeight = par.children().width();
				var windowHeight = $(window).width();
				var offset;
				if (elHeight < windowHeight) {
					offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
				} else {
					offset = elOffset;
				}
				$('#weeks-wrapper').parent().animate({
					scrollLeft: offset
				}, 10);
			}
		},
		_isElementInViewport: function(el) {
			if (typeof jQuery === "function" && el instanceof jQuery) {
				el = el[0];
			}
			var rect = el.getBoundingClientRect();
			return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
		},
		dragMoveListener: function(event) {
			var target = event.target,
				x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
			target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		nextMonth: function() {
			currentYear = moment([calendar.year, calendar.month, calendar.date]).add(1, 'months').year();
			currentMonth = moment([calendar.year, calendar.month, calendar.date]).add(1, 'months').month();
		},
		previousMonth: function() {
			currentYear = moment([calendar.year, calendar.month, calendar.date]).subtract(1, 'months').year();
			currentMonth = moment([calendar.year, calendar.month, calendar.date]).subtract(1, 'months').month();
		},
		today: function() {
			calendar.year = moment().year();
			calendar.month = moment().month();
			calendar.date = moment().format("D");
		},
		_setLocale: function() {
			moment.locale(settings.locale);
		},
		_setDate: function(d) {
			calendar.month = moment(d).month();
			calendar.year = moment(d).year();
			calendar.date = moment(d).format("D");
			calendar.dayOfWeek = moment(d).day();
			calendar.monthLong = moment(d).format('MMM');
		},
		_getDate: function(format) {
			if (format == null) {
				format = 'MMMM Do YYYY'
			}
			return moment([calendar.year, calendar.month, calendar.date]).format(format);
		},

    };

}();

var EventsSidebar = function () {

    // Handles event sidebar toggler
    var handleEventsSidebarToggler = function () {
        // quick sidebar toggler
        $('.calendar .event-container,.page-quick-events-close').click(function (e) {
            $('body').toggleClass('page-quick-events-sidebar-open'); 
        });
    };

    // Handles event sidebar content
    var handleEventsSidebarContent = function () {
        var wrapper = $('.page-quick-events-sidebar-wrapper');

        var initContentSlimScroll = function () {
            var contentContainer = wrapper.find('.page-quick-events-content');
            var contentContainerHeight;
            contentContainerHeight = wrapper.height() - wrapper.find('.page-quick-events-header').outerHeight();
            App.destroySlimScroll(contentContainer);
            contentContainer.attr("data-height", contentContainerHeight);
            App.initSlimScroll(contentContainer);
        };

        initContentSlimScroll();
        App.addResizeHandler(initContentSlimScroll); // reinitialize on window resize
    };
    return {

        init: function () {
            //layout handlers
            handleEventsSidebarToggler(); 
            handleEventsSidebarContent();
        }
    };

}();

jQuery(document).ready(function() {    
   BrownsCalendar.init();
   EventsSidebar.init();
});