document.addEventListener("DOMContentLoaded", () => {
	if (window.location.hash) {
		document.querySelector(window.location.hash).scrollIntoView();
	}



	// Section: Burger menu
	let menuBtn = document.querySelector('#menu-toggle');
	let menu = document.querySelector('.header__list');

	menuBtn.addEventListener('click', function () {
		menu.classList.toggle('active');
		menuBtn.classList.toggle('active');
	});



	// Section: Smooth scroll to chosen section
	const menuLinks = document.querySelectorAll('.header__link[data-goto]');
	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener("click", onMenuLinkClick);
		});

		function onMenuLinkClick(e) {
			const menuLink = e.target;
			if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
				const gotoBlock = document.querySelector(menuLink.dataset.goto);
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

				window.scrollTo({
					top: gotoBlockValue,
					behavior: "smooth"
				});
				e.preventDefault();

			}

			menu.classList.toggle('active');
			menuBtn.classList.toggle('active');
		}
	}



	// Section: Pricing switch action
	let plan = document.getElementById('planCheck');
	let periods = document.querySelectorAll('.pricing__plan-period');
	let prices = document.querySelectorAll('.pricing__plan-cash');

	plan.addEventListener('click', onSwitchClick);

	function onSwitchClick(e) {
		for (let price of prices) {
			price.innerText = `$${plan.checked ? price.dataset.year : price.dataset.month}`;
		}
		for (let period of periods) {
			period.innerText = plan.checked ? '/year' : '/month';
		}
	}
	onSwitchClick();



	// Section: Testimonials
	fetch("js/testimonials.json")
		.then((response) => response.json())
		.then((data) => {
			let slides = '';

			for (let testimonial of data) {
				slides += `
						<div class="swiper-slide customer__testimonial">
							<div class="customer__testimonial-user">
								<div class="customer__testimonial-photo">
									<img src="${testimonial.image}" alt="Customer photo">
								</div>
								<div class="customer__testimonial-info">
									<div class="customer__testimonial-name">
										<h4>${testimonial.name}</h4>
									</div>
									<div class="customer__testimonial-position">
										<p>${testimonial.position}</p>
									</div>
								</div>
							</div>
							<div class="customer__testimonial-text">
								<p>${testimonial.testimonial}</p>
							</div>
							<div class="customer__testimonial-stars">
								<img src="${testimonial.stars}>
							</div>
						</div>
			`;
			}
			document.querySelector('.swiper').innerHTML = `
                    <div class="swiper-wrapper customer__wrapper">
                        ${slides}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                `;

			// SWIPER
			const swiper = new Swiper('.swiper', {
				loop: true,

				slidesPerView: 1,
				watchOverflow: true,
				spaceBetween: 125,
				slidesPerGroup: 1,
				centeredSlides: true,

				effect: 'coverflow',
				coverflowEffect: {
					rotate: 0,
					slideShadows: false,
					scale: 0.8,
				},
				slideToClickedSlide: true,

				keyboard: {
					enabled: true,
					onlyInViewport: true,
					pageUpDown: true,
				},

				mousewheel: {
					sensitivity: 1,
				},

				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
		})
		.catch((err) => {
			document.querySelector('.swiper').innerHTML = '<p>Sorry, we have a problem. It will be fixed soon.</p>';
		});
})
