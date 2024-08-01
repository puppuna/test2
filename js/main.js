'use strict';
//*====================
//* スムーススクロール
//*====================

$('a[href^="#"]').click(function () {
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top;
  $('html, body').animate({ scrollTop: position }, 400, 'swing');
  return false;
});

//*=====================
//* PCメニューアコーディオン
//*=====================  

$('.pcNavAccordion').find('.subMenu').hide();
$('.menuTitle').hover(function () {
  $(this).children('.subMenu').stop().slideDown(400);
}, function () {
  $(this).children('.subMenu').stop().slideUp(400);
});

//*====================
//* SPハンバーガーメニュー
//*====================

$('#burger').on('click', function () {
  $(this).toggleClass('active');
  $('#spNav').toggleClass('active');

  if ($(this).hasClass('active')) {
    $('html').css('overflow', 'hidden');
  } else {
    $('html').removeAttr('style');
  }
  return false;
});

/* リンククリックでメニュー閉じる */
$('#spNav a').click(function () {
  $('#spNav').removeClass('active');
  $('#burger').removeClass('active');
  $('html').removeAttr('style');
});

//*====================
//* フォーム
//*====================

// 非同期通信
$('#form').submit(function (event) {
  var formData = $('#form').serialize();
  $.ajax({
    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfAkS3XqbMrFb0XI1eIYqOyi4nmzUOgVm6nMn4Nw3W5Z_-Kwg/formResponse",
    data: formData,
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        window.location.href = "thanks.html";
      },
      200: function () {
        $(".false-message").slideDown();
      }
    }
  });
  event.preventDefault();
});

// フォームバリデーション
const $submitBtn = $('#submitBtn');
const $form = $('#form');
const $radio_chk = $('#form input[name="entry.1886721898"]:checked').length;

$form.find('input').on('change', function () {
  const allFilled = $form.find('input[name="entry.1918565578"]').val() !== "" && //姓
    $form.find('input[name="entry.648940625"]').val() !== "" && //名
    $form.find('input[name="entry.74890648"]').val() !== "" && //メールアドレス
    $form.find('input[name="entry.1009330545"]').val() !== "" && //住所
    $radio_chk !== 0 &&
    $form.find('#formCheck').prop('checked') === true;

  $submitBtn.prop('disabled', !allFilled);
});

//*====================
//* swiper 無限スライダー
//*====================

const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 5000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
  },
  slidesPerView: 1.85,
  spaceBetween: 16,
  breakpoints: {
    900: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
    1300: {
      slidesPerView: 3.5,
      spaceBetween: 48,
    }
  },
});

//*==============
//* MicroModal
//*==============

MicroModal.init({
  disableScroll: true,
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
  disableFocus: true
});

//*====================
//* フェードイン
//*====================

function fadeAnime() {
  $('.fadeUpTrigger').each(function () {
    var elemPos = $(this).offset().top - 10;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp');
    }
  });

  //ゆっくり
  $('.fadeUpLateTrigger').each(function () {
    var elemPos = $(this).offset().top - 10;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUpLate');
    }
  });
}
$(window).scroll(function () {
  fadeAnime();
});
$(window).on('load', function () {
  fadeAnime();
});

//*====================
//* ローディングアニメ
//*====================

// const isFirstLoad = sessionStorage.getItem('isFirstLoad');
// window.addEventListener('load', function () {
//   if (isFirstLoad !== 'true') {
//     const loadingElement = document.querySelector('.loading');
//     loadingElement.classList.add('active');
//     setTimeout(function () {
//       loadingElement.classList.remove('active');
//       const contentsElement = document.querySelector('.bodyContainer.hidden');
//       contentsElement.classList.remove('hidden');
//       sessionStorage.setItem('isFirstLoad', 'true');
//     }, 2000);
//     setTimeout(function () {
//       loadingElement.style.display = 'none';
//     }, 2500);

var loadingAnime = $.cookie('accessdate');
var myD = new Date();
var myYear = String(myD.getFullYear());
var myMonth = String(myD.getMonth() + 1);
var myDate = String(myD.getDate());

if (loadingAnime != myYear + myMonth + myDate) {
  $("#loading").css("display", "block");
  var bar = new ProgressBar.Line(loadingBar, {
    easing: 'easeInOut',
    duration: 1700,
    strokeWidth: 0.2,
    color: '#4282B8',
    trailWidth: 0.2,
    trailColor: '#B1C6DC',
    text: {
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        padding: '0',
        margin: '24px 0 0 0',
        transform: 'translate(-50%,-50%)',
        'font-size': '1rem', 'font-family': 'Kanit',
        color: '#B1C6DC',
      },
      autoStyleContainer: false
    },
    step: function (state, bar) {
      bar.setText(Math.round(bar.value() * 100) + ' %');
    }
  });
  bar.animate(1.0, function () {
  });
  
  setTimeout(function () {
    $("#loadingLogo").fadeIn(1000, function () {
      setTimeout(function () {
        $("#loadingLogo").fadeOut(1000);
      }, 1000);
      setTimeout(function(){
        $("#loading").fadeOut(1000, function() {
          var myD = new Date();
          var myYear = String(myD.getFullYear());
          var myMonth = String(myD.getMonth() + 1);
          var myDate = String(myD.getDate());
          $.cookie('accessdate', myYear + myMonth + myDate);
        });
      },1700);
    });
  },1000);
} else {
  $("#loading").css("display", "none");
};

//テキストのカウントアップ+バーの設定



