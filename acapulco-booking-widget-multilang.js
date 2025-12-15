/* ACAPULCO BOOKING WIDGET - MULTI-LANGUAGE VERSION */
/* Supports: English, Turkish, German, Russian */
/* Version 2.0.0 */

(function() {
    'use strict';
    
    // ============================================
    // TRANSLATIONS
    // ============================================
    var translations = {
        en: {
            checkIn: 'Check In',
            checkOut: 'Check Out',
            guest: 'Guest',
            guests: 'Guests',
            rooms: 'Rooms',
            adults: 'Adults',
            children: 'Children',
            bookNow: 'Book Now',
            loading: 'Loading...',
            selectDate: 'Select date',
            room: 'Room',
            adult: 'Adult',
            child: 'Child',
            flatpickrLocale: null // English is default
        },
        tr: {
            checkIn: 'Giriş',
            checkOut: 'Çıkış',
            guest: 'Misafir',
            guests: 'Misafirler',
            rooms: 'Odalar',
            adults: 'Yetişkinler',
            children: 'Çocuklar',
            bookNow: 'Rezervasyon Yap',
            loading: 'Yükleniyor...',
            selectDate: 'Tarih seçin',
            room: 'Oda',
            adult: 'Yetişkin',
            child: 'Çocuk',
            flatpickrLocale: 'tr'
        },
        de: {
            checkIn: 'Anreise',
            checkOut: 'Abreise',
            guest: 'Gast',
            guests: 'Gäste',
            rooms: 'Zimmer',
            adults: 'Erwachsene',
            children: 'Kinder',
            bookNow: 'Jetzt Buchen',
            loading: 'Lädt...',
            selectDate: 'Datum wählen',
            room: 'Zimmer',
            adult: 'Erwachsene',
            child: 'Kind',
            flatpickrLocale: 'de'
        },
        ru: {
            checkIn: 'Заезд',
            checkOut: 'Выезд',
            guest: 'Гость',
            guests: 'Гости',
            rooms: 'Номера',
            adults: 'Взрослые',
            children: 'Дети',
            bookNow: 'Забронировать',
            loading: 'Загрузка...',
            selectDate: 'Выберите дату',
            room: 'Номер',
            adult: 'Взрослый',
            child: 'Ребенок',
            flatpickrLocale: 'ru'
        }
    };
    
    // ============================================
    // LANGUAGE DETECTION
    // ============================================
    function detectLanguage() {
        var container = document.getElementById('acapulco_booking_widget');
        
        // Priority 1: data-lang attribute on container
        if (container && container.getAttribute('data-lang')) {
            var lang = container.getAttribute('data-lang').toLowerCase();
            if (translations[lang]) return lang;
        }
        
        // Priority 2: data-lang on body
        var bodyLang = document.body.getAttribute('data-lang');
        if (bodyLang && translations[bodyLang.toLowerCase()]) {
            return bodyLang.toLowerCase();
        }
        
        // Priority 3: HTML lang attribute
        var htmlLang = document.documentElement.lang;
        if (htmlLang) {
            var langCode = htmlLang.split('-')[0].toLowerCase();
            if (translations[langCode]) return langCode;
        }
        
        // Priority 4: Browser language
        var browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            var code = browserLang.split('-')[0].toLowerCase();
            if (translations[code]) return code;
        }
        
        // Default: English
        return 'en';
    }
    
    var currentLang = detectLanguage();
    var t = translations[currentLang];
    
    // ============================================
    // INJECT WIDGET HTML
    // ============================================
    var container = document.getElementById('acapulco_booking_widget');
    if (!container) {
        console.error('Acapulco Widget: Container element #acapulco_booking_widget not found');
        return;
    }
    
    container.innerHTML = '<div class="acapulco-widget-horizontal"><form class="acapulco-form-horizontal" id="acapulcoBookingWidget">' +
        '<div class="acapulco-field-horizontal">' +
            '<label class="acapulco-field-label">' + t.checkIn + '</label>' +
            '<div class="acapulco-field-content">' +
                '<svg class="acapulco-field-icon acapulco-calendar-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' +
                '<input type="text" class="acapulco-date-input" id="checkinInput" readonly placeholder="' + t.selectDate + '">' +
            '</div>' +
        '</div>' +
        '<div class="acapulco-field-horizontal">' +
            '<label class="acapulco-field-label">' + t.checkOut + '</label>' +
            '<div class="acapulco-field-content">' +
                '<svg class="acapulco-field-icon acapulco-calendar-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' +
                '<input type="text" class="acapulco-date-input" id="checkoutInput" readonly placeholder="' + t.selectDate + '">' +
            '</div>' +
        '</div>' +
        '<div class="acapulco-field-horizontal acapulco-guest-selector">' +
            '<label class="acapulco-field-label">' + t.guest + '</label>' +
            '<div class="acapulco-field-content acapulco-guest-display" id="guestDisplayBtn">' +
                '<svg class="acapulco-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' +
                '<span class="acapulco-guest-text" id="guestDisplayText"></span>' +
            '</div>' +
            '<div class="acapulco-guest-dropdown" id="guestDropdownPanel">' +
                '<div class="acapulco-guest-row">' +
                    '<span class="acapulco-guest-label">' + t.rooms + '</span>' +
                    '<div class="acapulco-guest-controls">' +
                        '<button type="button" class="acapulco-guest-btn" id="roomDecrement">−</button>' +
                        '<span class="acapulco-guest-count" id="roomValue">1</span>' +
                        '<button type="button" class="acapulco-guest-btn" id="roomIncrement">+</button>' +
                    '</div>' +
                '</div>' +
                '<div class="acapulco-guest-row">' +
                    '<span class="acapulco-guest-label">' + t.adults + '</span>' +
                    '<div class="acapulco-guest-controls">' +
                        '<button type="button" class="acapulco-guest-btn" id="adultDecrement">−</button>' +
                        '<span class="acapulco-guest-count" id="adultValue">2</span>' +
                        '<button type="button" class="acapulco-guest-btn" id="adultIncrement">+</button>' +
                    '</div>' +
                '</div>' +
                '<div class="acapulco-guest-row">' +
                    '<span class="acapulco-guest-label">' + t.children + '</span>' +
                    '<div class="acapulco-guest-controls">' +
                        '<button type="button" class="acapulco-guest-btn" id="childDecrement">−</button>' +
                        '<span class="acapulco-guest-count" id="childValue">0</span>' +
                        '<button type="button" class="acapulco-guest-btn" id="childIncrement">+</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="acapulco-button-container">' +
            '<button type="submit" class="acapulco-book-now-btn pulse">' + t.bookNow + '</button>' +
        '</div>' +
    '</form></div>';
    
    // Widget state
    var widgetState = {
        checkin: null,
        checkout: null,
        rooms: 1,
        adults: 2,
        children: 0
    };
    
    // ============================================
    // INITIALIZE
    // ============================================
    function initializeWidget() {
        if (typeof flatpickr === 'undefined') {
  var tries = 0;
  var timer = setInterval(function () {
    if (typeof flatpickr !== 'undefined') {
      clearInterval(timer);
      initializeWidget();
    } else if (++tries > 50) {
      clearInterval(timer);
      console.error('Acapulco Widget: Flatpickr library not loaded (timeout)');
    }
  }, 100);
  return;
}

        
        loadFlatpickrLocale(function() {
            setupDatePickers();
            setupGuestSelector();
            setupFormSubmission();
            setDefaultDates();
            updateGuestDisplay(); // Set initial guest text
        });
    }
    
    // ============================================
    // FLATPICKR LOCALE LOADER
    // ============================================
    function loadFlatpickrLocale(callback) {
        if (!t.flatpickrLocale || currentLang === 'en') {
            callback();
            return;
        }
        
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/' + t.flatpickrLocale + '.js';
        script.onload = callback;
        script.onerror = function() {
            console.warn('Could not load Flatpickr locale:', t.flatpickrLocale);
            callback();
        };
        document.head.appendChild(script);
    }
    
    function setDefaultDates() {
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        widgetState.checkin = formatDate(today);
        widgetState.checkout = formatDate(tomorrow);
    }
    
    function formatDate(date) {
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        var year = date.getFullYear();
        return month + '/' + day + '/' + year;
    }
    
    // ============================================
    // DATE PICKERS
    // ============================================
    function setupDatePickers() {
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        var flatpickrConfig = {
            minDate: 'today',
            dateFormat: 'm/d/Y',
            defaultDate: today
        };
        
        // Add locale if not English
        if (t.flatpickrLocale && flatpickr.l10ns[t.flatpickrLocale]) {
            flatpickrConfig.locale = flatpickr.l10ns[t.flatpickrLocale];
        }
        
        var checkinConfig = Object.assign({}, flatpickrConfig, {
            onReady: function(selectedDates, dateStr) {
                widgetState.checkin = dateStr;
            },
            onChange: function(selectedDates, dateStr) {
                widgetState.checkin = dateStr;
                if (checkoutPicker && selectedDates[0]) {
                    var nextDay = new Date(selectedDates[0]);
                    nextDay.setDate(nextDay.getDate() + 1);
                    checkoutPicker.set('minDate', nextDay);
                    if (!checkoutPicker.selectedDates[0] || checkoutPicker.selectedDates[0] <= selectedDates[0]) {
                        checkoutPicker.setDate(nextDay, true);
                    }
                }
            }
        });
        
        var checkoutConfig = Object.assign({}, flatpickrConfig, {
            minDate: tomorrow,
            defaultDate: tomorrow,
            onReady: function(selectedDates, dateStr) {
                widgetState.checkout = dateStr;
            },
            onChange: function(selectedDates, dateStr) {
                widgetState.checkout = dateStr;
            }
        });
        
        var checkinPicker = flatpickr('#checkinInput', checkinConfig);
        var checkoutPicker = flatpickr('#checkoutInput', checkoutConfig);
        
        widgetState._checkinPicker = checkinPicker;
        widgetState._checkoutPicker = checkoutPicker;
        
        var checkinField = document.querySelector('.acapulco-field-horizontal:nth-child(1)');
        var checkoutField = document.querySelector('.acapulco-field-horizontal:nth-child(2)');
        
        if (checkinField) {
            checkinField.addEventListener('click', function(e) {
                if (!e.target.classList.contains('acapulco-date-input')) {
                    checkinPicker.open();
                }
            });
            checkinField.style.cursor = 'pointer';
        }
        
        if (checkoutField) {
            checkoutField.addEventListener('click', function(e) {
                if (!e.target.classList.contains('acapulco-date-input')) {
                    checkoutPicker.open();
                }
            });
            checkoutField.style.cursor = 'pointer';
        }
    }
    
    // ============================================
    // GUEST SELECTOR
    // ============================================
    function setupGuestSelector() {
        var displayBtn = document.getElementById('guestDisplayBtn');
        var dropdown = document.getElementById('guestDropdownPanel');
        
        if (!displayBtn || !dropdown) return;
        
        displayBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target) && !displayBtn.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        setupCounter('room', 1, 10);
        setupCounter('adult', 1, 20);
        setupCounter('child', 0, 10);
    }
    
    function setupCounter(type, min, max) {
        var decrementBtn = document.getElementById(type + 'Decrement');
        var incrementBtn = document.getElementById(type + 'Increment');
        var valueDisplay = document.getElementById(type + 'Value');
        
        if (!decrementBtn || !incrementBtn || !valueDisplay) return;
        
        var propName = type === 'room' ? 'rooms' : type === 'adult' ? 'adults' : 'children';
        
        decrementBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (widgetState[propName] > min) {
                widgetState[propName]--;
                valueDisplay.textContent = widgetState[propName];
                updateGuestDisplay();
                updateButtonStates();
            }
        });
        
        incrementBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (widgetState[propName] < max) {
                widgetState[propName]++;
                valueDisplay.textContent = widgetState[propName];
                updateGuestDisplay();
                updateButtonStates();
            }
        });
        
        function updateButtonStates() {
            decrementBtn.disabled = widgetState[propName] <= min;
            incrementBtn.disabled = widgetState[propName] >= max;
        }
        
        valueDisplay.textContent = widgetState[propName];
        updateButtonStates();
    }
    
    function updateGuestDisplay() {
        var displayText = document.getElementById('guestDisplayText');
        if (!displayText) return;
        
        var roomText = widgetState.rooms + ' ' + (widgetState.rooms > 1 ? t.rooms : t.room);
        var adultText = widgetState.adults + ' ' + (widgetState.adults > 1 ? t.adults : t.adult);
        var childText = widgetState.children + ' ' + (widgetState.children > 1 ? t.children : t.child);
        
        var text = roomText + ', ' + adultText + ', ' + childText;
        displayText.textContent = text;
    }
    
    // ============================================
    // FORM SUBMISSION
    // ============================================
    function setupFormSubmission() {
        var form = document.getElementById('acapulcoBookingWidget');
        var submitBtn = form ? form.querySelector('.acapulco-book-now-btn') : null;
        
        if (!form || !submitBtn) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            submitBtn.innerHTML = t.loading + '<span class="acapulco-loading"></span>';
            submitBtn.disabled = true;
            
            var checkinDateObj, checkoutDateObj;
            
            if (widgetState._checkinPicker && widgetState._checkinPicker.selectedDates[0]) {
                checkinDateObj = widgetState._checkinPicker.selectedDates[0];
            } else if (widgetState.checkin) {
                var cParts = widgetState.checkin.split('/');
                checkinDateObj = new Date(cParts[2], cParts[0] - 1, cParts[1]);
            } else {
                checkinDateObj = new Date();
            }
            
            if (widgetState._checkoutPicker && widgetState._checkoutPicker.selectedDates[0]) {
                checkoutDateObj = widgetState._checkoutPicker.selectedDates[0];
            } else if (widgetState.checkout) {
                var coParts = widgetState.checkout.split('/');
                checkoutDateObj = new Date(coParts[2], coParts[0] - 1, coParts[1]);
            } else {
                checkoutDateObj = new Date(checkinDateObj);
                checkoutDateObj.setDate(checkinDateObj.getDate() + 1);
            }
            
            function formatYMD(date) {
                var y = date.getFullYear();
                var m = String(date.getMonth() + 1).padStart(2, '0');
                var d = String(date.getDate()).padStart(2, '0');
                return y + '-' + m + '-' + d;
            }
            
            var checkinFormatted = formatYMD(checkinDateObj);
            var checkoutFormatted = formatYMD(checkoutDateObj);
            
            var msPerDay = 24 * 60 * 60 * 1000;
            var dayCount = Math.round((checkoutDateObj - checkinDateObj) / msPerDay);
            if (dayCount < 1) dayCount = 1;
            
            var roomCount = widgetState.rooms || 1;
            var totalAdult = widgetState.adults || 1;
            var totalChild = widgetState.children || 0;
            
            var roomsArr = [];
            var guestRooms = {};
            var roomAdults = new Array(roomCount).fill(0);
            var roomChildren = new Array(roomCount).fill(0);
            
            var remainingAdults = totalAdult;
            var idx = 0;
            while (remainingAdults > 0 && roomCount > 0) {
                roomAdults[idx]++;
                remainingAdults--;
                idx = (idx + 1) % roomCount;
            }
            
            var remainingChildren = totalChild;
            idx = 0;
            while (remainingChildren > 0 && roomCount > 0) {
                roomChildren[idx]++;
                remainingChildren--;
                idx = (idx + 1) % roomCount;
            }
            
            for (var i = 0; i < roomCount; i++) {
                var guestCount = roomAdults[i] + roomChildren[i];
                var roomInfo = {
                    adult_count: roomAdults[i],
                    guest_count: guestCount,
                    child_count: roomChildren[i],
                    child_ages: []
                };
                roomsArr.push(roomInfo);
                guestRooms[String(i)] = roomInfo;
            }
            
            var searchPayload = {
                checkin_date: checkinFormatted,
                checkout_date: checkoutFormatted,
                day_count: dayCount,
                room_count: roomCount,
                total_adult: totalAdult,
                total_child: totalChild,
                rooms: roomsArr,
                guest_rooms: guestRooms
            };
            
            var encoded = encodeURIComponent(JSON.stringify(searchPayload));
            
            var localeMap = {
              en: 'en-US',
              tr: 'tr',
              de: 'de-DE',
              ru: 'ru'
            };

            var container = document.getElementById('acapulco_booking_widget');
            var forcedLocale = container && container.getAttribute('data-locale');

            var locale = forcedLocale || localeMap[currentLang] || 'en-US';

            var bookingUrl =
              'https://reservation.acapulco.com.tr/bv3/search?search=' +
              encoded +
              '&locale=' + encodeURIComponent(locale) +
              '&currency=EUR' +
              '&lang=' + encodeURIComponent(currentLang);
            
            var w = window.open('', '_blank');

            if (w) {
              try { w.opener = null; } catch (err) {}

              w.location.href = bookingUrl;

              setTimeout(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = t.bookNow;
              }, 600);
            } else {
              window.location.href = bookingUrl;
            }
        });
    }
    
    window.addEventListener("pageshow", function(event) {
        if (event.persisted) {
            var btn = document.querySelector(".acapulco-book-now-btn");
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = t.bookNow;
            }
        }
    });
    
    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWidget);
    } else {
        initializeWidget();
    }
})();
