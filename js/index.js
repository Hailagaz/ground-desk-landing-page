


document.addEventListener("DOMContentLoaded", () => {

	let menuBtn = document.querySelector('#menu-toggle');
	let menu = document.querySelector('.header__list');

	menuBtn.addEventListener('click', function () {
		menu.classList.toggle('active');
		menuBtn.classList.toggle('active');
	});

	// if(window.location.hash) {
	//     document.querySelector(window.location.hash).scrollIntoView();
	// }

	// ----------------------------------------
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
	// ----------------------------------------

	// ----Prising switch----
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
})
