import { DoublyLinkedList } from '../src';

let list = new DoublyLinkedList();

function draw() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const rectWidth = 30;
  const rectHeight = 20;
  const verticalTextOffset = 15;
  const horizontalTextOffset = 8;
  let spaceBetween = 100;

  let x = 20;
  let y = 50;

  canvas.width = window.innerWidth;
  canvas.height = 250;

  context.font = '14px sans-serif';

  if (list.length === 0) {
    context.fillText('head: null', 30, 15);
    context.fillText('tail: null', 30, 30);
  } else {
    context.fillText('head', 10, 15);
    drawLine(context, 20, 20, x + 10, y, false);

    for (let i = 0; i < list.length; i++) {
      if (i === 0) {
        context.fillText(
          list.get(i),
          x + 5 + horizontalTextOffset,
          y + verticalTextOffset
        );
        context.beginPath();
        context.strokeStyle = 'black';
        context.rect(x, y, rectWidth, rectHeight);
        context.stroke();
        context.beginPath();
        context.strokeStyle = 'red';
        context.rect(x + rectWidth, y, rectWidth / 2, rectHeight);
        context.stroke();
      } else if (i === list.length - 1) {
        context.fillText(
          list.get(i),
          x + rectWidth / 2 + horizontalTextOffset,
          y + verticalTextOffset
        );
        context.beginPath();
        context.strokeStyle = 'green';
        context.rect(x, y, rectWidth / 2, rectHeight);
        context.stroke();
        context.beginPath();
        context.strokeStyle = 'black';
        context.rect(x + rectWidth / 2, y, rectWidth, rectHeight);
        context.stroke();
      } else {
        context.fillText(
          list.get(i),
          x + rectWidth / 2 + horizontalTextOffset,
          y + verticalTextOffset
        );
        context.beginPath();
        context.strokeStyle = 'green';
        context.rect(x, y, rectWidth / 2, rectHeight);
        context.stroke();
        context.beginPath();
        context.strokeStyle = 'black';
        context.rect(x + rectWidth / 2, y, rectWidth, rectHeight);
        context.stroke();
        context.beginPath();
        context.strokeStyle = 'red';
        context.rect(
          x + rectWidth + rectWidth / 2,
          y,
          rectWidth / 2,
          rectHeight
        );
        context.stroke();
      }

      if (i < list.length - 1) {
        if (i === 0) {
          x = x - 10;
          //spaceBetween = spaceBetween + 10;
        } else {
          x = x + 5;
        }
        drawLine(
          context,
          x + rectWidth + 15,
          y + rectHeight / 2,
          x + spaceBetween + 10,
          y + rectHeight / 2,
          true
        );
      }

      x += spaceBetween;
    }
    context.fillText('tail', x - spaceBetween + 30, 15);
    drawLine(
      context,
      x - spaceBetween + 30,
      20,
      x - spaceBetween + 25,
      y,
      false
    );
  }
}

function drawLine(context, x1, y1, x2, y2, twoWay) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  drawArrow(context, x1, y1, x2, y2);
  if (twoWay) {
    drawReverseArrow(context, x1, y1, x2, y2);
  }
}

function drawArrow(context, x1, y1, x2, y2) {
  const slope = (y1 - y2) / (x1 - x2);
  const arctan = Math.atan(slope);
  let set45 = 1.57 / 2;
  if (x1 < x2) {
    set45 = -1.57 * 1.5;
  }
  const arrowLength = 15;
  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(x2, y2);
  context.lineTo(
    x2 + Math.cos(arctan + set45) * arrowLength,
    y2 + Math.sin(arctan + set45) * arrowLength
  );
  context.stroke();

  context.beginPath();
  context.moveTo(x2, y2);
  context.lineTo(
    x2 + Math.cos(arctan - set45) * arrowLength,
    y2 + Math.sin(arctan - set45) * arrowLength
  );
  context.stroke();
}

function drawReverseArrow(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  const slope = (y1 - y2) / (x1 - x2);
  const arctan = Math.atan(slope);

  let set45 = 0.75;
  const arrowLength = 15;

  context.moveTo(x1, y1);
  context.lineTo(
    x1 + Math.cos(arctan + set45) * arrowLength,
    y2 + Math.sin(arctan + set45) * arrowLength
  );
  context.stroke();

  context.beginPath();
  context.moveTo(x1, y1);
  set45 = -0.75;
  context.lineTo(
    x1 + Math.cos(arctan + set45) * arrowLength,
    y2 + Math.sin(arctan + set45) * arrowLength
  );
  context.stroke();
}

function prepend() {
  const inputField = document.getElementById('value');
  list.prepend(inputField.value);
  draw();
  inputField.value = '';
  inputField.focus();
}

function insertat() {
  const resultsField = document.getElementById('results');
  const indexField = document.getElementById('index');
  const valueField = document.getElementById('value');
  if (valueField.value.length === 0) {
    resultsField.innerHTML = 'Please specify a value';
    return;
  }

  if (indexField.value.length === 0) {
    resultsField.innerHTML = 'Please specify an index';
    return;
  }
  list.insertAt(parseInt(valueField.value), parseInt(indexField.value));
  resultsField.innerHTML = '';
  console.log('list', list);
  draw();
  clearFields();
}

function append() {
  const inputField = document.getElementById('value');
  list.append(parseInt(inputField.value));
  draw();
  clearFields();
}

function remove() {
  const resultField = document.getElementById('results');
  const inputField = document.getElementById('value');
  if (inputField.value.length === 0) {
    resultField.innerHTML = 'Please specify a value';
    return;
  }
  list.remove(parseInt(inputField.value));
  draw();
  clearFields();
}

function get() {
  const resultField = document.getElementById('results');
  const indexField = document.getElementById('index');
  if (indexField.value.length === 0) {
    resultField.innerHTML = 'Please specify an index';
    indexField.focus();
    return;
  }
  const result = list.get(parseInt(indexField.value));
  resultField.innerHTML = result;
  clearFields();
}

function removeAt() {
  const resultField = document.getElementById('results');
  const indexField = document.getElementById('index');
  if (indexField.value.length === 0) {
    resultField.innerHTML = 'Please specify an index';
    indexField.focus();
    return;
  }
  list.removeAt(parseInt(indexField.value));
  draw();
  clearFields();
}

function getAt() {
  const resultField = document.getElementById('results');
  const indexField = document.getElementById('index');
  if (indexField.value.length === 0) {
    resultField.innerHTML = 'Please specify an index';
    indexField.focus();
    return;
  }
  const result = list.get(parseInt(indexField.value));
  resultField.innerHTML = result;
  clearFields();
}

function clear() {
  list = new DoublyLinkedList();
  draw();
  clearFields();
}

function clearFields() {
  document.getElementById('value').value = '';
  document.getElementById('index').value = '';
}

list.prepend(5);
list.append(10);
list.append(15);
list.append(20);

draw();

document.getElementById('prepend').addEventListener('click', prepend);
document.getElementById('insertat').addEventListener('click', insertat);
document.getElementById('append').addEventListener('click', append);
document.getElementById('remove').addEventListener('click', remove);
document.getElementById('get').addEventListener('click', get);
document.getElementById('removeat').addEventListener('click', removeAt);
document.getElementById('getat').addEventListener('click', getAt);
document.getElementById('clear').addEventListener('click', clear);
