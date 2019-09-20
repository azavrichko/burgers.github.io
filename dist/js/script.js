var hamburgerMenu = document.querySelector('#hamburgerMenu');
var hamburgerButton = document.querySelector('#hamburgerButton');
var menuItems = document.querySelectorAll('.nav__link');

function openHamburgerMenu(e) {  
  hamburgerMenu.classList.add('active');
  hamburgerButton.classList.add('is-active');
}

function closeHamburgerMenu(e) {  
  hamburgerMenu.classList.remove('active');
  hamburgerButton.classList.remove('is-active');
}

hamburgerButton.addEventListener('click', function (e) {
  e.preventDefault();
  if(hamburgerButton.classList.contains('is-active')) {
    hamburgerMenu.classList.add('fadeOut');
    setTimeout(() => {
      closeHamburgerMenu();
      hamburgerMenu.classList.remove('fadeOut');
    }, 400);
    
  } else {
    openHamburgerMenu();
  }
});


hamburgerMenu.addEventListener('click', function (e) {
  e.preventDefault;
  console.log(e.target);
  if(e.target.classList.contains('nav__link')) {
    closeHamburgerMenu();
  }
});


// popup 
let popup = options => {
	let wrapper = document.querySelector('.' + options.wrapper);

	let _tooglePopup = e => {
		e.preventDefault();

		if (e.target.className === options.btn) {
			_openPopup(e.target);
		}
	};

	let _openPopup = btn => {
		let overlayElement = document.createElement('div');
		overlayElement.classList.add('overlay_review');

		let popupElement = document.createElement('div');
		popupElement.classList.add('popup_review');

		let contentElement = document.createElement('div');
		contentElement.classList.add('popup__content');

		let content = btn.parentNode;

		contentElement.innerHTML = content
			.querySelector('.' + options.text)
			.textContent;

		let titleElement = document.createElement('div');
		titleElement.classList.add('popup__title');

		titleElement.innerHTML = content
      .querySelector('.' + options.title)
      .textContent;

		let closeElement = document.createElement("a");
		closeElement.classList.add("popup__close");
		closeElement.innerHTML = '<svg class="popup__close-picture"><use xlink:href="./img/icons/sprite.svg#close"></use></svg>';
		closeElement.href = "#";
		closeElement.addEventListener("click", e => {
			e.preventDefault();
			_closePopup(overlayElement, popupElement);
		});

		overlayElement.addEventListener("click", e => {
			e.preventDefault();
			_closePopup(overlayElement, popupElement);
		});

		popupElement.appendChild(titleElement);
		popupElement.appendChild(contentElement);
		popupElement.appendChild(closeElement);

		document.body.appendChild(overlayElement);
		document.body.appendChild(popupElement);
	};

	let _closePopup = (overlay, popup) => {
		document.body.removeChild(overlay);
		document.body.removeChild(popup);
	};

	let addListeners = () => {
		wrapper.addEventListener('click', _tooglePopup);
	};

	return {
		init: addListeners
	}





};

popup({
	wrapper: "reviews__list",
	btn: "review__view",
	title: "review__title",
	text: "review__shorttext"
}).init();


// popup form


const openButton = document.querySelector(".openOverlay");
const template = document.querySelector("#overlayTemplate").innerHTML;
const overlay = createOverlay(template);

function createOverlay(template) {
	let fragment = document.createElement('div');

	fragment.innerHTML = template;

const overlayElement = fragment.querySelector(".overlay");
const contentElement = fragment.querySelector(".overlay__content");
const contentTitle = fragment.querySelector(".overlay__title");
const closeElement = fragment.querySelector(".overlay__close");

fragment = null;

overlayElement.addEventListener("click", e => {
	if (e.target === overlayElement) {
		closeElement.click();		
	}
});

closeElement.addEventListener("click", e => {
	e.preventDefault();
	document.body.removeChild(overlayElement);
	document.body.classList.remove('locked');
});

return {
	open() {
		document.body.appendChild(overlayElement);
		document.body.classList.add('locked');		
	},
	close() {
		closeElement.click();		
	},
	setContent(content, title) {
		contentElement.innerHTML = content;
		if(title) {
			contentTitle.innerHTML = title;
		} else {
			contentTitle.innerHTML = '';
		}
	}
};
}
// Form


const myForm = document.querySelector('#myForm');
let sendFormButton = document.querySelector('#sendForm');

