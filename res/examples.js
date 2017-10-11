/*global Playground*/
Playground.examples =
(function () {
"use strict";

return [{
	title: 'Basic HTML',
	html:
		'<header>\n' +
		'<h1>Main Title</h1>\n' +
		'</header>\n' +
		'\n' +
		'<nav><ul>\n' +
		'<li><a href="#one">One</a></li>\n' +
		'<li><a href="#two">Two</a></li>\n' +
		'<li><a href="#three">Three</a></li>\n' +
		'</ul></nav>\n' +
		'\n' +
		'<article id="one">\n' +
		'<h2>One</h2>\n' +
		'<p><abbr title="abbreviation">abbr</abbr>, <b>b</b>, <cite>cite</cite>, <code>code</code>,\n' +
		'<del>del</del>, <dfn>dfn</dfn>, <em>em</em>, <i>i</i>, <ins>ins</ins>, <kbd>kbd</kbd>,\n' +
		'<mark>mark</mark>, <q>q</q>, <s>s</s>, <samp>samp</samp>, <small>small</small>,\n' +
		'<strong>strong</strong>, sub<sub>sub</sub>, sup<sup>sup</sup>, <u>u</u>, <var>var</var></p>\n' +
		'<p>\n' +
		'<meter value="7" min="0" max="10">7/10</meter><br>\n' +
		'<progress>unknown</progress><br>\n' +
		'<progress value="0.7">70%</progress>\n' +
		'<fieldset>\n' +
		'<legend>Fieldset</legend>\n' +
		'<textarea></textarea><br>\n' +
		'<button>Button</button><br>\n' +
		'<select>\n' +
		'<optgroup label="Group">\n' +
		'<option selected>Option 1</option>\n' +
		'<option>Option 2</option>\n' +
		'</optgroup>\n' +
		'</select>\n' +
		'</fieldset>\n' +
		'<figure>\n' +
		'<img src="icon-128.png" alt="Icon">\n' +
		'<figcaption>Example image</figcaption>\n' +
		'</figure>\n' +
		'</article>\n' +
		'\n' +
		'<article id="two">\n' +
		'<h2>Two</h2>\n' +
		'<table>\n' +
		'<caption>Table Caption</caption>\n' +
		'<thead>\n' +
		'<tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr>\n' +
		'</thead>\n' +
		'<tbody>\n' +
		'<tr><td>(1, 1)</td><td>(1, 2)</td><td>(1, 3)</td></tr><tr>\n' +
		'<tr><td>(2, 1)</td><td>(2, 2)</td><td>(2, 3)</td></tr><tr>\n' +
		'<tr><td>(3, 1)</td><td>(3, 2)</td><td>(3, 3)</td></tr><tr>\n' +
		'</tbody>\n' +
		'<tfoot>\n' +
		'<tr><th>Foot 1</th><th>Foot 2</th><th>Foot 3</th></tr>\n' +
		'</tfoot>\n' +
		'</table>\n' +
		'</article>\n' +
		'\n' +
		'<aside id="three">\n' +
		'<p>Aside</p>\n' +
		'</aside>\n' +
		'\n' +
		'<footer>\n' +
		'<address>John Doe</address>\n' +
		'</footer>'
}, {
	title: 'Input',
	html:
		'<ul>\n' +
		'<li><label>text: <input></label></li>\n' +
		'<li><label>required, pattern: <input required pattern="(..)*"></label></li>\n' +
		'<li><label>search: <input type="search"></label></li>\n' +
		'<li><label>password: <input type="password"></label></li>\n' +
		'<li><label>email: <input type="email"></label></li>\n' +
		'<li><label>url: <input type="url"></label></li>\n' +
		'<li><label>tel: <input type="tel"></label></li>\n' +
		'<li><label>number: <input type="number"></label></li>\n' +
		'<li><label>range: <input type="range"></label></li>\n' +
		'<li><label>date: <input type="date"></label></li>\n' +
		'<li><label>time: <input type="time"></label></li>\n' +
		'<li><label>datetime-local: <input type="datetime-local"></label></li>\n' +
		'<li><label>week: <input type="week"></label></li>\n' +
		'<li><label>month: <input type="month"></label></li>\n' +
		'<li><label>color: <input type="color"></label></li>\n' +
		'<li><label>file: <input type="file"></label></li>\n' +
		'</ul>',
	css:
		'ul {\n' +
		' line-height: 2;\n' +
		'}'
}, {
	title: 'SVG',
	html:
		'<svg width="100px" height="100px">\n' +
		' <circle cx="50" cy="50" r="49" stroke-width="2"\n' +
		'  fill="red" stroke="blue" />\n' +
		'</svg>'
}, {
	title: 'Math',
	html:
		'<math><mfrac><mrow>\n' +
		' <mrow>\n' +
		'  <mo>−</mo><mi>b</mi></mrow>\n' +
		'  <mi>±</mi>\n' +
		'  <msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4ac</mn></mrow></msqrt>\n' +
		' </mrow>\n' +
		' <mn>2a</mn>\n' +
		'</mfrac></math>'
}, {
	title: 'Canvas',
	html: '<canvas id="canvas"></canvas>',
	js:
		'var canvas = document.getElementById(\'canvas\');\n' +
		'var ctx = canvas.getContext(\'2d\');\n' +
		'ctx.rect(10, 10, 100, 100);\n' +
		'ctx.fillStyle = \'blue\';\n' +
		'ctx.strokeStyle = \'red\';\n' +
		'ctx.fill();\n' +
		'ctx.stroke();'
}, {
	title: 'Geolocation',
	html: '<pre id="output"></pre>',
	js:
		'function show (data) {\n' +
		' document.getElementById(\'output\').textContent = data;\n' +
		' console.log(data);\n' +
		'}\n' +
		'\n' +
		'function showPosition (pos) {\n' +
		' show([\n' +
		'  \'Timestamp: \' + new Date(pos.timestamp),\n' +
		'  \'Latitude: \' + pos.coords.latitude,\n' +
		'  \'Longitude: \' + pos.coords.longitude,\n' +
		'  \'Accuracy: \' + pos.coords.accuracy,\n' +
		'  \'Altitude: \' + pos.coords.altitude,\n' +
		'  \'Accuracy: \' + pos.coords.altitudeAccuracy,\n' +
		'  \'Heading: \' + pos.coords.heading,\n' +
		'  \'Speed: \' + pos.coords.speed\n' +
		' ].join(\'\\n\'));\n' +
		'}\n' +
		'\n' +
		'function showError (error) {\n' +
		' show(\'Error: \' + error.message);\n' +
		'}\n' +
		'\n' +
		'navigator.geolocation.getCurrentPosition(showPosition, showError);'
}, {
	title: 'Events',
	html:
		'<div id="pointer">Click &amp; Touch</div>\n' +
		'<textarea id="key">Keyboard</textarea>\n' +
		'<pre id="log"></pre>',
	css:
		'#pointer {\n' +
		' height: 10em;\n' +
		' border: 1px solid black;\n' +
		'}',
	js:
		'function log (msg) {\n' +
		' document.getElementById(\'log\').textContent += msg + \'\\n\';\n' +
		' console.log(msg);\n' +
		'}\n' +
		'\n' +
		'function onMouse (e) {\n' +
		' log(e.type + \'-\' + e.button + \' (\' + e.clientX + \',\' + e.clientY + \')\');\n' +
		'}\n' +
		'\n' +
		'function onTouch (e) {\n' +
		' log(e.type + \'(\' + e.changedTouches.length + \'/\' + e.touches.length + \')\');\n' +
		'}\n' +
		'\n' +
		'function onKey (e) {\n' +
		' log(e.type + \': \' + e.which);\n' +
		'}\n' +
		'\n' +
		'function onOther (e) {\n' +
		' log(e.type);\n' +
		'}\n' +
		'\n' +
		'function bind (el, ev, handler) {\n' +
		' var i;\n' +
		' for (i = 0; i < ev.length; i++) {\n' +
		'  el.addEventListener(ev[i], handler);\n' +
		' }\n' +
		'}\n' +
		'\n' +
		'bind(document.getElementById(\'pointer\'), [\n' +
		' \'mousedown\', \'mousemove\', \'mouseup\',\n' +
		' \'click\', \'dblclick\'\n' +
		'], onMouse);\n' +
		'bind(document.getElementById(\'pointer\'), [\n' +
		' \'touchstart\', \'touchmove\', \'touchend\',\n' +
		' \'touchcancel\'\n' +
		'], onTouch);\n' +
		'bind(document.getElementById(\'key\'), [\n' +
		' \'keydown\', \'keypress\', \'keyup\'\n' +
		'], onKey);\n' +
		'bind(document.getElementById(\'key\'), [\n' +
		' \'blur\', \'focus\'\n' +
		'], onOther);'
}, {
	title: 'Device Events',
	html:
		'<ul>\n' +
		'<li>Alpha: <span id="alpha"></span></li>\n' +
		'<li>Beta: <span id="beta"></span></li>\n' +
		'<li>Gamma: <span id="gamma"></span></li>\n' +
		'<li>a<sub>x</sub>: <span id="ax"></span></li>\n' +
		'<li>a<sub>y</sub>: <span id="ay"></span></li>\n' +
		'<li>a<sub>z</sub>: <span id="az"></span></li>\n' +
		'<li>Proximity: <span id="prox"></span></li>\n' +
		'<li>Light: <span id="light"></span></li>\n' +
		'<li>On-/Offline: <span id="online">(not changed yet)</span></li>\n' +
		'</ul>',
	js:
		'window.addEventListener(\'deviceorientation\', function (e) {\n' +
		' document.getElementById(\'alpha\').textContent = e.alpha;\n' +
		' document.getElementById(\'beta\').textContent = e.beta;\n' +
		' document.getElementById(\'gamma\').textContent = e.gamma;\n' +
		'});\n' +
		'window.addEventListener(\'devicemotion\', function (e) {\n' +
		' var a = e.accelerationIncludingGravity;\n' +
		' document.getElementById(\'ax\').textContent = a.x;\n' +
		' document.getElementById(\'ay\').textContent = a.y;\n' +
		' document.getElementById(\'az\').textContent = a.z;\n' +
		'});\n' +
		'window.addEventListener(\'deviceproximity\', function (e) {\n' +
		' document.getElementById(\'prox\').textContent = e.value;\n' +
		'});\n' +
		'window.addEventListener(\'devicelight\', function (e) {\n' +
		' document.getElementById(\'light\').textContent = e.value;\n' +
		'});' +
		'window.addEventListener(\'online\', function () {\n' +
		' document.getElementById(\'online\').textContent = \'online\';\n' +
		'});' +
		'window.addEventListener(\'offline\', function () {\n' +
		' document.getElementById(\'online\').textContent = \'offline\';\n' +
		'});'
}, {
	title: 'getUserMedia',
	html: '<video id="output"></video>',
	js:
		'function getUserMedia (constraints, success, error) {\n' +
		' if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {\n' +
		'  navigator.mediaDevices.getUserMedia(constraints).then(success, error);\n' +
		' } else if (navigator.getUserMedia) {\n' +
		'  navigator.getUserMedia(constraints, success, error);\n' +
		' } else if (navigator.mozGetUserMedia) {\n' +
		'  navigator.mozGetUserMedia(constraints, success, error);\n' +
		' } else if (navigator.webkitGetUserMedia) {\n' +
		'  navigator.webkitGetUserMedia(constraints, success, error);\n' +
		' } else {\n' +
		'  error();\n' +
		' }\n' +
		'}\n' +
		'\n' +
		'getUserMedia({video: true}, function (stream) {\n' +
		' var video = document.getElementById(\'output\');\n' +
		' if (\'srcObject\' in video) {\n' +
		'  video.srcObject = stream;\n' +
		' } else if (\'mozSrcObject\' in video) {\n' +
		'  video.mozSrcObject = stream;\n' +
		' } else if (window.URL) {\n' +
		'  video.src = URL.createObjectURL(stream);\n' +
		' } else {\n' +
		'  video.src = stream;\n' +
		' }\n' +
		' video.play();\n' +
		'}, function (error) {\n' +
		' alert(error);\n' +
		'});'
}, {
	title: 'Web Audio API',
	js:
		'var audioCtx = new AudioContext();\n' +
		'var oscillatorNode = audioCtx.createOscillator();\n' +
		'var gainNode = audioCtx.createGain();\n' +
		'oscillatorNode.connect(gainNode);\n' +
		'gainNode.connect(audioCtx.destination);\n' +
		'oscillatorNode.type = \'sine\';\n' +
		'oscillatorNode.frequency.value = 2500;\n' +
		'gainNode.gain.value = 0.01;\n' +
		'oscillatorNode.start();\n' +
		'gainNode.gain.exponentialRampToValueAtTime(1.0, audioCtx.currentTime + 1);\n' +
		'gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 3);\n' +
		'oscillatorNode.stop(audioCtx.currentTime + 3);'
}, {
	title: 'Speech Synthesis',
	js:
		'var utterance = new SpeechSynthesisUtterance(\'Hello world\');\n' +
		'speechSynthesis.speak(utterance);'
}, {
	title: 'XHR',
	js:
		'var xhr = new XMLHttpRequest();\n' +
		'xhr.open(\'GET\', \'../manifest.webapp\');\n' +
		'xhr.responseType = \'json\';\n' +
		'xhr.onload = function () {\n' +
		' alert(xhr.response.version);\n' +
		'};\n' +
		'xhr.onerror = function () {\n' +
		' alert(\'Error\');\n' +
		'};\n' +
		'xhr.send();'
}, {
	title: '3D Transforms with Animation',
	html:
		'<div id="container">\n' +
		'<ul id="carousel">\n' +
		'<li id="a">🐧</li>\n' +
		'<li id="b">🐈</li>\n' +
		'<li id="c">🐘</li>\n' +
		'<li id="d">🐕</li>\n' +
		'<li id="e">🐄</li>\n' +
		'<li id="f">🐒</li>\n' +
		'</ul>\n' +
		'</div>',
	css:
		'@keyframes rotate {\n' +
		' from {\n' +
		'  transform: rotateY(0deg);\n' +
		' }\n' +
		' to {\n' +
		'  transform: rotateY(-360deg);\n' +
		' }\n' +
		'}\n' +
		'\n' +
		'#container {\n' +
		' perspective: 1000px;\n' +
		'}\n' +
		'\n' +
		'#carousel {\n' +
		' diplay: block;\n' +
		' width: 200px;\n' +
		' height: 50px;\n' +
		' margin: auto;\n' +
		' animation: rotate 5s linear infinite;\n' +
		' transform-style: preserve-3d;\n' +
		'}\n' +
		'\n' +
		'#carousel li {\n' +
		' display: inline-block;\n' +
		' height: 50px;\n' +
		' line-height: 50px;\n' +
		' font-size: 30px;\n' +
		' position: absolute;\n' +
		' left: 50%;\n' +
		'}\n' +
		'\n' +
		'#a {\n' +
		' transform: translateZ(50px);\n' +
		'}\n' +
		'#b {\n' +
		' transform: rotateY(60deg) translateZ(50px);\n' +
		'}\n' +
		'#c {\n' +
		' transform: rotateY(120deg) translateZ(50px);\n' +
		'}\n' +
		'#d {\n' +
		' transform: rotateY(180deg) translateZ(50px);\n' +
		'}\n' +
		'#e {\n' +
		' transform: rotateY(240deg) translateZ(50px);\n' +
		'}\n' +
		'#f {\n' +
		' transform: rotateY(300deg) translateZ(50px);\n' +
		'}'
}, {
	title: 'Flexbox',
	html:
		'<ul>\n' +
		'<li id="a">A</li>\n' +
		'<li id="b">B</li>\n' +
		'<li id="c">C</li>\n' +
		'<li id="d">D</li>\n' +
		'</ul>',
	css:
		'ul {\n' +
		' display: flex;\n' +
		' margin: 2px;\n' +
		' border: 1px solid red;\n' +
		' padding: 2px;\n' +
		'}\n' +
		'\n' +
		'li {\n' +
		' font-size: 20px;\n' +
		' display: inline-block;\n' +
		' margin: 2px;\n' +
		' border: 1px solid green;\n' +
		' padding: 2px;\n' +
		'}\n' +
		'\n' +
		'#a, #c {\n' +
		' flex-grow: 1;\n' +
		'}\n' +
		'#d {\n' +
		' flex-grow: 2;\n' +
		'}'
/*}, {
	title: 'CSS Grid'
	//TODO
}, {
	title: 'Writing Modes'
	//TODO*/
}, {
	title: 'jQuery',
	libs: ['https://code.jquery.com/jquery-git.min.js'],
	html: '<div id="someId"></div>',
	js: '$(\'#someId\').html($.fn.jquery);'
}];
/*{
	title: 'A-Frame',
	libs: [
		'https://aframe.io/releases/0.5.0/aframe.min.js'
	],
	html:
		'<a-scene>\n' +
		' <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>\n' +
		' <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>\n' +
		' <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>\n' +
		' <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>\n' +
		' <a-sky color="#ECECEC"></a-sky>\n' +
		'</a-scene>'
}*/
})();