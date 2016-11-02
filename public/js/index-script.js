
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
                scrolled = false;
                $('#topnav').removeClass('responsive');
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    scrolled = true;
                });
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


    var dialogs = [{
        description: '<p>Landing Page - посадочная страница или же продающая страница,необходима в том случае,если Вы можете чётко сформулировать: "Что именно Вы хотите от клиента,что он должен сделать?" К примеру, купить утюг, записаться на услугу, оставить Вам свои контакты и т.д</p><br>\
                  <p>Мы создаём продающую страницу,которая отражает все преимущества Вашего товара или услуги,внушает доверие клиента к Вашему бренду,и главное поэтапно ведёт его к совершению ЦЕЛЕВОГО(главного) действия(покупка,запись на приём,отправление Вам контактов).</p>',
        list_title: 'Что Вы получите после создания Landing Page?',
        list: [
            'Увеличения продаж/заказов какой-либо конкретной услуги.', 
            'Получение контактных данных клиента.(используется для рекламы) ',
            'Возможность рассказать большой аудитории о создание нового направления в бизнесе.(продажа нового товара)',
            'Возможность адаптации описания товара для разной аудитории.(Например,если человек ищет "Купить шины в Москве",то именно эту фразу он увидит на посадочной странице и т.д)',
            'Возможность возвращать клиентов,которые хотят уйти с Вашего основного сайта,путём перенаправления их на Landing Page,к примеру,с предоставлением скидки)'
        ],
        addition: 'qqweewe',
        question: 'Как поможет landing page вашему бизнесу?'
    }, {
        description: 'asd',
        list_title: '',
        list: [],
        addition: '',
        question: ''
    }, {
        description: 'q',
        list_title: '',
        list: [],
        addition: '',
        question: ''
    }, {
        description: 'w',
        list_title: '',
        list: [],
        addition: '',
        question: ''
    }, {
        description: 'e',
        list_title: '',
        list: [],
        addition: '',
        question: ''
    }, {
        description: 'r',
        list_title: '',
        list: [],
        addition: '',
        question: ''
    }, {
        description: 't',
        list_title: '',
        list: [],
        addition: '',
        question: ''
    }, {
        description: 'y',
        list_title: '',
        list: [],
        addition: '',
        question: ''
    }];

    var id = -1;
    var modal = $('#modal');
    $('.price-block').click(function() {
        id = $('.price-block').index($(this));
        var dialog =  dialogs[id];
        $('#modal-title').text($(this).find('h3')[0].innerHTML);

        var image = $($(this).find('.img')[0].cloneNode(true));
        image.css({
            width: '100%'
        });
        $('#modal-image').html(image);
        $('#modal-description').html(dialog.description);
        $('#modal-list-title').html(dialog.list_title);

        var list = '';
        $.each(dialog.list, function(index, value) {
            list += '<li>' + value + '</li>';
        });
        $('#modal-list').html(list);
        $('#modal-addition').html(dialog.addition);
        $('#modal-question').html('<b>' + dialog.question + '</b><br><small>Наши специалисты подготовят для Вашей сферы бизнеса персональное предложение, которое заинтересует именно ваших клиентов.</small>');

        $("body").addClass("modal-open");
        modal.show();
    });

    $('#modal-send').click(function() {
        this.disabled = true;
        $.post('/service', {id: id, email: $('#modal-email').val()}, function(res) {
            if (res.err) {
                if (res.err == 'sender') {
                    alert('Извините, произошла ошибка. Попробуйте ещё раз.')
                } else {
                    alert('Укажите правильную почту.');
                }
            }

            this.removeAttribute("disabled");
        });
    });

    function closeModal() {
        $("body").removeClass("modal-open")
        modal.hide();
    }

    $('#modal-close').click(function() {
        closeModal();
    });

    $(window).click(function(event) {
        if (event.target.id == "modal") {
            closeModal();
        }
    });
    $('.modal-content').click(function() {
        if (event.target == this) {
            closeModal();
        }
    });
});
