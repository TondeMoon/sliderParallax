let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
  wrapperClass: 'page__wrapper',
  slideClass: 'page__screen',
  direction: 'vertical',
  slidesPerView: 'auto',
  parallax: 'true',

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  mousewheel: {
    sensivity: 1,
  },
  watchOverflow: true,

  speed: 800,
  observer: true,

  observeParents: true,

  observeSlideChildren: true,

  pagination: {
    el: '.page__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'page__bullet',
    bulletActiveClass: 'page__bullet_active',
  },

  scrollbar: {
    el: '.page__scroll',
    dragClass: 'page__drag-scroll',
    draggable: true,
  },

  init: false,

  on: {
    init: function () {
      menuSlider();
      setScrollType();
      wrapper.classList.add('_loaded');
    },
    slideChange: function () {
      menuSliderRemove();
      menuLinks[pageSlider.realIndex].classList.add('_active');
    },
    resize: function () {
      setScrollType();
    },
  },
});

let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider() {
  if (menuLinks.length > 0) {
    menuLinks[pageSlider.realIndex].classList.add('_active');
    for (let index = 0; index < menuLinks.length; index++) {
      const menuLink = menuLinks[index];
      menuLink.addEventListener('click', function (e) {
        menuSliderRemove();
        pageSlider.slideTo(index, 800);
        menuLink.classList.add('_active');
        e.preventDefault();
      });
    }
  }
}

function menuSliderRemove(params) {
  let menuLinkActive = document.querySelector('.menu__link._active');
  if (menuLinkActive) {
    menuLinkActive.classList.remove('_active');
  }
}

function setScrollType() {
  if (wrapper.classList.contains('_free')) {
    wrapper.classList.remove('_free');
    pageSlider.params.freeMode = false;
  }

  for (let index = 0; index < pageSlider.slides.length; index++) {
    const pageSlide = pageSlider.slides[index];
    const pageSlideContent = pageSlide.querySelector('.screen__content');

    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight;
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add('_free');
        pageSlider.params.freeMode = true;
        break;
      }
    }
  }
}

pageSlider.init();
