const navigation = document.querySelector('.navigation')

function toggleMenuButton() {
	menu.classList.toggle('show');
	layout.classList.toggle('show');
};

menu.addEventListener('click', () => {
	toggleMenuButton();
});
