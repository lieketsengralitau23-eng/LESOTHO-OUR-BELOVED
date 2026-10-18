/* Gallery page: Light / Dark  */
function setTheme(mode){
    document.documentElement.setAttribute('data-bs-theme', mode);
}


/* Dark / Light button   */
if (document.getElementById('dark')){
    document.documentElement.dataset.bsTheme = localStorage.theme || 'light';
    document.getElementById('dark').onclick = function(){
        var now = document.documentElement.dataset.bsTheme;
        var next = (now == 'dark') ? 'light' : 'dark';
        document.documentElement.dataset.bsTheme = next;
        localStorage.theme = next;
    };
}


/* Home pagee*/
if (document.getElementById('hello')){
    function greeting(){
        var name = localStorage.visitorName;
        document.getElementById('greet').textContent = name ? 'Khotso, ' + name + '! Welcome back.' : '';
    }
    document.getElementById('hello').onsubmit = function(e){
        e.preventDefault();
        localStorage.visitorName = document.getElementById('visitor').value.trim();
        greeting();
        this.reset();
    };
    greeting();
}


/*Accommodation page  */
if (document.getElementById('rows')){
    var rows = document.querySelectorAll('#rows tr');


    function show(){
        var text = document.getElementById('search').value.toLowerCase();
        var type = document.getElementById('type').value;
        for (var i = 0; i < rows.length; i++){
            var rightType = (type == 'All' || rows[i].dataset.type == type);
            var rightText = rows[i].innerText.toLowerCase().indexOf(text) > -1;
            if (rightType && rightText){ rows[i].classList.remove('d-none'); }
            else { rows[i].classList.add('d-none'); }
        }
    }
    document.getElementById('search').oninput = show;
    document.getElementById('type').onchange = show;
}


/* ===== Destinations page ===== */
if (!document.getElementById('rows') && document.getElementById('search')){
    // Search: hide the cards that do not match what you typed
    function search(){
        var text = document.getElementById('search').value.toLowerCase();
        var cards = document.querySelectorAll('.item');
        for (var i = 0; i < cards.length; i++){
            if (cards[i].innerText.toLowerCase().indexOf(text) > -1){
                cards[i].classList.remove('d-none');
            } else {
                cards[i].classList.add('d-none');
            }
        }
    }
    document.getElementById('search').oninput = search;
}


/* Activities page  */
if (document.getElementById('level')){
    var items = document.querySelectorAll('.item');


    document.getElementById('level').onchange = function(){
        for (var i = 0; i < items.length; i++){
            if (this.value == 'All' || items[i].dataset.level == this.value){ items[i].classList.remove('d-none'); }
            else { items[i].classList.add('d-none'); }
        }
    };
}


/*  Contact page */
if (document.getElementById('book')){
    var book = document.getElementById('book');
    var message = document.getElementById('message');
    var today = new Date().toISOString().slice(0, 10);
    book.date.min = today;


    var names = ['Maletsunyane Falls', 'Ketane Falls', 'Qiloane Falls', 'Thaba-Bosiu', 'Morija Museum', 'Matsieng Footprints', 'Ha Kome Caves', 'Liphofung Cave', 'Basotho Hat', 'Sehlabathebe National Park', 'Tsehlanyane National Park', 'Bokong Nature Reserve', 'Sani Pass', 'Afriski Resort', 'Mafika Lisiu Pass', 'Malealea', 'Thabana Ntlenyana', 'Katse Dam', 'Mohale Dam'];
    var options = '<option value="">Choose...</option>';
    for (var i = 0; i < names.length; i++){
        options += '<option>' + names[i] + '</option>';
    }
    book.place.innerHTML = options;
    function calculate(){
        var total = book.adults.value * book.nights.value * book.stay.value;
        document.getElementById('total').textContent = 'M ' + total;
    }
    book.oninput = calculate;
    calculate();


    function showMessage(id, errors, success){
        var box = document.getElementById(id);
        if (errors.length > 0){
            box.className = 'alert alert-danger';
            box.textContent = errors.join('\n');
        } else {
            box.className = 'alert alert-success';
            box.textContent = success;
        }
    }


    function showLast(){
        if (localStorage.lastBooking){
            document.getElementById('last').textContent = 'Your last booking: ' + localStorage.lastBooking;
        }
    }
    showLast();


    message.onsubmit = function(e){
        e.preventDefault();
        var errors = [];
        if (message.fullname.value.trim().length < 2){ errors.push('Name: write your name.'); }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(message.email.value)){ errors.push('Email: write a correct email address.'); }
        if (message.text.value.trim().length < 10){ errors.push('Message: write at least 10 letters.'); }
        showMessage('msgMsg', errors, 'Thank you ' + message.fullname.value + '! Your message was sent.');
        if (errors.length == 0){ message.reset(); }
    };
}
