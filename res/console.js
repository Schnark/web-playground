/*global Console: true*/
Console =
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

function formatOne (o, format) {
	if (!format && typeof o === 'object') {
		format = '%o';
	}
	switch (format) {
	case '%o':
	case '%O':
		return JSON.stringify(o);
	case '%c':
		return '';
	default: //FIXME
		return String(o);
	}
}

function format (arg0) {
	var out = [], i, args = arguments;
	i = 0;
	if (typeof arg0 === 'string') {
		arg0 = arg0.replace(/%[oOcsdif]/g, function (format) { //FIXME
			i++;
			return formatOne(args[i], format);
		});
		out.push(arg0);
		i++;
	}
	for (; i < arguments.length; i++) {
		out.push(formatOne(arguments[i]));
	}
	return out.join('');
}

function Console (list) {
	this.list = list;
	this.console = window.console || {};
	this.timers = {};
}

//FIXME count, dir, dirxml, group, groupCollapsed, groupEnd, profile, profileEnd, timeStamp, trace

Console.prototype.assert = function (cond) {
	if (!cond) {
		this.log.apply(this.console, [].slice.apply(arguments, 1));
	}
	if (this.console.assert) {
		this.console.assert.apply(this.console, arguments);
	}
};

Console.prototype.clear = function () {
	this.list.innerHTML = '';
	if (this.console.clear) {
		this.console.clear.apply(this.console, arguments);
	}
};

Console.prototype.log = function () {
	this.list.appendChild(makeListItem(format.apply(null, arguments)));
	if (this.console.log) {
		this.console.log.apply(this.console, arguments);
	}
};

Console.prototype.info = function () {
	this.list.appendChild(makeListItem(format.apply(null, arguments), 'info'));
	if (this.console.info) {
		this.console.info.apply(this.console, arguments);
	}
};

Console.prototype.error = function () {
	this.list.appendChild(makeListItem(format.apply(null, arguments), 'error'));
	if (this.console.error) {
		this.console.error.apply(this.console, arguments);
	}
};

Console.prototype.warn = function () {
	this.list.appendChild(makeListItem(format.apply(null, arguments), 'warn'));
	if (this.console.warn) {
		this.console.warn.apply(this.console, arguments);
	}
};

Console.prototype.table = function (data) { //FIXME columns
	var html = [], i;
	for (i in data) {
		if (Object.prototype.hasOwnProperty.call(data, i)) {
			html.push('<tr><td>' + i + '</td><td>' + escape(formatOne(data[i])) + '</td></tr>');
		}
	}
	html = '<table><tr><th>(index)</th><th>value</th></tr>' + html.join('') + '</table>';
	this.list.appendChild(makeListItem(html, null, true));
	if (this.console.table) {
		this.console.table.apply(this.console, arguments);
	}
};

Console.prototype.time = function (name) {
	this.timers[name] = Date.now();
	this.list.appendChild(makeListItem('Start timer ' + escape(name)));
	if (this.console.time) {
		this.console.time.apply(this.console, arguments);
	}
};

Console.prototype.timeEnd = function (name) {
	if (this.timers[name]) {
		this.list.appendChild(makeListItem('Stop timer ' + escape(name) + ': ' + (Date.now() - this.timers[name]) + 'ms'));
	}
	if (this.console.timeEnd) {
		this.console.timeEnd.apply(this.console, arguments);
	}
};

Console.prototype.debug = Console.prototype.log;
Console.prototype.exception = Console.prototype.error;

return Console;
})();