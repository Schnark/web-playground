/*jshint evil: true*/
(function () {
"use strict";

function escape (str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function clone (data, depth) {
	var ret, i;
	switch (typeof data) {
	case 'function': return 'function () {}';
	case 'object':
		if (!data) {
			return data;
		} else if (Array.isArray(data)) {
			if (depth >= 3) {
				return '[...]';
			} else {
				return data.map(function (el) {
					return clone(el, (depth || 0) + 1);
				});
			}
		} else {
			if (depth >= 3) {
				return '{...}';
			} else {
				ret = {};
				for (i in data) {
					if (Object.prototype.hasOwnProperty.call(data, i)) {
						ret[i] = clone(data[i], (depth || 0) + 1);
					}
				}
				return ret;
			}
		}
		break;
	case 'symbol':
		return String(data);
	default:
		return data;
	}
}

function formatOne (o, format) {
	if (!format && typeof o === 'object') {
		format = '%o';
	}
	switch (format) {
	case '%o':
	case '%O':
		return JSON.stringify(clone(o));
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
			if (i === args.length - 1) {
				return format;
			}
			i++;
			return formatOne(args[i], format);
		});
		out.push(arg0);
		i++;
	}
	for (; i < arguments.length; i++) {
		out.push(formatOne(arguments[i]));
	}
	return out.join(' ');
}

function Console (send) {
	this.send = send;
	this.console = window.console || {};
	this.timers = {};
}

Console.prototype.sendClear = function () {
	this.send({
		clear: true
	});
};

Console.prototype.sendItem = function (data, cls, isHtml) {
	this.send({
		data: data,
		cls: cls,
		isHtml: isHtml
	});
};

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
	this.sendClear();
	if (this.console.clear) {
		this.console.clear.apply(this.console, arguments);
	}
};

Console.prototype.log = function () {
	this.sendItem(format.apply(null, arguments));
	if (this.console.log) {
		this.console.log.apply(this.console, arguments);
	}
};

Console.prototype.info = function () {
	this.sendItem(format.apply(null, arguments), 'info');
	if (this.console.info) {
		this.console.info.apply(this.console, arguments);
	}
};

Console.prototype.error = function () {
	this.sendItem(format.apply(null, arguments), 'error');
	if (this.console.error) {
		this.console.error.apply(this.console, arguments);
	}
};

Console.prototype.warn = function () {
	this.sendItem(format.apply(null, arguments), 'warn');
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
	this.sendItem(html, null, true);
	if (this.console.table) {
		this.console.table.apply(this.console, arguments);
	}
};

Console.prototype.time = function (name) {
	this.timers[name] = Date.now();
	this.sendItem('Start timer ' + name);
	if (this.console.time) {
		this.console.time.apply(this.console, arguments);
	}
};

Console.prototype.timeEnd = function (name) {
	if (this.timers[name]) {
		this.sendItem('Stop timer ' + name + ': ' + (Date.now() - this.timers[name]) + 'ms');
	}
	if (this.console.timeEnd) {
		this.console.timeEnd.apply(this.console, arguments);
	}
};

Console.prototype.debug = Console.prototype.log;
Console.prototype.exception = Console.prototype.error;

function send (data) {
	window.parent.postMessage(data, '*');
}

window.onerror = function (error) { //better compatibility than addEventListener
	console.error(error);
};

window.addEventListener('message', function (e) {
	console.log('> ' + e.data);
	console.log(eval(e.data));
});

window.console = new Console (send);

function fixHashLinks () {
	var hashLinks = document.querySelectorAll('[href^="#"]'), i;
	for (i = 0; i < hashLinks.length; i++) {
		hashLinks[i].setAttribute('href', document.location + hashLinks[i].getAttribute('href'));
	}
}

document.addEventListener('DOMContentLoaded', fixHashLinks);
})();