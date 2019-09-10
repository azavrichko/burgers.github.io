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


//
/* Horizontal Accordeon */
 let horizontalAccordeon = (function (options) {
 	let list = document.querySelector('.'+options.list);
 	let itemsList = list.querySelectorAll('.'+options.item);

 	/* calculate needed width */
 	let userWidth = window.innerWidth;
 	let titleItem = list.querySelector('.'+options.link);
 	let widthTitle = titleItem.clientWidth;
 	let neededWidth = userWidth - itemsList.length * widthTitle;
 	console.log(neededWidth);
 	neededWidth = (neededWidth > 520) ? 520 : neededWidth;

 	let _toogleItems = function (e) {
 		e.preventDefault();

 		if (e.target.className == options.link) {
 			let item = e.target.parentNode;
 			let contentItem = item.querySelector('.'+options.content);

 			if (!item.classList.contains(options.activeItem)) {
 				_closeItems(itemsList);
 				_openItem(item, contentItem);
 			} else {
 				_closeItem(item, contentItem);
 			}
 		}
 	};

 	let _openItem = function _openItem(item, contentItem) {
 		item.classList.toggle(options.activeItem);
 		contentItem.style.width = neededWidth + 'px';
 	};

 	let _closeItem = function _closeItem(item, contentItem) {
 		contentItem.style.width = '';
 		item.classList.remove(options.activeItem);
 	};

 	let _closeItems = function _closeItems(items) {
 		for (let i = 0; i < items.length; i++) {
 			let contentItem = items[i].querySelector('.'+options.content);
 			_closeItem(items[i], contentItem);
 		}
 	};

 	let addListeners = function () {
 		list.addEventListener('click', _toogleItems)
 	};

 	return {
 		init: addListeners
 	}
 })({
 	list: "menu-acco",
 	item: "menu-acco__item",
 	activeItem: "menu-acco__item--active",
 	link: "menu-acco__trigger",
 	content: "menu-acco__content"
 });

 horizontalAccordeon.init();

// Vertical Accordeon 

let acco = document.querySelector('#acco');

acco.addEventListener('click', function (e) {
	e.preventDefault();
	let target = e.target;
	let currentTarget = target.nextElementSibling;

	function clear() {
		let activeContent = document.querySelector('.team-acco__item.active'); //.team-acco__content.active
		if (activeContent) {
			activeContent.classList.remove('active');
		}
	}

	if (target.classList.contains('team-acco__trigger')) {
		if (currentTarget.classList.contains('active')) {
			currentTarget.classList.remove('active');
		} else {
			clear();
			currentTarget.classList.add('active');
		}
	}
})




/* popup */
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


/* slider */
/*
let slider = options => {
  let container = document.querySelector('.' + options.container);
  let widthWrapper = container.clientWidth;

	let wrapper = document.querySelector('.'+options.wrapper);
	wrapper.style.width = widthWrapper  + 'px';

	let list = document.querySelector('.'+options.list);
	let items = document.querySelectorAll('.'+options.item);

	let left = document.querySelector('.'+options.prev);
	let right = document.querySelector('.'+options.next);

	items.forEach(element => {
		element.style.width = widthWrapper  + 'px';
	});

	let minRight = 0;
	let maxRight = widthWrapper * (items.length - 1);
	let step = widthWrapper;
	let currentRight = 0;

	let _slideRight = value => {
		if (value <= maxRight) {
			currentRight += step;
			list.style.right = currentRight + "px";
		}
	};

	let _slideLeft = value => {
		if (value >= minRight) {
			currentRight -= step;
			list.style.right = currentRight + "px";
		}
	};

	let initial = () => {
		list.style.right = currentRight;

		right.addEventListener("click", e => {
			e.preventDefault();

			_slideRight(currentRight + step);
		});

		left.addEventListener("click", e => {
			e.preventDefault();

			_slideLeft(currentRight - step);
		});

		window.addEventListener("resize", () => {
      widthWrapper = container.clientWidth;
      wrapper.style.width = widthWrapper  + 'px';

      items.forEach(element => {
        element.style.width = widthWrapper  + 'px';
      });
    });

		_swipeDetected(wrapper);
	};

	let _swipeDetected = element => {
		let startX,
			startY,
			distX,
			distY,
			deviation = 200, //deviation from main direction
			threshold = 150, //min range for swipe
			allowedTime = 1000, //max time for range
			elapsedTime, //runtime
			startTime;

		element.addEventListener('touchstart', e => {
			let touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime(); //time touch with sensor
		});

		//disable touchmove
		element.addEventListener('touchmove', e => e.preventDefault());

		element.addEventListener('touchend', e => {
			let touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX; //get horizontal move
			distY = touchobj.pageY - startY; //get vertical move
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime) {
				if (Math.abs(distX) >= threshold && Math.abs(distY) <= deviation) { //horizontal swipe
					swipedir = (distX < 0) ? _slideRight(currentRight + step) : _slideLeft(currentRight - step)
				}
			}
		});
	};

	let _mobileIngredients = () => {
		let btnIngredients = document.querySelector('.burger__ingredients');
		let btnCloseIngredients = document.querySelector('.dropdown__close');

		btnCloseIngredients.addEventListener('click', e => {
			e.preventDefault();

			btnIngredients.classList.remove('active');
		});
		btnCloseIngredients.addEventListener('touchstart', e => {
			e.preventDefault();

			btnIngredients.classList.remove('active');
		});

		if (checkMobile) {
			btnIngredients.addEventListener('click', e => {
				e.preventDefault();
				btnIngredients.classList.add("active");
			});
		}
		btnIngredients.addEventListener('mouseenter', () => {
			btnIngredients.classList.add("active");
		});

		btnIngredients.addEventListener('mouseleave', () => {
			btnIngredients.classList.remove("active");
		});
	};
	_mobileIngredients();

	return {
		init: initial
	}
};

slider({
  container: 'burger',
	wrapper: 'burger__wrapper',
	list: 'burger__list',
	item: 'burger__item',
	next: 'burger__controls-link--next',
	prev: 'burger__controls-link--prev'
}).init();
*/

