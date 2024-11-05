$(document).ready(function () {
  AOS.init({
    offset: (jQuery(window).height() * 0.25),
    duration: 700,
    easing: 'ease-out',
    anchorPlacement: 'top-bottom',
    once: false
    // once: true
  });

  const $body = $('body');
  var $videoEmbed = $('#video-embed');
  var $videoPop = $('#video-pop');
  const videoId = 'fAQk-uopmQ4'; // 要播放的 YouTube 影片 ID
  let videoLoaded = false;

  function toggleSubmenu() {
    if ($(window).width() <= 992) {
      // 綁定點擊事件
      $('.submenu-parent > a').off('click').on('click', function (e) {
        e.preventDefault();
        var $submenu = $(this).siblings('.submenu');
        var $parent = $(this).parent('.submenu-parent');
        var $symbol = $(this).find('.symbol');

        // 展開或收合submenu
        $submenu.slideToggle(function () {
          $parent.toggleClass('active', $submenu.is(':visible'));

          if ($submenu.is(':visible')) {
            $symbol.addClass("expend"); // 展開時顯示 "−"
          } else {
            $symbol.removeClass("expend"); // 收合時顯示 "＋"
          }
        });

      });
    } else {
      // 移除點擊事件
      $('.submenu-parent').removeClass('active');
      $('.submenu-parent > a').off('click').find('.symbol').removeClass("expend");
      var $menu = $('.navbar .menu');
      var $submenu = $('.submenu-parent .submenu');
      if ($('.toggle-menu').hasClass('off')) {
        $body.removeClass('overflow-hidden');
        $menu.removeClass('mob-show').addClass('mob-hidden');
        $('.toggle-menu').removeClass('off').addClass('on');
      }
      $submenu.hide();
    }
  }

  toggleSubmenu();

  function toggleAccordion(){
    if ($(window).width() <= 992){
      $('.accordion-item > .content','.accordion-item > .symbol').removeClass('expend');
      $('.accordion-item > .toggle-title').off('click').on('click', function (e){
        var $content = $(this).siblings('.content');
        var $symbol = $(this).find('.symbol');        
          // 展開或收合項目
          $content.slideToggle(function () {
            $(this).toggleClass('expend', $content.is(':visible'));
  
            if ($content.is(':visible')) {
              $symbol.addClass("expend");
            } else {
              $symbol.removeClass("expend");
            }
          });          
      });
    } else{
      $('.accordion-item > .toggle-title').off('click');
      $('.accordion-item > .content','.accordion-item > .symbol').removeClass('expend');
    }
  }

  toggleAccordion();

  $(window).resize(function () {
    toggleSubmenu();
    toggleAccordion();
  });

  // 開啟彈窗
  function openPopup(popupSelector, iframeSrc) {
    $body.addClass('overflow-hidden');
    $(popupSelector).find('.content iframe').attr('src', iframeSrc);
    $(popupSelector).removeClass('hidden').fadeIn();
  }

  // 關閉彈窗
  function closePopup(popupSelector) {
    $body.removeClass('overflow-hidden');
    $(popupSelector).find('.content iframe').attr('src', ''); // 重置 iframe src
    $(popupSelector).fadeOut();
  }

  // YouTube 影片處理邏輯
  function loadVideo(videoId) {
    var videoUrl = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1';
    return '<iframe id="youtube-iframe" src="' + videoUrl + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen webkit-playsinline=""></iframe>';
  }

  function handleVideoPopup() {
    if (!videoLoaded) { // 確保只加載一次影片
      $videoEmbed.html(loadVideo(videoId)).show();
      $('#video-thumbnail').hide();
      videoLoaded = true;
    }
  }

  // 點擊開啟彈窗
  $('.navbar .action-btn').on("click", function () {
    openPopup('#form-pop-1', 'https://www.businessweekly.com.tw/Activity/Form/Signup/PROD000013325');
  });

  // 點擊關閉彈窗
  $('.popup').on("click", ".popup-close-btn, .popup-close", function () {
    closePopup($(this).closest('.popup'));
  });

  // 點擊播放影片
  $('.video-play').on("click", function () {
    openPopup($videoPop);
    handleVideoPopup();
  });

  // 關閉影片彈窗
  $videoPop.on("click", ".popup-close-btn, .popup-close", function () {
    closePopup($videoPop);
    $videoEmbed.html("").hide(); // 清空 iframe
    videoLoaded = false; // 重置 videoLoaded
  });

  // 手機版選單開關
  $('.navbar').on("click", ".toggle-menu", function () {
    var $menu = $('.navbar .menu');
    if ($(this).hasClass('on')) {
      $body.addClass('overflow-hidden');
      $menu.removeClass('mob-hidden').addClass('mob-show');
      $(this).removeClass('on').addClass('off');
    } else {
      $body.removeClass('overflow-hidden');
      $menu.removeClass('mob-show').addClass('mob-hidden');
      $(this).removeClass('off').addClass('on');
    }
  });


  // 點擊開啟彈窗
  $('.signup01').on("click", function () {
    openPopup('#form-pop-1', 'https://www.businessweekly.com.tw/Activity/Form/Signup/PROD000017696');
  });
  // 點擊開啟彈窗
  $('.signup02').on("click", function () {
    openPopup('#form-pop-1', 'https://www.businessweekly.com.tw/Activity/Form/Signup/PROD000017701');
  });

  //back to top
  $("#top").on("click", function () {
    $(window).scrollTo({ top: '0px', left: '0px' }, 800);
  });

 

  const navbar = document.querySelector('.navbar .container');

  window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
          navbar.classList.add('shrink'); // 捲動離開頂部時縮小
      } else {
          navbar.classList.remove('shrink'); // 回到頂部時恢復原高度
      }
  });
});


