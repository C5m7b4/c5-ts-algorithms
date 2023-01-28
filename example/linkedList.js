import { LinkedList } from '../src';

const list = new LinkedList();

function draw() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 580;
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '14px sans-serif';
  context.strokeStyle = '#100';

  if (list.length === 0) {
    context.fillText('head: null', 10, 15);
    context.fillText('tail: null', 10, 30);
  } else {
    let x = 20;
    let y = 60;
    //drawArc(context, x, y);
    const interval = 90;
    const rectWidth = 40;
    const rectHeight = 20;
    context.fillText('head', 10, 15);
    drawArrowLine(context, 20, 25, x + 10, y);

    for (let i = 0; i < list.length; i++) {
      const value = list.get(i);
      context.fillText(value, x + 15, y + 15);
      context.rect(x, y, rectWidth, rectHeight);
      context.rect(x, y, rectWidth + 20, rectHeight);
      if (i < list.length - 1) {
        drawArrowLine(
          context,
          x + rectWidth + 10,
          y + rectHeight / 2,
          x + interval,
          y + rectHeight / 2
        );
      }
      x += interval;
    }
    console.log(x - interval + 30);
    context.fillText('tail', x - interval + 30, 15);
    drawArrowLine(context, x - interval + 30, 25, x - interval + 10, y);
  }
  context.stroke();
}

function drawArc(context, x, y, radius = 20) {
  context.beginPath();
  context.strokeStyle = 'red';
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.stroke();
}

function drawArrowLine(context, x1, y1, x2, y2) {
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);

  const slope = (y1 - y2) / (x1 - x2);
  const arctan = Math.atan(slope);

  let set45 = 1.57 / 2;
  if (x1 < x2) {
    set45 = -1.57 * 1.5;
  }

  const arrowLength = 15;

  context.moveTo(x2, y2);
  context.lineTo(
    x2 + Math.cos(arctan + set45) * arrowLength,
    y2 + Math.sin(arctan + set45) * arrowLength
  );

  context.moveTo(x2, y2);
  context.lineTo(
    x2 + Math.cos(arctan - set45) * arrowLength,
    y2 + Math.sin(arctan - set45) * arrowLength
  );
}

function push() {
  const inputField = document.getElementById('value');
  list.push(inputField.value);
  inputField.value = '';
  draw();
  inputField.focus();
}

function pop() {
  list.pop();
  draw();
}

function find() {
  const inputField = document.getElementById('index');
  const result = list.find(inputField.value);
  inputField.value = '';
  document.getElementById('results').innerHTML = JSON.stringify(result);
  inputField.focus();
  draw();
}

function get() {
  const inputField = document.getElementById('index');
  const result = list.get(inputField.value);
  inputField.value = '';
  document.getElementById('results').innerHTML = result;
  inputField.focus();
  draw();
}

function del() {
  const inputField = document.getElementById('index');
  const result = list.delete(inputField.value);
  inputField.value = '';
  document.getElementById('results').innerHTML = result;
  inputField.focus();
  draw();
}

function keyup(e) {
  if (e.keyCode == 13) {
    push();
  }
}

draw();

document.getElementById('push').addEventListener('click', push);
document.getElementById('pop').addEventListener('click', pop);
document.getElementById('find').addEventListener('click', find);
document.getElementById('get').addEventListener('click', get);
document.getElementById('delete').addEventListener('click', del);
document.getElementById('value').addEventListener('keyup', keyup);
