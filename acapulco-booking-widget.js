/* ACAPULCO BOOKING WIDGET - EXTERNAL JS */
/* Version 2.0.0 - Child Age Selection Support */

(function() {
    'use strict';

    var container = document.getElementById('acapulco_booking_widget');
    if (!container) {
        console.error('Acapulco Widget: Container #acapulco_booking_widget not found');
        return;
    }

    // Age options: 0-1 (infant) then 1..17
    var AGE_OPTIONS = [
        { value: 0,  label: '0-1' },
        { value: 1,  label: '1' },
        { value: 2,  label: '2' },
        { value: 3,  label: '3' },
        { value: 4,  label: '4' },
        { value: 5,  label: '5' },
        { value: 6,  label: '6' },
        { value: 7,  label: '7' },
        { value: 8,  label: '8' },
        { value: 9,  label: '9' },
        { value: 10, label: '10' },
        { value: 11, label: '11' },
        { value: 12, label: '12' },
        { value: 13, label: '13' },
        { value: 14, label: '14' },
        { value: 15, label: '15' },
        { value: 16, label: '16' },
        { value: 17, label: '17' }
    ];

    container.innerHTML =
    '<div class="acapulco-widget-horizontal">' +
      '<form class="acapulco-form-horizontal" id="acapulcoBookingWidget">' +
        '<div class="acapulco-field-horizontal" id="checkinField">' +
          '<label class="acapulco-field-label">Check In</label>' +
          '<div class="acapulco-field-content">' +
            '<svg class="acapulco-field-icon acapulco-calendar-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' +
            '<input type="text" class="acapulco-date-input" id="checkinInput" readonly placeholder="Select date">' +
          '</div>' +
        '</div>' +
        '<div class="acapulco-field-horizontal" id="checkoutField">' +
          '<label class="acapulco-field-label">Check Out</label>' +
          '<div class="acapulco-field-content">' +
            '<svg class="acapulco-field-icon acapulco-calendar-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' +
            '<input type="text" class="acapulco-date-input" id="checkoutInput" readonly placeholder="Select date">' +
          '</div>' +
        '</div>' +
        '<div class="acapulco-field-horizontal acapulco-guest-selector" id="guestField">' +
          '<label class="acapulco-field-label">Guest</label>' +
          '<div class="acapulco-field-content acapulco-guest-display" id="guestDisplayBtn">' +
            '<svg class="acapulco-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' +
            '<span class="acapulco-guest-text" id="guestDisplayText">1 Room, 2 Adults, 0 Child</span>' +
          '</div>' +
          '<div class="acapulco-guest-dropdown" id="guestDropdownPanel">' +
            '<div class="acapulco-guest-row">' +
              '<span class="acapulco-guest-label">Rooms</span>' +
              '<div class="acapulco-guest-controls">' +
                '<button type="button" class="acapulco-guest-btn" id="roomDecrement">&minus;</button>' +
                '<span class="acapulco-guest-count" id="roomValue">1</span>' +
                '<button type="button" class="acapulco-guest-btn" id="roomIncrement">+</button>' +
              '</div>' +
            '</div>' +
            '<div class="acapulco-guest-row">' +
              '<span class="acapulco-guest-label">Adults</span>' +
              '<div class="acapulco-guest-controls">' +
                '<button type="button" class="acapulco-guest-btn" id="adultDecrement">&minus;</button>' +
                '<span class="acapulco-guest-count" id="adultValue">2</span>' +
                '<button type="button" class="acapulco-guest-btn" id="adultIncrement">+</button>' +
              '</div>' +
            '</div>' +
            '<div class="acapulco-guest-row">' +
              '<span class="acapulco-guest-label">Children</span>' +
              '<div class="acapulco-guest-controls">' +
                '<button type="button" class="acapulco-guest-btn" id="childDecrement">&minus;</button>' +
                '<span class="acapulco-guest-count" id="childValue">0</span>' +
                '<button type="button" class="acapulco-guest-btn" id="childIncrement">+</button>' +
              '</div>' +
            '</div>' +
            '<div class="acapulco-child-ages" id="childAgesContainer"></div>' +
            '<div class="acapulco-age-note" id="childAgeNote">Children aged 0-6 stay free of charge.</div>' +
            '<div class="acapulco-guest-done-wrap">' +
              '<button type="button" class="acapulco-guest-done" id="guestDoneBtn">Done</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="acapulco-button-container">' +
          '<button type="submit" class="acapulco-book-now-btn pulse">Book Now</button>' +
        '</div>' +
      '</form>' +
    '</div>';

    var widgetState = {
        checkin: null,
        checkout: null,
        rooms: 1,
        adults: 2,
        children: 0,
        childAges: []
    };

    function initializeWidget() {
        if (typeof flatpickr === 'undefined') {
            console.warn('Acapulco Widget: Flatpickr not loaded yet, retrying...');
            setTimeout(function() {
                if (typeof flatpickr !== 'undefined') {
                    setupDatePickers();
                    setupGuestSelector();
                    setupFormSubmission();
                    setDefaultDates();
                    renderChildAges();
                    console.log('Widget initialized (retry)');
                } else {
                    console.error('Acapulco Widget: Flatpickr still not available');
                }
            }, 600);
            return;
        }

        setupDatePickers();
        setupGuestSelector();
        setupFormSubmission();
        setDefaultDates();
        renderChildAges();
        console.log('Widget initialized successfully');
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
        return month + '/' + day + '/' + date.getFullYear();
    }

    function setupDatePickers() {
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        var checkinPicker = flatpickr('#checkinInput', {
            minDate: 'today',
            dateFormat: 'm/d/Y',
            defaultDate: today,
            onReady: function(sd, dateStr) { widgetState.checkin = dateStr; },
            onChange: function(sd, dateStr) {
                widgetState.checkin = dateStr;
                if (checkoutPicker && sd[0]) {
                    var nextDay = new Date(sd[0]);
                    nextDay.setDate(nextDay.getDate() + 1);
                    checkoutPicker.set('minDate', nextDay);
                    if (!checkoutPicker.selectedDates[0] || checkoutPicker.selectedDates[0] <= sd[0]) {
                        checkoutPicker.setDate(nextDay, true);
                    }
                }
            }
        });

        var checkoutPicker = flatpickr('#checkoutInput', {
            minDate: tomorrow,
            dateFormat: 'm/d/Y',
            defaultDate: tomorrow,
            onReady: function(sd, dateStr) { widgetState.checkout = dateStr; },
            onChange: function(sd, dateStr) { widgetState.checkout = dateStr; }
        });

        widgetState._checkinPicker = checkinPicker;
        widgetState._checkoutPicker = checkoutPicker;

        var checkinField = document.getElementById('checkinField');
        var checkoutField = document.getElementById('checkoutField');

        if (checkinField) {
            checkinField.addEventListener('click', function(e) {
                e.preventDefault();
                checkinPicker.open();
            });
        }
        if (checkoutField) {
            checkoutField.addEventListener('click', function(e) {
                e.preventDefault();
                checkoutPicker.open();
            });
        }
    }

    function setupGuestSelector() {
        var dropdown = document.getElementById('guestDropdownPanel');
        var guestField = document.getElementById('guestField');
        var doneBtn = document.getElementById('guestDoneBtn');

        if (!dropdown || !guestField) return;

        guestField.addEventListener('click', function(e) {
            // Don't toggle when interacting inside the dropdown
            if (dropdown.contains(e.target)) return;
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        if (doneBtn) {
            doneBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.remove('active');
            });
        }

        document.addEventListener('click', function(e) {
            if (!guestField.contains(e.target)) {
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

        function updateButtonStates() {
            decrementBtn.disabled = widgetState[propName] <= min;
            incrementBtn.disabled = widgetState[propName] >= max;
        }

        decrementBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (widgetState[propName] > min) {
                widgetState[propName]--;
                valueDisplay.textContent = widgetState[propName];
                if (propName === 'children') syncChildAges();
                updateGuestDisplay();
                updateButtonStates();
            }
        });

        incrementBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (widgetState[propName] < max) {
                widgetState[propName]++;
                valueDisplay.textContent = widgetState[propName];
                if (propName === 'children') syncChildAges();
                updateGuestDisplay();
                updateButtonStates();
            }
        });

        valueDisplay.textContent = widgetState[propName];
        updateButtonStates();
    }

    // Keep childAges array in sync with children count
    function syncChildAges() {
        var count = widgetState.children;
        var ages = widgetState.childAges;

        while (ages.length < count) ages.push(null);
        while (ages.length > count) ages.pop();

        renderChildAges();
    }

    function renderChildAges() {
        var wrap = document.getElementById('childAgesContainer');
        var note = document.getElementById('childAgeNote');
        if (!wrap) return;

        if (widgetState.children === 0) {
            wrap.innerHTML = '';
            if (note) note.style.display = 'none';
            return;
        }

        if (note) note.style.display = 'block';

        var html = '';
        for (var i = 0; i < widgetState.children; i++) {
            html += '<div class="acapulco-guest-row acapulco-age-row">' +
                      '<span class="acapulco-guest-label">Age (Child ' + (i + 1) + ')</span>' +
                      '<select class="acapulco-age-select" data-child-index="' + i + '">' +
                        '<option value="">Select</option>';
            for (var j = 0; j < AGE_OPTIONS.length; j++) {
                var opt = AGE_OPTIONS[j];
                var selected = (widgetState.childAges[i] === opt.value) ? ' selected' : '';
                html += '<option value="' + opt.value + '"' + selected + '>' + opt.label + '</option>';
            }
            html += '</select></div>';
        }
        wrap.innerHTML = html;

        var selects = wrap.querySelectorAll('.acapulco-age-select');
        for (var k = 0; k < selects.length; k++) {
            selects[k].addEventListener('change', function(e) {
                var idx = parseInt(this.getAttribute('data-child-index'), 10);
                var val = this.value;
                widgetState.childAges[idx] = (val === '') ? null : parseInt(val, 10);
                this.classList.remove('acapulco-age-error');
                updateGuestDisplay();
            });
            selects[k].addEventListener('click', function(e) { e.stopPropagation(); });
        }
    }

    function updateGuestDisplay() {
        var displayText = document.getElementById('guestDisplayText');
        if (!displayText) return;
        var text = widgetState.rooms + ' Room' + (widgetState.rooms > 1 ? 's' : '') + ', ' +
                   widgetState.adults + ' Adult' + (widgetState.adults > 1 ? 's' : '') + ', ' +
                   widgetState.children + ' Child' + (widgetState.children > 1 ? 'ren' : '');
        displayText.textContent = text;
    }

    function setupFormSubmission() {
        var form = document.getElementById('acapulcoBookingWidget');
        var submitBtn = form ? form.querySelector('.acapulco-book-now-btn') : null;
        if (!form || !submitBtn) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate child ages
            if (widgetState.children > 0) {
                var missing = false;
                var selects = document.querySelectorAll('.acapulco-age-select');
                for (var m = 0; m < widgetState.children; m++) {
                    if (widgetState.childAges[m] === null || widgetState.childAges[m] === undefined) {
                        missing = true;
                        if (selects[m]) selects[m].classList.add('acapulco-age-error');
                    }
                }
                if (missing) {
                    var dropdown = document.getElementById('guestDropdownPanel');
                    if (dropdown) dropdown.classList.add('active');
                    return;
                }
            }

            submitBtn.innerHTML = 'Loading...<span class="acapulco-loading"></span>';
            submitBtn.disabled = true;

            var checkinDateObj, checkoutDateObj;

            if (widgetState._checkinPicker && widgetState._checkinPicker.selectedDates[0]) {
                checkinDateObj = widgetState._checkinPicker.selectedDates[0];
            } else if (widgetState.checkin) {
                var cP = widgetState.checkin.split('/');
                checkinDateObj = new Date(cP[2], cP[0] - 1, cP[1]);
            } else {
                checkinDateObj = new Date();
            }

            if (widgetState._checkoutPicker && widgetState._checkoutPicker.selectedDates[0]) {
                checkoutDateObj = widgetState._checkoutPicker.selectedDates[0];
            } else if (widgetState.checkout) {
                var coP = widgetState.checkout.split('/');
                checkoutDateObj = new Date(coP[2], coP[0] - 1, coP[1]);
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

            var roomAdults = new Array(roomCount).fill(0);
            var roomChildAges = [];
            for (var r = 0; r < roomCount; r++) roomChildAges.push([]);

            var remainingAdults = totalAdult;
            var idx = 0;
            while (remainingAdults > 0 && roomCount > 0) {
                roomAdults[idx]++;
                remainingAdults--;
                idx = (idx + 1) % roomCount;
            }

            // Distribute children (with their ages) across rooms
            idx = 0;
            for (var c = 0; c < totalChild; c++) {
                var age = widgetState.childAges[c];
                roomChildAges[idx].push(age === null || age === undefined ? 0 : age);
                idx = (idx + 1) % roomCount;
            }

            var roomsArr = [];
            var guestRooms = {};

            for (var i = 0; i < roomCount; i++) {
                var childCount = roomChildAges[i].length;
                var guestCount = roomAdults[i] + childCount;
                var roomInfo = {
                    adult_count: roomAdults[i],
                    guest_count: guestCount,
                    child_count: childCount,
                    child_ages: roomChildAges[i]
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
            var bookingUrl = 'https://reservation.acapulco.com.tr/bv3/search?search=' +
                             encoded + '&locale=en-US&currency=EUR';

            console.log('Booking payload:', searchPayload);

            setTimeout(function() { window.location.href = bookingUrl; }, 600);
        });
    }

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            var btn = document.querySelector('.acapulco-book-now-btn');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'Book Now';
            }
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWidget);
    } else {
        initializeWidget();
    }
})();
