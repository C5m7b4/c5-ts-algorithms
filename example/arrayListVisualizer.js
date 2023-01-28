import { ArrayList } from '../src';

const list = new ArrayList();

function draw() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  canvas.width = window.innerWidth - 20;
  canvas.height - 100;
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '14px sans-serif';
  context.strokeStyle = '#100';

  if (list.length === 0) {
    context.fillText('list is empty', canvas.width / 2, 15);
  } else {
    context.fillText(
      `array is not empty, size=${list.length}`,
      canvas.width / 2,
      15
    );
  }

  let x = 20;
  let y = 60;
  const rectWidth = 40;
  const rectHeight = 20;

  let i;
  for (i = 0; i < list.length; i++) {
    console.log(list.get(i));
    const value = list.get(i);
    context.fillText(value, x + 15, y + 15);
    context.rect(x, y, rectWidth, rectHeight);
    x += rectWidth;
  }

  context.stroke();
}

draw();

function insert() {
  const inputField = document.getElementById('value');
  list.push(inputField.value);
  inputField.value = '';
  inputField.focus();
  draw();
}

function pop() {
  const result = list.pop();
  document.getElementById('results').innerHTML = result;
  draw();
}

function del() {
  const inputField = document.getElementById('index');
  if (inputField.value.length === 0) {
    document.getElementById('results').innerHTML = 'Please select an index';
    return;
  }
  const index = list.get(inputField.value);
  document.getElementById('results').innerHTML =
    'Are you sure you want to delete ' + index + '?';

  document.getElementById('confirm-delete').style.display = 'block';

  inputField.focus();
  draw();
}

function confirmDelete() {
  const inputField = document.getElementById('index');
  list.delete(parseInt(inputField.value));
  inputField.value = '';
  draw();
  document.getElementById('confirm-delete').style.display = 'none';
  document.getElementById('results').innerHTML = '';
}

function getValue() {
  const inputField = document.getElementById('index');
  if (inputField.value.length === 0) {
    document.getElementById('results').innerHTML = 'Please select an index';
    return;
  }
  const index = list.get(inputField.value);
  document.getElementById('results').innerHTML = index;
}

function getSize() {
  const size = list.size();
  document.getElementById('results').innerHTML = size;
}

function keyup(e) {
  if (e.keyCode === 13) {
    insert();
  }
}

document.getElementById('push').addEventListener('click', insert);
document.getElementById('pop').addEventListener('click', pop);
document.getElementById('value').addEventListener('keyup', keyup);
document.getElementById('delete').addEventListener('click', del);
document
  .getElementById('confirm-delete')
  .addEventListener('click', confirmDelete);
document.getElementById('get').addEventListener('click', getValue);
document.getElementById('size').addEventListener('click', getSize);
