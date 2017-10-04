/*global Playground, Console, file*/
(function () {
"use strict";

var pages = {}, buttons = {}, playground = new Playground(document.body, 'web-playground-autosave');

function initPages () {
	var ids = ['meta', 'html', 'css', 'js', 'document', 'console'];
	ids.forEach(function (id, i) {
		pages[id] = document.getElementById(id);
		buttons[id] = document.getElementById('button-' + id);
		buttons[id].addEventListener('click', function () {
			showPage(id);
		});
		if (i === 0) {
			pages.current = pages[id];
		}
	});
}

function showPage (id) {
	if (id === 'document' || id === 'console') {
		playground.createDocument();
	}
	pages.current.style.display = 'none';
	buttons[pages.current.id].className = '';
	pages.current = pages[id];
	pages.current.style.display = 'block';
	buttons[id].className = 'selected';
}

function buildExamples (el, examples) {
	examples.forEach(function (example) {
		var li, a;
		li = document.createElement('li');
		a = document.createElement('a');
		a.href = '#';
		a.textContent = example.title;
		a.addEventListener('click', function (e) {
			e.preventDefault();
			playground.loadExample(example);
		});
		li.appendChild(a);
		el.appendChild(li);
	});
}

function init () {
	var input;

	initPages();

	document.getElementById('load-lib').addEventListener('click', function () {
		file.openAsUrl(function (url) {
			if (url) {
				playground.addLib(url);
			}
		});
	});

	document.getElementById('open-html').addEventListener('click', function () {
		file.open(function (html) {
			if (html) {
				playground.setHtml(html);
			}
		});
	});
	document.getElementById('save-html').addEventListener('click', function () {
		file.save(playground.getHtml(), playground.getName('html'));
	});
	document.getElementById('open-css').addEventListener('click', function () {
		file.open(function (css) {
			if (css) {
				playground.setCss(css);
			}
		});
	});
	document.getElementById('save-css').addEventListener('click', function () {
		file.save(playground.getCss(), playground.getName('css'));
	});
	document.getElementById('open-js').addEventListener('click', function () {
		file.open(function (js) {
			if (js) {
				playground.setJs(js);
			}
		});
	});
	document.getElementById('save-js').addEventListener('click', function () {
		file.save(playground.getJs(), playground.getName('js'));
	});

	document.getElementById('empty-project').addEventListener('click', function () {
		playground.empty();
	});

	window.console = new Console(document.getElementById('console-list'));
	input = document.getElementById('console-input');
	input.addEventListener('keydown', function (e) {
		if (e.keyCode === 13) {
			playground.execute(input.value);
			input.value = '';
		}
	});

	buildExamples(document.getElementById('examples'), Playground.examples);
}

init();

})();