sendFormButton.addEventListener('click', function (e) {
	e.preventDefault();

	let formData = new FormData();

	formData.append("name", myForm.elements.name.value);
	formData.append("phone", myForm.elements.phone.value);
	formData.append("comment", myForm.elements.comment.value);
	formData.append("to", "principles@mail.ru");

	let url = "https://webdev-api.loftschool.com/sendmail/";

	const xhr = new XMLHttpRequest();

	xhr.responseType = "json";
	xhr.open("POST", url);
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.send(formData);

	xhr.addEventListener('load', function () {
		console.log(xhr);

		if (xhr.status >= 400) {
			overlay.open();
			overlay.setContent('Что-то пошло не так');
		} else {
			overlay.open();
			overlay.setContent(xhr.response.message);
		}
	});

});






let multiAcco = options => {
	let list = document.querySelector('.' + options.list);
	let itemsList = list.querySelectorAll('.' + options.item);

	if (options.direction === "horizontal") {
		/* for calculate needed width */
		let userWidth = window.innerWidth;
		let titleItem = list.querySelector('.' + options.link);
		let widthTitle = titleItem.clientWidth;
		var neededWidth = userWidth - itemsList.length * widthTitle;
		neededWidth = (neededWidth > 520) ? '520px' : neededWidth + 'px';
		
	} else if (options.direction === "vertical") {
		/* for calculate needed height */
		var _getHeight = elem => elem.scrollHeight + 'px';
	}

	let _toogleItems = e => {
		e.preventDefault();

		if (e.target.className === options.link) {
			let item = e.target.parentNode;
			let contentItem = item.querySelector('.' + options.content);

			if (!item.classList.contains(options.activeItem)) {
				_closeItems(itemsList);
				_openItem(item, contentItem);
			} else {
				_closeItem(item, contentItem);
			}
		}
	};

	let _openItem = (item, contentItem) => {
		if (options.direction === "horizontal") {
			contentItem.style.width = neededWidth;
		} else if (options.direction === "vertical") {
			contentItem.style.height = _getHeight(contentItem);
		}
		item.classList.toggle(options.activeItem);
	};

	let _closeItem = (item, contentItem) => {
		if (options.direction === "horizontal") {
			contentItem.style.width = '';
		} else if (options.direction === "vertical") {
			contentItem.style.height = '';
		}

		item.classList.remove(options.activeItem);
	};

	let _closeItems = items => {
		for (let i = 0; i < items.length; i++) {
			let contentItem = items[i].querySelector('.' + options.content);
			_closeItem(items[i], contentItem);
		}
	};

	let addListeners = () => {
		list.addEventListener('click', _toogleItems)
	};

	return {
		init: addListeners
	}
};

multiAcco({
	direction: "horizontal",
	list: "menu-accordeon__list",
	item: "menu-accordeon__item",
	activeItem: "menu-accordeon__item--active",
	link: "menu-accordeon__trigger",
	content: "menu-accordeon__item-content"
}).init();

multiAcco({
	direction: "vertical",
	list: "accordeon__list",
	item: "accordeon__item",
	activeItem: "accordeon__item--active",
	link: "accordeon__trigger",
	content: "accordeon__item-content"
}).init();



/* slider */

$(function () {

	var moveSlide = function (container, slideNum) {
		var
		
		items = container.find('.burger__item'),
		activeSlide = items.filter('.active'),
		reqItem = items.eq(slideNum),
		reqIndex = reqItem.index(),
		list = container.find('.burger__list'),
		duration = 250;

	if (reqItem.length) {
		list.animate({
			'left' : -reqIndex * 100 + '%'
		}, duration, function() {
			activeSlide.removeClass('active');
			reqItem.addClass('active');
		});	
	}		

}

	$('.burger__controls-link').on('click', function(e){
		e.preventDefault();

		var $this = $(this),
				container = $this.closest('.burger'),
				items =$('.burger__item', container),
				activeItem = items.filter('.active'),
				nextItem = activeItem.next(),
				prevItem = activeItem.prev();
		
		if ($this.hasClass('burger__controls-link--next')) { //вперед

			if (nextItem.length) {
				moveSlide(container, nextItem.index());	
			} else {
				moveSlide(container, items.first().index());	
			}
	
		} else { //назад

			if (prevItem.length) {
				moveSlide(container, prevItem.index());
			} else {
				moveSlide(container, items.last().index());
			}			
		}
	});
});

//Для меню
//let neededWidth = userWidth -  widthTitle;

const sections = $(".section");
const display = $(".maincontent");
let inscroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const countPositionPercent = sectionEq => {
  return `${sectionEq * -100}%`;
};

