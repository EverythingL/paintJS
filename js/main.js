const $ = (selector) => document.querySelector(selector);
const canvas = $('#jsCanvas');
const ctx = canvas.getContext('2d');

const jsColor = $('.jsColor');
const jsRange = $('#jsRange');
const jsMode = $('#jsMode');
const jsSave = $('#jsSave');
const jsClean = $('#jsClean');

const INITIAL_COLOR = '#000';

canvas.height = 600;
canvas.width = 600;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 600, 600);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;


function onMouseMove(event) {
	let x = event.offsetX;
	let y = event.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseDown() {
	painting = true;
}
function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, 600, 600);
	}
}
function handleModeCkick() {
	if (filling === true) {
		filling = false;
		jsMode.innerText = 'Paint area';
	} else {
		filling = true;
		jsMode.innerText = 'Fill area';
	}
}
function handleContextMenuClick(event) {
	event.preventDefault();
}

function hadleSaveClick() {
	const img = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = img;
	link.download = "Paint";
	link.click();
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove);
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup', stopPainting);
	canvas.addEventListener('mouseleave', stopPainting);
	canvas.addEventListener('click', handleCanvasClick);
	canvas.addEventListener('contextmenu', handleContextMenuClick);
}

if (jsRange) {
	jsRange.addEventListener('input', () => {
		ctx.lineWidth = jsRange.value;
	})
}
if (jsColor) {
	jsColor.addEventListener('input', () => {
		ctx.strokeStyle = jsColor.value;
		ctx.fillStyle = jsColor.value;
	})
}


if (jsClean) {
	jsClean.addEventListener('click', () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	})
}

if (jsSave) {
	jsSave.addEventListener('click', hadleSaveClick);
}

jsMode.addEventListener('click', handleModeCkick);