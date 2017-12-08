/*global console*/
/*global Symbol*/
/*jshint evil: true*/
(function () {
"use strict";

function escape (str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

//from QUnit
/*jscs: disable disallowDanglingUnderscores*/
var dump = (function () {
	function inArray (elem, array) {
		return array.indexOf(elem) !== -1;
	}
	function objectType (obj) {
		if (typeof obj === 'undefined') {
			return 'undefined';
		}
		if (obj === null) {
			return 'null';
		}
		var match = toString.call(obj).match(/^\[object\s(.*)\]$/),
			type = match && match[1];
		switch (type) {
			case 'Number':
				if (isNaN(obj)) {
					return 'nan';
				}
				return 'number';
			case 'String':
			case 'Boolean':
			case 'Array':
			case 'Set':
			case 'Map':
			case 'Date':
			case 'RegExp':
			case 'Function':
			case 'Symbol':
				return type.toLowerCase();
			default:
				return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
		}
	}
	function is (type, obj) {
		return objectType(obj) === type;
	}
	function quote (str) {
		return '"' + str.toString().replace(/\\/g, '\\\\').replace(/"/g, '\\\"') + '"';
	}
	function literal (o) {
		return String(o);
	}
	function join (pre, arr, post) {
		var s = dump.separator(),
			base = dump.indent(),
			inner = dump.indent(1);
		if (arr.join) {
			arr = arr.join(',' + s + inner);
		}
		if (!arr) {
			return pre + post;
		}
		return [pre, inner + arr, base + post].join(s);
	}
	function array (arr, stack) {
		/*jshint validthis: true*/
		var i = arr.length,
			ret = new Array(i);
		if (dump.maxDepth && dump.depth > dump.maxDepth) {
			return '[object Array]';
		}
		this.up();
		while (i--) {
			ret[i] = this.parse(arr[i], undefined, stack);
		}
		this.down();
		return join('[', ret, ']');
	}
	function isArray (obj) {
		try {
			return (
				toString.call(obj) === '[object Array]' ||
				typeof obj.length === 'number' && obj.item !== undefined &&
					(obj.length ? obj.item(0) === obj[0] : obj.item(0) === null && obj[0] === undefined)
			);
		} catch (e) {
			return false;
		}
	}
	var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
			function (obj) {
				return typeof obj;
			} : function (obj) {
				return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ?
					'symbol' : typeof obj;
			},
		toString = Object.prototype.toString,
		reName = /^function (\w+)/,
		dump = {
		parse: function parse (obj, objType, stack) {
			stack = stack || [];
			var res,
				parser,
				parserType,
				objIndex = stack.indexOf(obj);
			if (objIndex !== -1) {
				return 'recursion(' + (objIndex - stack.length) + ')';
			}
			objType = objType || this.typeOf(obj);
			parser = this.parsers[objType];
			parserType = typeof parser === 'undefined' ? 'undefined' : _typeof(parser);
			if (parserType === 'function') {
				stack.push(obj);
				res = parser.call(this, obj, stack);
				stack.pop();
				return res;
			}
			return parserType === 'string' ? parser : this.parsers.error;
		},
		typeOf: function typeOf (obj) {
			var type;
			if (obj === null) {
				type = 'null';
			} else if (typeof obj === 'undefined') {
				type = 'undefined';
			} else if (is('regexp', obj)) {
				type = 'regexp';
			} else if (is('date', obj)) {
				type = 'date';
			} else if (is('function', obj)) {
				type = 'function';
			} else if (obj.setInterval !== undefined && obj.document !== undefined && obj.nodeType === undefined) {
				type = 'window';
			} else if (obj.nodeType === 9) {
				type = 'document';
			} else if (obj.nodeType) {
				type = 'node';
			} else if (isArray(obj)) {
				type = 'array';
			} else if (obj.constructor === Error.prototype.constructor) {
				type = 'error';
			} else {
				type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
			}
			return type;
		},
		separator: function separator () {
			if (this.multiline) {
				return this.HTML ? '<br>' : '\n';
			} else {
				return this.HTML ? '&#160;' : ' ';
			}
		},
		indent: function indent (extra) {
			if (!this.multiline) {
				return '';
			}
			var chr = this.indentChar;
			if (this.HTML) {
				chr = chr.replace(/\t/g, '   ').replace(/ /g, '&#160;');
			}
			return new Array(this.depth + (extra || 0)).join(chr);
		},
		up: function up (a) {
			this.depth += a || 1;
		},
		down: function down (a) {
			this.depth -= a || 1;
		},
		setParser: function setParser (name, parser) {
			this.parsers[name] = parser;
		},
		quote: quote,
		literal: literal,
		join: join,
		depth: 1,
		maxDepth: 5,
		parsers: {
			window: '[Window]',
			document: '[Document]',
			error: function error (_error) {
				return 'Error(\"' + _error.message + '\")';
			},
			unknown: '[Unknown]',
			'null': 'null',
			'undefined': 'undefined',
			'function': function _function (fn) {
				var ret = 'function',
				name = 'name' in fn ? fn.name : (reName.exec(fn) || [])[1];
				if (name) {
					ret += ' ' + name;
				}
				ret += '(';
				ret = [ret, dump.parse(fn, 'functionArgs'), '){'].join('');
				return join(ret, dump.parse(fn, 'functionCode'), '}');
			},
			array: array,
			nodelist: array,
			'arguments': array,
			object: function object (map, stack) {
				/*jshint forin: false*/
				var keys,
					key,
					val,
					i,
					nonEnumerableProperties,
					ret = [];
				if (dump.maxDepth && dump.depth > dump.maxDepth) {
					return '[object Object]';
				}
				dump.up();
				keys = [];
				for (key in map) {
					keys.push(key);
				}
				nonEnumerableProperties = ['message', 'name'];
				for (i in nonEnumerableProperties) {
					key = nonEnumerableProperties[i];
					if (key in map && !inArray(key, keys)) {
						keys.push(key);
					}
				}
				keys.sort();
				for (i = 0; i < keys.length; i++) {
					key = keys[i];
					try {
						val = map[key];
						ret.push(dump.parse(key, 'key') + ': ' + dump.parse(val, undefined, stack));
					} catch (e) {
						ret.push(dump.parse(key, 'key') + ': [Restricted]');
					}
				}
				dump.down();
				return join('{', ret, '}');
			},
			node: function node (_node) {
				var len,
					i,
					val,
					open = dump.HTML ? '&lt;' : '<',
					close = dump.HTML ? '&gt;' : '>',
					tag = _node.nodeName.toLowerCase(),
					ret = open + tag,
					attrs = _node.attributes;
				if (attrs) {
					for (i = 0, len = attrs.length; i < len; i++) {
						val = attrs[i].nodeValue;
						if (val && val !== 'inherit') {
							ret += ' ' + attrs[i].nodeName + '=' + dump.parse(val, 'attribute');
						}
					}
				}
				ret += close;
				if (_node.nodeType === 3 || _node.nodeType === 4) {
					ret += _node.nodeValue;
				}
				return ret + open + '/' + tag + close;
			},
			functionArgs: function functionArgs (fn) {
				var args,
					l = fn.length;
				if (!l) {
					return '';
				}
				args = new Array(l);
				while (l--) {
					args[l] = String.fromCharCode(97 + l);
				}
				return ' ' + args.join(', ') + ' ';
			},
			key: quote,
			functionCode: '[code]',
			attribute: quote,
			string: quote,
			date: quote,
			regexp: literal,
			number: literal,
			'boolean': literal,
			symbol: function symbol (sym) {
				return sym.toString();
			}
		},
		HTML: false,
		indentChar: '  ',
		multiline: false
	};
	return dump;
/**/})();
/*jscs: enable disallowDanglingUnderscores*/

function formatOne (o, format) {
	if (!format) {
		format = typeof o === 'object' ? '%o' : '%s';
	}
	switch (format) {
	case '%o':
	case '%O':
		return dump.parse(o);
	case '%d':
	case '%i':
		return String(parseInt(o, 10));
	case '%f':
		return String(parseFloat(o));
	case '%s':
		return String(o);
	case '%c': //TODO implement CSS?
		return '';
	}
}

function format (arg0) {
	var out = [], i, args = arguments;
	i = 0;
	if (typeof arg0 === 'string') {
		arg0 = arg0.replace(/%[oOcsdif]/g, function (format) {
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
	this.labels = {};
	this.groupCount = 0;
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

Console.prototype.sendGroup = function (open) {
	this.send({
		group: open
	});
};

//TODO (or not): profile, profileEnd, timeStamp, trace

Console.prototype.assert = function (cond) {
	var args;
	if (!cond) {
		args = [].slice.call(arguments, 1);
		if (typeof args[0] === 'string') {
			args[0] = 'Assertion failed: ' + args[0];
		} else {
			args.unshift('Assertion failed');
		}
		this.sendItem(format.apply(null, args), 'error');
	}
	if (this.console.assert) {
		this.console.assert.apply(this.console, arguments);
	}
};

Console.prototype.clear = function () {
	this.groupCount = 0;
	this.sendClear();
	if (this.console.clear) {
		this.console.clear.apply(this.console, arguments);
	}
};

Console.prototype.count = function (label) { //only supported with argument
	var c = this.labels[label] || 0;
	c++;
	this.labels[label] = c;
	this.sendItem(label + ': ' + c, 'info');
	if (this.console.count) {
		this.console.count.apply(this.console, arguments);
	}
};

Console.prototype.dir = function (o) {
	this.sendItem(formatOne(o));
	if (this.console.dir) {
		this.console.dir.apply(this.console, arguments);
	}
};

Console.prototype.dirxml = function () {
	this.sendItem(format.apply(null, arguments));
	if (this.console.dirxml) {
		this.console.dirxml.apply(this.console, arguments);
	}
};

Console.prototype.error = function () {
	this.sendItem(format.apply(null, arguments), 'error');
	if (this.console.error) {
		this.console.error.apply(this.console, arguments);
	}
};

Console.prototype.group = function () {
	this.groupCount++;
	this.sendGroup(true);
	this.sendItem(format.apply(null, arguments));
	if (this.console.group) {
		this.console.group.apply(this.console, arguments);
	}
};

Console.prototype.groupCollapsed = function () {
	this.groupCount++;
	this.sendGroup(true);
	this.sendItem(format.apply(null, arguments));
	if (this.console.groupCollapsed) {
		this.console.groupCollapsed.apply(this.console, arguments);
	}
};

Console.prototype.groupEnd = function () {
	if (this.groupCount) {
		this.groupCount--;
		this.sendGroup(false);
	}
	if (this.console.groupEnd) {
		this.console.groupEnd.apply(this.console, arguments);
	}
};

Console.prototype.info = function () {
	this.sendItem(format.apply(null, arguments), 'info');
	if (this.console.info) {
		this.console.info.apply(this.console, arguments);
	}
};

Console.prototype.log = function () {
	this.sendItem(format.apply(null, arguments));
	if (this.console.log) {
		this.console.log.apply(this.console, arguments);
	}
};

Console.prototype.table = function (data, columns) {
	var html = [], key, column, i;
	for (key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			if (!columns) {
				columns = [];
				if (typeof data[key] === 'object') {
					for (column in data[key]) {
						if (Object.prototype.hasOwnProperty.call(data[key], column)) {
							columns.push(column);
						}
					}
				}
			}
			html.push('<tr><th>' + escape(key) + '</th>');
			if (columns.length) {
				for (i = 0; i < columns.length; i++) {
					html.push('<td>' + escape(formatOne(data[key][columns[i]])) + '</td>');
				}
			} else {
				html.push('<td>' + escape(formatOne(data[key])) + '</td>');
			}
			html.push('</tr>');
		}
	}
	html = '<table>' +
		'<tr><th>(index)</th>' +
		(columns.length ? columns.map(function (column) {
			return '<th>' + escape(column) + '</th>';
		}).join('') : '<th>(value)</th>') +
		'</tr>' +
		html.join('') +
		'</table>';
	this.sendItem(html, null, true);
	if (this.console.table) {
		this.console.table.apply(this.console, arguments);
	}
};

Console.prototype.time = function (name) {
	this.sendItem('Start timer ' + name, 'info');
	if (this.console.time) {
		this.console.time.apply(this.console, arguments);
	}
	this.timers[name] = Date.now();
};

Console.prototype.timeEnd = function (name) {
	if (this.timers[name]) {
		this.sendItem('Stop timer ' + name + ': ' + (Date.now() - this.timers[name]) + 'ms');
	}
	if (this.console.timeEnd) {
		this.console.timeEnd.apply(this.console, arguments);
	}
};

Console.prototype.warn = function () {
	this.sendItem(format.apply(null, arguments), 'warn');
	if (this.console.warn) {
		this.console.warn.apply(this.console, arguments);
	}
};

Console.prototype.debug = Console.prototype.log;
Console.prototype.exception = Console.prototype.error;

function send (data) {
	window.parent.postMessage(data, '*');
}

window.console = new Console (send);

window.onerror = function (error) { //better compatibility than addEventListener
	console.error(error);
};

window.addEventListener('message', function (e) {
	console.log('> ' + e.data);
	try {
		console.log(eval(e.data));
	} catch (e) {
		console.error(e);
	}
});

function fixHashLinks () {
	var hashLinks = document.querySelectorAll('[href^="#"]'), i;
	for (i = 0; i < hashLinks.length; i++) {
		hashLinks[i].setAttribute('href', document.location + hashLinks[i].getAttribute('href'));
	}
}

document.addEventListener('DOMContentLoaded', fixHashLinks);
})();