const switchActiveClass = (elems, elemNdx) => {
  elems
    .eq(elemNdx)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

const unBlockScroll = () => {
  setTimeout(() => {
    inscroll = false;
  }, 1300); // подождать пока завершится инерция на тачпадах
};

const performTransition = sectionEq => {
  if (inscroll) return;
  inscroll = true;

  const position = countPositionPercent(sectionEq);
  const switchFixedMenuClass = () =>
    switchActiveClass($(".fixed-menu__item"), sectionEq);

  switchActiveClass(sections, sectionEq);
  switchFixedMenuClass();

  display.css({
    transform: `translateY(${position})`
  });

  unBlockScroll();
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(document).on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "next" : "prev";
    scrollViewport(direction);
  },
  keydown: e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";

    if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 40:
        scrollViewport("next");
        break;

      case 38:
        scrollViewport("prev");
        break;
    }
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  performTransition(parseInt($(e.currentTarget).attr("data-scroll-to")));
});

// разрешаем свайп на мобильниках
if (isMobile) {
  window.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
    },
    { passive: false }
  );

  $("body").swipe({
    swipe: (event, direction) => {
      let scrollDirecrion;
      if (direction === "up") scrollDirecrion = "next";
      if (direction === "down") scrollDirecrion = "prev";
      scrollViewport(scrollDirecrion);
    }
  });
}

// Добавление locked на body
$(function(){
	$('.review__view').click(function(){
			$('body').toggleClass('locked');
	});
});


//player

(function () {

  let video;
  let durationControl;
  let soundControl;
  let intervalId;

  $(document).ready(function () { // документ полностью загружен
      video = document.getElementById("player");

      // вешаем обработчик события onclick на тег video
      video.addEventListener('click', playStop);

      // обработчики событий для кнопок play
      let playButtons = document.querySelectorAll(".play");
      for (let i = 0; i < playButtons.length; i++) {
          playButtons[i].addEventListener('click', playStop);
      }

      // обработчик событий для кнопки динамик
      let micControl = document.getElementById("mic");
      micControl.addEventListener('click', soundOf)

      // обработчики событий для ползунка продолжительности видео
      durationControl = document.getElementById("durationLevel");
      durationControl.addEventListener('mousedown', stopInterval);
      // durationControl.addEventListener('click',setVideoDuration);
      durationControl.addEventListener('mouseup', setVideoDuration);

      durationControl.min = 0;
      durationControl.value = 0;

      // обработчики событий для ползунка громокости
      soundControl = document.getElementById("micLevel");
      // soundControl.addEventListener('click', changeSoundVolume);
      soundControl.addEventListener('mouseup', changeSoundVolume);

      // задаем максимальные и минимальные значения громокости
      soundControl.min = 0;
      soundControl.max = 10;
      // присваиваем ползунку максимальное значение
      soundControl.value = soundControl.max;

      //обрабатываем окончание видео
      video.addEventListener('ended', function () {
          $(".video__player-img").toggleClass("video__player-img--active");
          video.currentTime = 0;
      }, false);
  });

  /*
   Воспроизведение видео
  */
  function playStop() {
      // показывает или скрывает белую кнопку play
      $(".video__player-img").toggleClass("video__player-img--active");
      // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
      durationControl.max = video.duration;

      // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
      if (video.paused) {
          // video.webkitRequestFullScreen(); //возможность открыть в полноэкранном режиме
          // запускаем видео
          video.play();
          intervalId = setInterval(updateDuration, 1000 / 66)

      } else {
          // video.webkitExitFullscreen(); //выйти из полноэкранного режима
          // останавливаем видео
          video.pause();
          clearInterval(intervalId);

      }
  }

  function stopInterval() {
      video.pause();
      clearInterval(intervalId);
  }

  /*
      Реализует возможность перемотки нашего видео
  */
  function setVideoDuration() {
      if (video.paused) {
          video.play();
      } else {
          video.pause();
      }
      video.currentTime = durationControl.value;
      intervalId = setInterval(updateDuration, 1000 / 66);
  }


  /*
    Функция для обновления позиции ползунка продолжительности видео.   
  */
  function updateDuration() {
      durationControl.value = video.currentTime;
  }


  /*
      Управление звуком
  */
  function soundOf() {
      /*
          Делаем проверку уровня громкости. 
          Если у нас нашего видео есть звук, то мы его выключаем. 
          Предварительно запомнив текущую позицию громкости в переменную soundLevel
      */
      if (video.volume === 0) {
          video.volume = soundLevel;
          soundControl.value = soundLevel * 10;
      } else {
          /*
              Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
              Хранится в перменной soundLevel
          */
          soundLevel = video.volume;
          video.volume = 0;
          soundControl.value = 0;
      }
  }

  /*
      Управление звуком видео
  */
  function changeSoundVolume() {
      /*
          Св-во volume может принимать значения от 0 до 1
          Делим на 10 для того что бы, была возможность более точной регулировки видео. 
           video.volume 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9  1 
     soundControl.value 0   1   2   3   4   5   6   7   8   9  10
          */
      video.volume = soundControl.value / 10;
  }
})();