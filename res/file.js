/*global file: true*/
/*global Blob, URL, MozActivity*/
file =
(function () {
"use strict";

function saveFile (text, name) {
	fileSaveAs(createTextFile(text), name);
}

function createTextFile (text, type) {
	return new Blob([text], {type: type || 'image/png'}); //stupid, but yes
}

function fileSaveAs (file, name) {
	var a = document.createElement('a');
	file = URL.createObjectURL(file);
	a.href = file;
	if ('download' in a) {
		a.download = name || '';
	} else {
		a.target = '_blank';
	}
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function readFile (file, callback) {
	if (!file) {
		callback();
		return;
	}
	var reader = new FileReader();
	reader.onload = function (e) {
		callback(e.target.result);
	};
	reader.onerror = function () {
		callback();
	};
	reader.readAsText(file);
}

function openFile (callback) {
	pickFile(function (blob) {
		if (blob) {
			readFile(blob, callback);
		} else {
			callback();
		}
	});
}

function pickFile (callback) {
	var pick;
	if (window.MozActivity) {
		pick = new MozActivity({
			name: 'pick',
			data: {
				type: [
					'application/javascript',
					'text/javascript',
					'text/css',
					'text/html',
					'text/plain',
					'application/pdf' //this is ridiculous, but it does work
				]
			}
		});

		pick.onsuccess = function () {
			callback(this.result.blob);
		};

		pick.onerror = function () {
			callback();
		};
	} else {
		pick = document.createElement('input');
		pick.type = 'file';
		pick.style.display = 'none';
		document.getElementsByTagName('body')[0].appendChild(pick);
		pick.addEventListener('change', function () {
			callback(pick.files[0]);
			document.getElementsByTagName('body')[0].removeChild(pick);
		}, false);
		pick.click();
	}
}

function openAsUrl (callback) {
	pickFile(function (blob) {
		if (blob) {
			callback(URL.createObjectURL(blob) + '#' + blob.name);
		} else {
			callback();
		}
	});
}

return {
	open: openFile,
	openAsUrl: openAsUrl,
	save: saveFile
};

})();