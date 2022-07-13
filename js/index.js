
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
	let plan = document.querySelector('#planCheck');
	let planValue1 = document.querySelector('#planValue1');
	let planValue2 = document.querySelector('#planValue2');
	let planValue3 = document.querySelector('#planValue3');
	let term = document.querySelectorAll('.pricing__plan-period');

	plan.addEventListener('click', onSwitchClick);

	function onSwitchClick(e) {
		if (plan.checked == true) {
			planValue1.innerHTML = '<p>$54</p>';
			planValue2.innerHTML = '<p>$130</p>';
			planValue3.innerHTML = '<p>$173</p>';
			for (let i = 0; i < term.length; i++) {
				term[i].innerHTML = '<p>/year</p>';
			}
		} else {
			planValue1.innerHTML = '<p>$5</p>';
			planValue2.innerHTML = '<p>$12</p>';
			planValue3.innerHTML = '<p>$16</p>';
			for (let i = 0; i < term.length; i++) {
				term[i].innerHTML = '<p>/month</p>';
			}
		}
	}
	// --------------------

})