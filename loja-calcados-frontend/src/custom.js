function toggleMenu() {
	$('body').removeClass('untouched');
	$('body').toggleClass('menu-visivel');
}

function toggleSubMenu(elem) {
	$('.submenu').not(elem).removeClass('submenu-aberto');
	$(elem).toggleClass('submenu-aberto');
}

function ativaLinkPagina() {
	var path = window.location.pathname,
		elem = $('[href="' + path.substring(1) + '"]');
	$('.submenu-item').removeClass('ativo');
	$(elem).addClass('ativo');
}

function buscar() {
	$('.nada-pesquisado').toggleClass('d-none');
	$('#grpResultado').toggleClass('d-none');
}

function voltar() {
	$('.nada-pesquisado').removeClass('d-none');
	$('#grpResultado').addClass('d-none');
}

function recolher(elem) {
	$(elem).addClass('d-none').next().removeClass('d-none');
	$(elem).parent().parent().next().addClass('d-none');
}

function expandir(elem) {
	$(elem).addClass('d-none').prev().removeClass('d-none');
	$(elem).parent().parent().next().removeClass('d-none');
}

function toggleRecolhivel(elem) {
	if($(elem).is('.box-recolhivel-titulo button')) {
		$(elem).parents('.box-recolhivel').toggleClass('aberto');
	}
	if($(elem).is('.box-historico-titulo button')) {
		$(elem).parents('.box-historico').toggleClass('aberto');
	}
}

function navegar(url) {
	window.location.assign(url);
}

function enableTooltips() {
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	});
}

function removeLinha(e) {
	$(e).parent().parent().remove();
}

$(function() {
	setTimeout(ativaLinkPagina, 500);
	setTimeout(enableTooltips, 500);
});
