/*jshint evil: true*/
(function () {
"use strict";

var console = {}, methods = ['assert', 'clear', 'log', 'info', 'error', 'warn',
	'table', 'time', 'timeEnd', 'debug', 'exception'];

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

function makeMethod (name) {
	return function () {
		window.parent.postMessage({
			method: name,
			args: clone(Array.prototype.slice.call(arguments))
		}, '*');
	};
}

function initConsole (methods) {
	var i;
	for (i = 0; i < methods.length; i++) {
		console[methods[i]] = makeMethod(methods[i]);
	}
}

initConsole(methods);

window.onerror = function (error) { //better compatibility than addEventListener
	console.error(error);
};

window.addEventListener('message', function (e) {
	console.log(eval(e.data));
});

window.console = console;
})();