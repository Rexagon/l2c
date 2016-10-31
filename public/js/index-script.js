
$(document).ready(function() {

    var scrolled = true;

    var aboutOffset = $(window).width() / 4;
    var aboutOffsetTarget = $("#block-timeline").offset().top - aboutOffset;

    var menuOffsetTarget = $("#block-about").offset().top - 100;
    var previousScroll = 0;
    $(window).scroll(function(){
        var currentScroll = $(this).scrollTop();

        if ($(this).scrollTop() > menuOffsetTarget) {
            $('#menu').attr('class', '');
        } else {
            $('#menu').attr('class', 'light');
        }

        var scrollTop = $(this).scrollTop();
        if (scrollTop > aboutOffsetTarget && scrollTop < aboutOffsetTarget + aboutOffset && scrolled && currentScroll > previousScroll) {
            scrolled = false;
            $('html, body').animate({
                scrollTop: aboutOffsetTarget + aboutOffset
            }, 600, function() {
                scrolled = true;
            });
        }

        if (scrollTop >= aboutOffsetTarget + aboutOffset - 10) {
            $('#monitor').removeClass('disabled');
            $('#monitor-disabled').animate({
                opacity: 0
            }, 300, function() {
                $(this).remove();
            });
        }

        previousScroll = currentScroll;
    });

    $('#menu-toggle').click(function() {
        $('#topnav').toggleClass('responsive');
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                scrolled = true;
                $('#topnav').removeClass('responsive');
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    var phraseBlock = $('#greeting-text');
    var phrases = ['L2C - выводим Ваш бизнес в онлайн', 'Web и mobile технологии работают на вас', 'Поднимаем продажи и сокращаем расходы', 'Мы зарабатываем, когда вы довольны результатом!'];
    var i = 1;
    setInterval(function(){
        phraseBlock.text(phrases[i++ % phrases.length]);
    }, 5000);
});
