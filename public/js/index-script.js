
$(document).ready(function() {
    var targetOffset = $("#block-about").offset().top - 100;

    var w = $(window).scroll(function(){
        if (w.scrollTop() > targetOffset) {
            $('#menu').attr('class', '');
        } else {
            $('#menu').attr('class', 'light');
        }
    });

    $('#menu-toggle').click(function() {
        var x = document.getElementById("topnav");

        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    var phraseBlock = $('#greeting-text');
    var phrases = ['мотивируящая фраза 1', 'ещё одна фраза', 'что-то там про чего-то', 'вы лучшие. отвечаю'];
    var i = 1;
    setInterval(function(){
        phraseBlock.text(phrases[i++ % phrases.length]);
    }, 5000);
});
