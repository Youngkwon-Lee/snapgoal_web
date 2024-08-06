$(function () {
    // 가이드 코딩 이미지 전환
    var $guide = $('.guide');
    var guideLength = $guide.length;
  
    $guide.on('click', function () {
      if (guideLength === 1) {
        return false;
      }
  
      var $this = $(this);
      var $idx = $this.index() + 1;
  
      if ($idx === guideLength) {
        $idx = 0;
      }
  
      $guide.eq($idx).removeClass('hide');
  
      $.each($guide, function (idx, ele) {
        $guide.eq($idx).siblings().addClass('hide');
      });
    });
    // ------------------------- common ------------------------
    initialiseLenisScroll();
    Splitting();
    document.querySelector('.fade-in') && fadeItems();
    // 새로고침시 페이지 상단으로 이동
    // window.onload = function () {
    //   setTimeout(function () {
    //     scrollTo(0, 0);
    //   }, 100);
    // };
    // ---------------------------- main page --------------------------------
    if (document.querySelector('.main-page')) {
      mainVideo();
      showMainNews();
      countingAnim();
      fadeAnims();
      mvSlide();
      mainAbout();
      productAnims();
      mainTab();
      mainWithSlide();
      infiniteCarousel({
        trigger: '.box-carousel',
        duration: 12,
        reverse: true,
        pauseOnHover: false,
      });
      mobNewsSlide();
    }
    // ---------------------------- sub page --------------------------------
    if (document.querySelector('.sub-page')) {
      document.querySelector('.sub-top__frame') && subTopAnim();
      document.querySelector('.technology-algorithm__slide') && sampleModal();
      // about us
      if (document.querySelector('.about')) {
        countingAnim();
        aboutAnims();
        fadeAnims();
        mainWithSlide();
        aboutHistory();
        aboutGlobal();
      }
      // technology
      if (document.querySelector('.technology')) {
        technologyAnim();
        technologySlide();
        fadeAnims();
        technologyOverview();
      }
      // product
      if (document.querySelector('.product')) {
        fadeAnims();
        infiniteCarousel({
          trigger: '.box-carousel',
          duration: 18,
          reverse: true,
          pauseOnHover: false,
        });
      }
      //ir
      if (document.querySelector('.ir')) {
        fadeAnims();
      }
      //contact us
      document.querySelector('.contact') && fadeAnims();
      // newsroom
      if (document.querySelector('.news')) {
        newsSlide();
        fadeAnims();
        if (document.querySelector('.news-view')){
          newsShare();
          relatedSlide();
        }
      }
      // career
      if (document.querySelector('.careers')) {
        fadeAnims();
        carrersAnim();
        benefitLine();
      }
      if (document.querySelector('.positions')) {
        filterMob();
      }
    }
    // --------------------- header -------------------------
    const header = document.querySelector('.header');
    let headerHeight = parseFloat(getComputedStyle(header)['height']);
    document.documentElement.style.setProperty('--headerHeight', `${headerHeight}px`);
    window.addEventListener('resize', function () {
      let headerHeight = parseFloat(getComputedStyle(header)['height']);
      document.documentElement.style.setProperty('--headerHeight', `${headerHeight}px`);
    });
    headerAnim();
    headerLang();
    headerDepth();
    sideGnb();
    // ------------------------- footer ------------------------
    footerTop();
    //  ----------------------- functions ----------------------------
    function initialiseLenisScroll() {
      const lenis = new Lenis({
        smoothWheel: true,
        duration: 1.2,
      });
  
      lenis.on('scroll', ScrollTrigger.update);
  
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
  
      gsap.ticker.lagSmoothing(0);
    }
    function mvSlide() {
      $('.main-mv__slide').slick({
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        fade: true,
      });
      $('.main-mv__slide').slickNav('.item', {
        circle: true,
        circleSize: '24px',
        circleBorder: '1px',
        circleTrack: 'rgba(255, 255, 255, .3)',
        duration: 5000,
      });
    }
    function mainAbout() {
      gsap.to('.main-about__typo figure img', {
        scrollTrigger: {
          trigger: '.main-about__typo',
          // markers: true,
          start: '0, 50%',
        },
        scale: 1,
        duration: 3,
      });
    }
    function mainVideo() {
      $('.main-mv__video .play').on('click', function () {
        function responsiveCheck(pc, tab, mo) {
          return innerWidth > 1880 ? pc : innerWidth > 768 ? tab : mo;
        }
        gsap
          .timeline()
          .to('.main-mv__video', {
            bottom: 0,
            x: () => {
              return responsiveCheck('900px', 0, 0);
            },
            width: '100%',
            height: '100%',
            duration: 0.7,
            borderColor: 'var(--purple)',
            borderWidth: '3px',
            right: () => {
              return responsiveCheck(false, 0, 0)
            },
          })
          .to(
            '.main-mv__video .play',
            {
              autoAlpha: 0,
              duration: 0.3,
            },
            '>-0.7'
          )
          .to(
            '.main-mv__layer',
            {
              opacity: 1,
            },
            '>-0.5'
          )
          .add(() => {
            $('.main-mv__layer video').get(0).play();
          })
          .to('.main-mv__video .close', {
            opacity: 1,
            zIndex: 10,
          });
      });
      $('.main-mv__video .close').on('click', function () {
        function responsiveCheck(pc, tab, mo) {
          return innerWidth > 1880 ? pc : innerWidth > 768 ? tab : mo;
        }
        gsap
          .timeline()
          .to('.main-mv__video', {
            bottom: () => {
              return responsiveCheck('60px', '40px', '5.56vw');
            },
            x: () => {
              return responsiveCheck('840px', 0, 0);
            },
            width: () => {
              return responsiveCheck('360px', '360px', '50vw')
            },
            height: () => {
              return responsiveCheck('203px', '203px', '28.19vw')
            },
            duration: 0.5,
            borderColor: '#fff',
            borderWidth: '2px',
            right: () => {
              return responsiveCheck(false, '40px', '5.56vw')
            },
          })
          .to(
            '.main-mv__video .play',
            {
              autoAlpha: 1,
            },
            '>-0.5'
          )
          .to(
            '.main-mv__layer',
            {
              opacity: 0,
            },
            '>-0.5'
          )
          .to(
            '.main-mv__video .close',
            {
              opacity: 0,
              zIndex: -1,
            },
            '>-0.5'
          )
          .add(() => {
            $('.main-mv__layer video').get(0).pause();
            $('.main-mv__layer video').get(0).currentTime = 0;
          });
      });
    }
    function fadeItems() {
      gsap.utils.toArray('.fade-in').forEach((ele) => {
        var y;
        var start;
        var delay;
        $(ele).hasClass('deeper') ? (y = 150) : (y = 60);
        $(ele).hasClass('slow') ? (start = '0%, 40%') : (start = '0%, 70%');
        $(ele).hasClass('delay') ? (delay = 0.5) : (delay = 0);
  
        if (ele.querySelector('.fade-in__ele')) {
          gsap.fromTo(
            ele.querySelectorAll('.fade-in__ele'),
            {
              y: y,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              delay: delay,
              scrollTrigger: {
                trigger: ele,
                markers: false,
                start: start,
              },
            }
          );
        }
        if (ele.querySelector('.fade-in__right')) {
          gsap.fromTo(
            ele.querySelectorAll('.fade-in__right'),
            {
              x: -30,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: ele,
                markers: false,
                start: start,
              },
            }
          );
        }
      });
    }
    function fadeAnims() {
      gsap.utils.toArray('.fade-anim').forEach((ele) => {
        var start = "";
        $(ele).hasClass('start-low') ? (start = '0%, 92%') : (start = '0%, 80%');
        gsap.fromTo(
          ele,
          {
            y: 60,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.15,
            duration: 0.7,
            scrollTrigger: {
              trigger: ele,
              // markers: true,
              start: start,
            },
          }
        );
      });
    }
    function productAnims() {
      gsap.utils.toArray('.main-product li').forEach((ele) => {
        gsap.fromTo(
          ele,
          {
            y: 120,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            scrollTrigger: {
              trigger: ele,
              markers: false,
              start: '0%, 70%',
              toggleActions: 'play play play reverse',
            },
          }
        );
      });
  
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.main-product',
            start: '-100vh, 0',
            end: '100%, 100%',
            scrub: 1,
          },
        })
        .to('.main-product h2', {
          position: 'fixed',
          top: '200px',
        })
        .to('.main-product h2', {
          opacity: 1,
          duration: 1,
        })
        .to('.main-product h2', {
          color: '#000',
          duration: 2,
        })
        .to('.main-product h2', {
          autoAlpha: 0,
          delay: 4,
          duration: 1,
        });
  
      gsap.to('.main-product', {
        scrollTrigger: {
          trigger: '.main-technology',
          start: '0, 0',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
        marginTop: '-100vh',
        duration: 1,
      });
    }
    function showMainNews() {
      function responsiveCheck(pc, tab, mo) {
        return innerWidth > 1880 ? pc : innerWidth > 768 ? tab : mo;
      }
      gsap.to(
        '.main-news',
        {
          scrollTrigger: {
            trigger: '.main-news',
            start: '100%, 100%',
            end: () => {
              return responsiveCheck('+=200%', '+=220%', '+=120%')
            },
            pin: true,
          },
          marginTop: 0,
        }
      );
    }
    function mobNewsSlide() {
      if ($(window).innerWidth() < 1025) {
        $('.main-news__list').slick({
          dots: false,
          arrows: false,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: true,
        })
      }
    }
    function headerAnim() {
      let headerHeight = parseFloat(getComputedStyle(header)['height']);
      let prevY = 0;
      let topBtn = document.querySelector('.top-btn');
      addEventListener('scroll', (e) => {
        const currentY = scrollY;
        currentY > headerHeight + 10 ? header.classList.remove('top') : header.classList.add('top');
        currentY > prevY && currentY > 20 ? header.classList.add('hide') : header.classList.remove('hide');
        prevY = scrollY;
        if (scrollY < 100) {
          topBtn.classList.add('hide');
        } else {
          topBtn.classList.remove('hide');
        }
        // $('.header').on('mouseleave', function () {
        //   if (currentY < headerHeight + 10) {
        //     $('.header').addClass('top');
        //   } else {
        //     $('.header').removeClass('top');
        //   }
        // });
      });
      // $('.header').on('mouseover', function () {
      //   $('.header').removeClass('top');
      // });
      // $('.header').on('mouseleave', function () {
      //   $('.header').addClass('top');
      // });
    }
    function headerLang() {
      $('.header-lang button').on('click', function () {
        $('.header-lang').toggleClass('on');
        if (!$('.header-lang').hasClass('on')) {
          $('.header-lang__list').stop().slideUp(200);
        } else if ($('.header-lang').hasClass('on')) {
          $('.header-lang__list').stop().slideDown(200);
        }
      });
    }
    function headerDepth() {
      $('.header-gnb > div').on('mouseover', function () {
        $(this).find('.header-gnb__depth2').stop().slideDown(200);
        // $(this).parent('div').siblings().find('.header-gnb__depth2').stop().slideUp(200);
      });
      $('.header-gnb > div').on('mouseleave', function () {
        $(this).find('.header-gnb__depth2').stop().slideUp(200);
      });
    }
    function countingAnim() {
      let startCount = { var: 0 };
      let number = document.querySelectorAll('.counter');
      number.forEach((ele) => {
        let countValue = parseInt(ele.dataset.value);
        let duration = 2;
        if (countValue >= 100 && countValue <= 999) {
          duration = 3;
        }
        gsap.to(startCount, {
          var: countValue,
          duration: duration,
          ease: 'none',
          onUpdate: changeNumber,
          scrollTrigger: {
            trigger: ele,
          },
        });
  
        function changeNumber() {
          ele.innerHTML = startCount.var.toFixed();
        }
      });
    }
    function mainTab() {
      let tabItem = $('.main-tab ul li');
      let tabList = $('.main-with__lists ul');
      tabItem.on('click', function () {
        let tabIdx = $(this).index();
        tabList.eq(tabIdx).addClass('active').siblings().removeClass('active');
        
        if ($(window).innerWidth() < 769) {
          $('.main-tab__bg')
          .stop()
          .animate({ left: tabIdx * '27.78' + .69 + tabIdx * 1.39 + 'vw' });
          tabList.eq(tabIdx).slick('unslick').slick({
            arrows: true,
            dots: true,
            rows: 2,
            slidesPerRow: 3,
            infinite: false,
          });
        }else {
          $('.main-tab__bg')
          .stop()
          .animate({ left: tabIdx * 160 + 5 + tabIdx * 10 + 'px' });
          tabList.eq(tabIdx).slick('unslick').slick({
            arrows: true,
            dots: false,
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: false,
            responsive: [
              {
                breakpoint: 1025,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  arrows: false,
                  dots: true,
                }
              },
              
            ]
          });
        }
      });
    }
    function mainWithSlide() {
      let withSlide = $('.main-with__lists ul');
      withSlide.each(function (idx, ele) {
        
        if ($(window).innerWidth() < 769) {
          $(ele).slick({
            arrows: true,
            dots: true,
            rows: 2,
            slidesPerRow: 3,
            infinite: false,
          });
        }else {
          $(ele).slick({
            arrows: true,
            dots: false,
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: false,
            responsive: [
              {
                breakpoint: 1025,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  arrows: false,
                  dots: true,
                }
              },
              
            ]
          });
        }
      });
    }
    function infiniteCarousel({ trigger, duration, reverse, pauseOnHover }) {
      trigger = document.querySelectorAll(trigger);
  
      trigger.forEach((trigger) => {
        trigger.style.overflow = 'hidden';
        trigger.style.visibility = 'visible';
  
        const items = trigger.querySelector('.carousel-items');
        const item = trigger.querySelectorAll('.carousel-item');
        const itemWidthArr = [...item].map((item) => {
          item.style.position = 'absolute';
          return item.clientWidth;
        });
        let totalWidth = 0;
  
        itemWidthArr.map((width, idx, arr) => {
          if (idx === 0) {
            totalWidth = itemWidthArr[arr.length - 1];
          } else if (arr[idx - 1]) {
            totalWidth = totalWidth + arr[idx - 1];
          }
          gsap.set(item[idx], {
            x: totalWidth,
          });
        });
  
        items.style.position = 'relative';
        items.style.height = `${item[0].offsetHeight}px`;
        items.style.left = `-${Math.max(...itemWidthArr)}px`;
  
        const tl = gsap.timeline();
        tl.to(item, duration * item.length, {
          x: () => {
            return reverse ? `-=${totalWidth}` : `+=${totalWidth}`;
          },
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => {
              return reverse ? (x < 0 ? (parseFloat(x) % totalWidth) + totalWidth : x) : parseFloat(x) % totalWidth;
            }),
          },
        });
  
        if (pauseOnHover) {
          trigger.addEventListener('mouseover', () => {
            tl.pause();
          });
  
          trigger.addEventListener('mouseleave', () => {
            tl.play();
          });
        }
      });
    }
    function subTopAnim() {
      let scrub = '';
      let end = '';
      if (document.querySelector('.sub-top__desc')) {
        scrub = 1;
        end = '+=300%';
      } else {
        scrub = false;
        end = '+=100%';
      }
  
      const defaultSubTop = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.sub-top',
            start: '3%, 0',
            end: end,
            markers: false,
            pin: true,
            scrub: scrub,
            toggleActions: 'play play play reverse',
          },
        })
        .to('.sub-top__frame', {
          width: '100%',
          height: '100%',
          borderRadius: '0',
          bottom: '-3%',
          duration: 0.7,
        })
        .to(
          '.sub-top',
          {
            padding: 0,
            duration: 0.7,
          },
          '>-0.7'
        )
        .to(
          '.sub-top hgroup',
          {
            color: '#fff',
            top: '50%',
            duration: 0.7,
          },
          '>-0.7'
        )
        .to(
          '.sub-top__dim',
          {
            opacity: 1,
            duration: 0.7,
          },
          '>-0.7'
        );
      if (document.querySelector('.sub-top__desc')) {
        defaultSubTop
          .to('.sub-top hgroup h2', {
            delay: 1,
            y: 50,
            autoAlpha: 0,
            duration: 0.7,
          })
          .to('.sub-top__desc p', {
            autoAlpha: 1,
          })
          .to(
            '.sub-top__dim',
            {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            '>-1'
          )
          .to('.sub-top__desc .char', {
            opacity: 1,
            scale: 1,
            stagger: 0.01,
            duration: 0.7,
          })
          .to('.sub-top__desc .common-btn', {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
          });
      }
    }
    function aboutAnims() {
      gsap.to('.about-logo__bg', {
        scrollTrigger: {
          trigger: '.about-logo__download',
          start: '0, 0',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
        height: 0,
        duration: 1,
      });
      gsap.fromTo(
        '.about-logo__symbol li',
        {
          opacity: 0,
          x: '-20px',
        },
        {
          scrollTrigger: {
            trigger: '.about-logo__symbol',
            start: '0, 60%',
          },
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 1,
        }
      );
    }
    function aboutHistory() {
      $('.about-history__slide').slick({
        arrows: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          
        ]
      });
    }
    function aboutGlobal() {
      $('.about-global__list > li').eq(0).addClass('active').find('ul').show();
      $('.about-global__list > li').on('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
          if ($(e.currentTarget).hasClass('active')) {
            $(e.currentTarget).removeClass('active');
            $(e.currentTarget).find('ul').stop().slideUp();
          } else {
            $(e.currentTarget).addClass('active');
            $(e.currentTarget).find('ul').stop().slideToggle();
            // $(e.currentTarget).siblings().removeClass('active').find('ul').stop().slideUp();
          }
        }
      });
    }
    function footerTop() {
      $('.top-btn').on('click', function () {
        $('html, body').stop().animate({ scrollTop: 0 }, 1200);
        return false;
      });
      gsap.to('.top-btn', {
        scrollTrigger: {
          trigger: '.footer',
          start: '-60px 90%',
          markers: false,
          toggleClass: { targets: '.top-btn', className: 'fix' },
        },
        // opacity: 1,
        duration: 0.3,
      });
    }
    function technologyAnim() {
      function responsiveCheck(pc, tab, mo) {
        return innerWidth > 1880 ? pc : innerWidth > 768 ? tab : mo;
      }
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.technology-svnet__tit',
            markers: false,
            start: '0, 0',
            end: '+=200%',
            pin: true,
            scrub: 0.6,
          },
        })
        .to('.technology-svnet__tit', {
          clipPath: 'circle(100% at center 50%)',
          duration: 1.3,
        })
        .to('.technology-svnet__tit h3', {
          autoAlpha: 1,
          duration: 0.3,
        })
        .to('.technology-svnet__tit h3 span', {
          backgroundPosition: '-200% 0',
          duration: 1,
        });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.technology-svnet__cutting',
            markers: false,
            start: '0, 0',
            end: '+=300%',
            pin: true,
            scrub: 1,
          },
        })
        .to('.cutting-desc', {
          width: () => {
            return responsiveCheck('100%', '92.18%', '92.18%')
          },
          duration: 1,
        })
        .to('.cutting-fade', {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.5,
        })
        // .to('.technology-svnet__cutting', {
        //   x: '-100vw',
        //   duration: 3,
        // })
        // .to('.technology-svnet__tit h3 span', {
        //   backgroundPosition: '-200% 0',
        //   duration: 1,
        // });
    }
    function technologySlide() {
      $('.technology-algorithm__slide').slick({
        arrows: false,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
      });
      // 이전
      $('.technology-algorithm__nav .prev').on('click', function () {
        $('.technology-algorithm__slide').slick('slickPrev');
      });
  
      // 다음
      $('.technology-algorithm__nav .next').on('click', function () {
        $('.technology-algorithm__slide').slick('slickNext');
      });
    }
    function technologyOverview() {
  
      gsap.utils.toArray('.technology-overview__scroll li').forEach((ele, idx) => {
        let navItem = document.querySelectorAll('.technology-overview__nav li');
        gsap.to(ele, {
          scrollTrigger: {
            trigger: ele,
            start: '0, 118px',
            end: '100%, 118px',
            toggleClass: {
              targets: navItem[idx],
              className: 'on',
            },
          },
        });
        gsap.to('.technology-overview__nav .first', {
          scrollTrigger: {
            trigger: '.technology-overview__scroll',
            start: '0, 118px',
            end: '100%, 118px',
            onLeaveBack: function() {
              console.log('back')
              $('.technology-overview__nav .first').addClass('on')
            }
          }
        })
      });
      $('.technology-overview__nav li').on('click', function () {
        var index = $(this).index();
        var scrollTo = $('.technology-overview__scroll li').eq(index).offset().top;
        console.log(scrollTo);
        $('html, body').animate(
          {
            scrollTop: scrollTo,
          },
          300
        );
        $(this).addClass('on').siblings().removeClass('on');
      });
    }
    function carrersAnim() {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.careers-carousel',
          // markers: true,
          start: '0, 90%',
          end: '100%, 100%',
          scrub: 1,
        },
      }).to('#container', {
        backgroundColor: '#000',
        duration: .5,
      }).to('.is-reversal', {
        color: '#fff',
        duration: .5,
      }, '-.1')
      gsap.utils.toArray('.careers-carousel ul').forEach((ele) => {
        let carouselWidth = parseInt(ele.offsetWidth) / 3
        if (ele.classList.contains('reverse')) {
          carouselWidth = -carouselWidth
        }
        gsap.timeline({
          scrollTrigger: {
            trigger: '.careers-carousel',
            // markers: true,
            start: '0, 80%',
            end: '+=200%',
            scrub: 4,
          }
        })
        .to(ele, {
          x: carouselWidth,
        })
      })
    }
    function benefitLine() {
      gsap.to(('.careers-benefits li .line'), {
        scrollTrigger: {
          trigger: '.careers-benefits',
          start: '0, 50%',
          // markers: true,
        },
        width: '100%',
        duration: 1,
        stagger: 0.3,
      })
    }
    function newsSlide() {
      $('.news-notice__slide').on('init', function(e, s) {
        $('.news-notice__index .total').text(s.slideCount)
      })
      $('.news-notice__slide').slick({
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        fade: true,
        slide: '.item'
      });
      // 이전
      $('.news-notice__btns .prev').on('click', function () {
        $('.news-notice__slide').slick('slickPrev');
      });
  
      // 다음
      $('.news-notice__btns .next').on('click', function () {
        $('.news-notice__slide').slick('slickNext');
      });
      $('.news-notice__slide').on('beforeChange', function(e, s, c, n) {
        console.log(e, s, c, n, s.slideCount)
        $('.news-notice__index .current').text(n + 1)
  
      })
    }
  
    function newsShare() {
      $('.share').on('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
          if ($(e.currentTarget).hasClass('active')) {
            $(e.currentTarget).removeClass('active');
            $(e.currentTarget).find('ul').stop().animate({'opacity' : 0}, 200, function() {
              $(this).hide();
            })
          } else {
            $(e.currentTarget).addClass('active');
            $(e.currentTarget).find('ul').css({'display' : 'flex'}).stop().animate({'opacity' : 1}, 200)
          }
        }
      })
    }
  
    function relatedSlide() {
      $('.main-news__list').slick({
        arrows: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              variableWidth: true,
            }
          }
        ],
      });
    }
    function sampleModal() {
      $('.technology-algorithm__slide button').on('click', function () {
        let videoIdx = parseInt($(this).data('videonum'));
        $('.modal-item')
          .eq(videoIdx - 1)
          .css({ display: 'flex' })
          .stop()
          .animate({ opacity: 1 })
          .find('video')
          .get(0).play();
      });
      $('.modal-item').on('click', function (e) {
        if (e.target.tagName !== 'VIDEO') {
          $(this)
            .stop()
            .animate({ opacity: 0 }, function () {
              $(this).hide();
            })
            .find('video')
            .get(0).pause();
          $(this).find('video').get(0).currentTime = 0;
        }
      });
    }
    function sideGnb() {
      document.querySelectorAll('.header-side__gnb li').forEach((ele) => {
        $(ele).find('button').on('click', function() {
          $(this).toggleClass('active').siblings('div').stop().slideToggle();
        })
      })
      $('.header-ham').on('click', function() {
        $('.header-side').show().stop().animate({'opacity' : 1});
      })
      $('.header-side .header-ham').on('click', function() {
        $('.header-side').stop().animate({'opacity' : 0}, function() {
          $(this).hide();
        });
      })
    }
    function filterMob() {
      $('.career-filters__filter-btn').on('click', function() {
        $('.career-filters__wrap').stop().animate({'opacity' : 1}).css({'z-index' : 99});
      })
      $('.career-filters__close, .career-filters__apply').on('click', function() {
        $('.career-filters__wrap').stop().animate({'opacity' : 0}).css({'z-index' : -1});
      })
    }
  });
  
  