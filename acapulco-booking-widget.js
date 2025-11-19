/* ACAPULCO BOOKING WIDGET - EXTERNAL JS */
/* Host this file on your server or CDN */
/* Version 1.0.0 */

(function() {
    'use strict';
    
    // Inject widget HTML
    var container = document.getElementById('acapulco_booking_widget');
    if (!container) {
        console.error('Acapulco Widget: Container element #acapulco_booking_widget not found');
        return;
    }
    
    container.innerHTML = '<div class="acapulco-widget-horizontal"><form class="acapulco-form-horizontal" id="acapulcoBookingWidget"><div class="acapulco-field-horizontal"><label class="acapulco-field-label">Check In</label><div class="acapulco-field-content"><svg class="acapulco-field-icon acapulco-calendar-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><input type="text" class="acapulco-date-input" id="checkinInput" readonly placeholder="Select date"></div></div><div class="acapulco-field-horizontal"><label class="acapulco-field-label">Check Out</label><div class="acapulco-field-content"><svg class="acapulco-field-icon acapulco-calendar-icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg><input type="text" class="acapulco-date-input" id="checkoutInput" readonly placeholder="Select date"></div></div><div class="acapulco-field-horizontal acapulco-guest-selector"><label class="acapulco-field-label">Guest</label><div class="acapulco-field-content acapulco-guest-display" id="guestDisplayBtn"><svg class="acapulco-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><span class="acapulco-guest-text" id="guestDisplayText">1 Room, 2 Adult, 0 Child</span></div><div class="acapulco-guest-dropdown" id="guestDropdownPanel"><div class="acapulco-guest-row"><span class="acapulco-guest-label">Rooms</span><div class="acapulco-guest-controls"><button type="button" class="acapulco-guest-btn" id="roomDecrement">−</button><span class="acapulco-guest-count" id="roomValue">1</span><button type="button" class="acapulco-guest-btn" id="roomIncrement">+</button></div></div><div class="acapulco-guest-row"><span class="acapulco-guest-label">Adults</span><div class="acapulco-guest-controls"><button type="button" class="acapulco-guest-btn" id="adultDecrement">−</button><span class="acapulco-guest-count" id="adultValue">2</span><button type="button" class="acapulco-guest-btn" id="adultIncrement">+</button></div></div><div class="acapulco-guest-row"><span class="acapulco-guest-label">Children</span><div class="acapulco-guest-controls"><button type="button" class="acapulco-guest-btn" id="childDecrement">−</button><span class="acapulco-guest-count" id="childValue">0</span><button type="button" class="acapulco-guest-btn" id="childIncrement">+</button></div></div></div></div><div class="acapulco-button-container"><button type="submit" class="acapulco-book-now-btn pulse">Book Now</button></div></form></div>';
    
    // Widget state
    var widgetState = {
        checkin: null,
        checkout: null,
        rooms: 1,
        adults: 2,
        children: 0
    };
    
    // Initialize
    function initializeWidget() {
        // Check if flatpickr is loaded
        if (typeof flatpickr === 'undefined') {
            console.error('Acapulco Widget: Flatpickr library not loaded. Please include: https://cdn.jsdelivr.net/npm/flatpickr');
            return;
        }
        
        setupDatePickers();
        setupGuestSelector();
        setupFormSubmission();
        setDefaultDates();
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
    
    function setupDatePickers() {
        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        var checkinPicker = flatpickr('#checkinInput', {
            minDate: 'today',
            dateFormat: 'm/d/Y',
            defaultDate: today,
            onChange: function(selectedDates, dateStr) {
                widgetState.checkin = dateStr;
                if (checkoutPicker) {
                    var nextDay = new Date(selectedDates[0]);
                    nextDay.setDate(nextDay.getDate() + 1);
                    checkoutPicker.set('minDate', nextDay);
                    if (checkoutPicker.selectedDates[0] <= selectedDates[0]) {
                        checkoutPicker.setDate(nextDay);
                    }
                }
            }
        });
        
        var checkoutPicker = flatpickr('#checkoutInput', {
            minDate: tomorrow,
            dateFormat: 'm/d/Y',
            defaultDate: tomorrow,
            onChange: function(selectedDates, dateStr) {
                widgetState.checkout = dateStr;
            }
        });
        
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
            
            submitBtn.innerHTML = 'Loading...<span class="acapulco-loading"></span>';
            submitBtn.disabled = true;
            
            var checkinParts = widgetState.checkin.split('/');
            var checkoutParts = widgetState.checkout.split('/');
            var checkinFormatted = checkinParts[2] + '-' + checkinParts[0] + '-' + checkinParts[1];
            var checkoutFormatted = checkoutParts[2] + '-' + checkoutParts[0] + '-' + checkoutParts[1];
            
            var params = new URLSearchParams({
                checkin: checkinFormatted,
                checkout: checkoutFormatted,
                rooms: widgetState.rooms,
                adults: widgetState.adults,
                children: widgetState.children
            });
            
            var bookingUrl = 'https://acapulco-resort-convention-spa.hotelrunner.com/bv3/search?' + params.toString();
            
            setTimeout(function() {
                window.location.href = bookingUrl;
            }, 600);
        });
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWidget);
    } else {
        initializeWidget();
    }
})();
