/*global Playground: true*/
/*global URL, Blob, console*/
Playground =
(function () {
"use strict";

function escape (str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function makeListItem (data, cls, isHtml) {
	var html = String(data), li;
	if (!isHtml) {
		html = escape(html);
	}
	li = document.createElement('li');
	if (cls) {
		li.className = cls;
	}
	li.innerHTML = html;
	return li;
}

function clone (array) {
	return JSON.parse(JSON.stringify(array));
}

function Playground (container, autosaveKey) {
	this.container = container;
	this.autosaveKey = autosaveKey;
	this.initData();
	this.initEvents();
	this.initConsole();
}

Playground.prototype.initData = function () {
	var data;
	if (this.autosaveKey) {
		try {
			data = JSON.parse(localStorage[this.autosaveKey] || 'x');
			this.documentReady = false;
			this.js = data.js;
			this.css = data.css;
			this.html = data.html;
			this.meta = data.meta;
			this.initInputs();
			return;
		} catch (e) {
		}
	}
	this.empty();
};

Playground.prototype.empty = function () {
	this.documentReady = false;
	this.js = '';
	this.css = '';
	this.html = '';
	this.meta = {
		title: '',
		lang: '',
		libs: [
			'console-shim.js'
		],
		jshead: false
	};
	this.initInputs();
};

Playground.prototype.autosave = function () {
	if (this.autosaveKey) {
		try {
			localStorage[this.autosaveKey] = JSON.stringify({
				js: this.js,
				css: this.css,
				html: this.html,
				meta: {
					title: this.meta.title,
					lang: this.meta.lang,
					libs: this.meta.libs.filter(function (url) {
						return url.indexOf('blob:') !== 0;
					}),
					jshead: this.meta.jshead
				}
			});
		} catch (e) {
		}
	}
};

Playground.prototype.loadExample = function (example) {
	this.documentReady = false;
	this.js = example.js || '';
	this.css = example.css || '';
	this.html = example.html || '';
	this.meta = {
		title: example.title,
		lang: 'en',
		libs: clone(example.libs || []),
		jshead: false
	};
	this.meta.libs.push('console-shim.js');
	this.initInputs();
};

Playground.prototype.buildLib = function (lib) {
	var type = lib.replace(/.*\./, '');
	switch (type) {
	case 'js':
		return '<script src="' + escape(lib) + '"></script>';
	case 'css':
		return '<link rel="stylesheet" href="' + escape(lib) + '">';
	default:
		return '';
	}
};

Playground.prototype.createDocumentHtml = function () {
	var html = [];
	html.push('<!DOCTYPE html>');
	html.push(this.meta.lang ? '<html lang="' + escape(this.meta.lang) + '">' : '<html>');
	html.push('<head>');
	html.push('<meta charset="utf-8">');
	html.push('<title>' + escape(this.meta.title) + '</title>');
	html.push('<meta name="viewport" content="width=device-width; initial-scale=1.0">'); //seems to be ignored anyway
	html.push('<base href="' + escape(String(location.href).replace('index.html', 'res/')) + '" target="_blank">');
	this.meta.libs.forEach(function (lib) {
		html.push(this.buildLib(lib));
	}, this);
	html.push('<style>');
	html.push(this.css);
	html.push('</style>');
	if (this.meta.jshead) {
		html.push('<script>');
		html.push(this.js);
		html.push('</script>');
	}
	html.push('</head>');
	html.push('<body>');
	html.push(this.html);
	if (!this.meta.jshead) {
		html.push('<script>');
		html.push(this.js);
		html.push('</script>');
	}
	html.push('</body>');
	html.push('</html>');
	return html.join('\n');
};

Playground.prototype.createDocument = function () {
	if (this.documentReady) {
		return;
	}
	this.updateDocument(this.createDocumentHtml());
	this.documentReady = true;
};

Playground.prototype.initInputs = function () {
	['js', 'css', 'html', 'title', 'lang', 'libs', 'jshead'].forEach(function (id) {
		this.initInput(id);
	}.bind(this));
};

Playground.prototype.initInput = function (id) {
	var el = this.container.getElementsByClassName('input-' + id)[0];
	switch (id) {
	case 'libs':
		el.value = this.meta.libs.join('\n');
		break;
	case 'jshead':
		el.checked = this.meta[id];
		break;
	case 'title':
	case 'lang':
		el.value = this.meta[id];
		break;
	default:
		el.value = this[id];
	}
	this.autosave();
};

Playground.prototype.initEvents = function () {
	['js', 'css', 'html', 'title', 'lang', 'libs', 'jshead'].forEach(function (id) {
		var el = this.container.getElementsByClassName('input-' + id)[0];
		el.addEventListener('change', function () {
			this.updateFromInput(id);
		}.bind(this));
		el.addEventListener('keyup', function () {
			this.updateFromInput(id);
		}.bind(this));
	}.bind(this));
};

Playground.prototype.updateFromInput = function (id) {
	var el;
	this.documentReady = false;
	el = this.container.getElementsByClassName('input-' + id)[0];
	switch (id) {
	case 'libs':
		this.meta.libs = el.value.split('\n');
		break;
	case 'jshead':
		this.meta[id] = el.checked;
		break;
	case 'title':
	case 'lang':
		this.meta[id] = el.value;
		break;
	default:
		this[id] = el.value;
	}
	this.autosave();
};

Playground.prototype.addLib = function (url) {
	this.documentReady = false;
	this.meta.libs.push(url);
	this.initInput('libs');
};

Playground.prototype.getName = function (type) {
	return (this.meta.title || 'untitled') + '.' + type;
};

Playground.prototype.getHtml = function () {
	return this.html;
};

Playground.prototype.setHtml = function (html) {
	this.documentReady = false;
	this.html = html;
	this.initInput('html');
};

Playground.prototype.getCss = function () {
	return this.css;
};

Playground.prototype.setCss = function (css) {
	this.documentReady = false;
	this.css = css;
	this.initInput('css');
};

Playground.prototype.getJs = function () {
	return this.js;
};

Playground.prototype.setJs = function (js) {
	this.documentReady = false;
	this.js = js;
	this.initInput('js');
};

Playground.prototype.getIframe = function () {
	return this.container.getElementsByClassName('page-document')[0].getElementsByTagName('iframe')[0];
};

Playground.prototype.updateDocument = function (html) {
	var iframe = this.getIframe();
	if (iframe.srcdoc) {
		iframe.srcdoc = html;
	} else {
		if (iframe.src) {
			URL.revokeObjectURL(iframe.src);
		}
		iframe.src = URL.createObjectURL(new Blob([html], {type: 'text/html'}));
	}
};

Playground.prototype.initConsole = function () {
	var console = this.container.getElementsByClassName('page-console')[0].getElementsByTagName('ul')[0];
	window.addEventListener('message', function (e) {
		if (e.data.clear) {
			console.innerHTML = '';
		} else {
			console.appendChild(makeListItem(e.data.data, e.data.cls, e.data.isHtml));
		}
	});
};

Playground.prototype.execute = function (str) {
	if (this.meta.libs.indexOf('console-shim.js') > -1) {
		this.getIframe().contentWindow.postMessage(str, '*');
	} else {
		this.container.getElementsByClassName('page-console')[0].getElementsByTagName('ul')[0]
			.appendChild(makeListItem('Console not available'));
	}
};

return Playground;
})();