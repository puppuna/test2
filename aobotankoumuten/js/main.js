'use strict';
//====================
// ローディングアニメ
//====================
$(function () {

  const isFirstLoad = sessionStorage.getItem('isFirstLoad');
  window.addEventListener('load', function () {
    if (isFirstLoad !== 'true') {
      const loadingElement = document.querySelector('.loading');
      loadingElement.classList.add('active');
      setTimeout(function () {
        loadingElement.classList.remove('active');
        const contentsElement = document.querySelector('.bodyContainer.hidden');
        contentsElement.classList.remove('hidden');
        sessionStorage.setItem('isFirstLoad', 'true');
      }, 2000);
      setTimeout(function () {
        loadingElement.style.display = 'none';
      }, 2500);

      //テキストのカウントアップ+バーの設定
      let bar = new ProgressBar.Line(loadingBar, {//id名を指定
        easing: 'easeInOut',//アニメーション効果linear、easeIn、easeOut、easeInOut
        duration: 1700,//時間指定(1000＝1秒)
        strokeWidth: 0.2,//進捗ゲージの太さ
        color: '#4282B8',//進捗ゲージのカラー
        trailWidth: 0.2,//ゲージベースの線の太さ
        trailColor: '#B1C6DC',//ゲージベースの線のカラー
        text: {//テキストの形状を直接指定				
          style: {//天地中央に配置
            position: 'absolute',
            top: '50%',
            left: '50%',
            padding: '0',
            margin: '20px 0 0 0',//バーより下に配置
            transform: 'translate(-50%,-50%)',
            'font-size': '1rem', 'font-family': 'Kanit',
            color: '#B1C6DC',
          },
          autoStyleContainer: false //自動付与のスタイルを切る
        },
        step: function (state, bar) {
          bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
        }
      });
      //アニメーションスタート
      bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
      });

    } else {
      const contentsElement = document.querySelector('.bodyContainer.hidden');
      contentsElement.classList.remove('hidden');
    }
  });

  //=====================
  // PCメニューアコーディオン
  //=====================  
  $('.pcNav .pcNavAccordion>li').find('ul').hide();
  $('.pcNav .pcNavAccordion>li>div').hover(function () {
    $(this).children('.subMenu').stop().slideDown(500);
  }, function () {
    $(this).children('.subMenu').stop().slideUp(500);
  });

  //====================
  // SPハンバーガーメニュー
  //====================
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

  // ====================
  // スムーススクロール
  // ====================
  $('a[href^="#"]').click(function () {
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top;
    $('html, body').animate({ scrollTop: position }, 500, 'swing');
    return false;
  });

  //====================
  // フォーム非同期通信
  //====================
  $('#form').submit(function (event) {
    let formData = $('#form').serialize();
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

  //====================
  // swiper ロゴ無限スライダー
  //====================
  const swiper = new Swiper('.swiper', {
    loop: true, // ループ有効
    // loopedSlides: ,
    speed: 5000, // ループの時間
    allowTouchMove: false, // スワイプ無効
    autoplay: {
      delay: 0, // 途切れなくループ
    },
    slidesPerView: 1.85, // 一度に表示する枚数
    spaceBetween: 16,
    breakpoints: {
      // スライドの表示枚数：500px以上の場合
      500: {
        slidesPerView: 2.4,
        spaceBetween: 48,
      },
      700: {
        slidesPerView: 1.5,
        spaceBetween: 48,
      },
      900: {
        slidesPerView: 2,
        spaceBetween: 48,
      },
      1100: {
        slidesPerView: 2.5,
        spaceBetween: 48,
      },
      1300: {
        slidesPerView: 3.5,
        spaceBetween: 48,
      }
    },
  });

  //==============
  //MicroModal
  //==============
  MicroModal.init({
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
    disableFocus: true
  });

  //====================
  // フェードイン
  //====================
  function fadeAnime() {

    $('.fadeUpTrigger').each(function () {
      let elemPos = $(this).offset().top - 50;
      let scroll = $(window).scrollTop();
      let windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        $(this).addClass('fadeUp');
      }
    });

    $('.fadeUpLateTrigger').each(function () {
      let elemPos = $(this).offset().top - 50;
      let scroll = $(window).scrollTop();
      let windowHeight = $(window).height();
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

});