//Слайдер

$(document).ready(function(){

	$('.burger__controls-link').on('click', function(e){
		e.preventDefault();

		var
				$this = $(this),
				container = $this.closest('.burger'),
				list = container.find('.burger__list'),	
				items = container.find('.burger__item'),
				activeSlide = items.filter('.active'),
				nextSlide = activeSlide.next(),
				prevSlide = activeSlide.prev(),
				firstSlide = items.first(),
				lastSlide = items.last(),
				sliderOffset = container.offset().left,
				reqPos = 0;

		if ($(this).hasClass('.burger__controls-link--next')) {
						
			if (nextSlide.length) {
					findReqPos(nextSlide);					
					removeActiveClass(nextSlide);

				} else {
					findReqPos(firstSlide);
					removeActiveClass(firstSlide);
				}

		} else {

			if (prevSlide.length) {
				findReqPos(prevSlide);					
				removeActiveClass(prevSlide);

			} else {
				findReqPos(lastSlide);
				removeActiveClass(lastSlide);
			}

		}

		list.css('left', '-=' + reqPos + 'px');

		function removeActiveClass (reqSlide) {
			reqSlide.addClass('active').siblings().removeClass('active');
		}

		function findReqPos (slide) {
			reqPos = slide.offset().left - sliderOffset;
		}

	});

});








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
/* form order */
/*
const formOrder = $("#order-form");
const formReset = $(".order__form-button_reset");
formOrder.on('submit', function(e){
		e.preventDefault();

		let result = $.ajax(formOrder.attr('action'), {
			type: formOrder.attr('method'),
			data: $(this).serialize(),
			dataType: 'JSON'
		});

		result.done(function () {
			formReset.trigger('click');
		});

		result.fail(function (data) {
			console.log(data);
		});

		result.always(function (data) {
			let answer = openOverlay({
				classContainer: 'form__answer',
				classTitle: 'form__answer-title',
				classClose: 'form__answer_close',
				content: data.msg
			});

			document.body.appendChild(answer);
		})
	});

var openOverlay = options => {
	const overlayElement = document.createElement("div");
	overlayElement.classList.add("overlay");

	const containerElement = document.createElement("div");
	containerElement.classList.add(options.classContainer);

	const contentElement = document.createElement("div");
	contentElement.classList.add(options.classTitle);
	contentElement.textContent = options.content;
//	contentElement.textContent = "Сообщение отправлено";


	const closeElement = document.createElement("button");
	closeElement.classList.add(options.classClose);
	closeElement.classList.add('order-link');
	closeElement.textContent = "Закрыть";
	closeElement.addEventListener("click", function() {
		document.body.removeChild(overlayElement);
	});

	overlayElement.appendChild(containerElement);
	containerElement.appendChild(contentElement);
	containerElement.appendChild(closeElement);

	return overlayElement;
};

*/

/*
const myForm = document.querySelector('#order-form');
const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', function(event) {
event.preventDefault();

//console.log(myForm.elements.name.value);
//console.log(myForm.elements.phone.value);
//console.log(myForm.elements.comment.value);

if (validateForm(myForm)) {
	const data = {
		name: myForm.elements.name.value,
		phone: myForm.elements.phone.value,
		comment: myForm.elements.comment.value
	};
	
	const xhr = new XMLHttpRequest();
	xhr.responseType = 'json';
	xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
	xhr.send(JSON.stringify(data));
	xhr.addEventListener('load', () => {
		if (xhr.response.status) {
			console.log('все ок');
		}
	});
}
});


function validateForm(form) {
	let valid = true;

	if (!validateField(form.elements.name)) {
		valid = false;
	}
	if (!validateField(form.elements.phone)) {
		valid = false;
	}
	if (!validateField(form.elements.comment)) {
		valid = false;
	}
	return valid;
}

function validateField(field) {
	field.nextElementSibling.textContent = field.validationMessage;
	return field.checkValidity();	
}*/

// модальное 



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



//Для меню
let neededWidth = userWidth -  widthTitle;


/* yandex map */

