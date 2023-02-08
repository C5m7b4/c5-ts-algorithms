let lastRight = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function moveBox(left, right, moveRight) {
  let position = 0;
  box = document.getElementById('box-' + left);

  if (moveRight) {
    position = lastRight;
    box.classList.add('locked');
  } else {
    const rightBox = document.getElementById('box-' + right);
    position = rightBox.getBoundingClientRect().left - 10;
    lastRight = box.getBoundingClientRect().left;
  }
  box.style.left = position + 'px';
}

function setIteration(arr) {
  const div = document.createElement('div');
  div.innerHTML = arr;
  const iterations = document.getElementById('iterations');
  iterations.appendChild(div);
}

async function qs(arr, lo, hi) {
  if (lo >= hi) {
    return;
  }

  const pivotIdx = await partition(arr, lo, hi);
  setIteration(arr);

  await qs(arr, lo, pivotIdx - 1);
  await qs(arr, pivotIdx + 1, hi);
}

async function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let idx = lo - 1;
  console.log('lo:', lo, 'hi:', hi, 'pivot:', pivot, 'idx:', idx);

  for (let i = lo; i < hi; i++) {
    const box = document.getElementById('box-' + arr[i]);
    box.classList.add('active');
    const box2 = document.getElementById('box-' + pivot);
    if (arr[i] <= pivot) {
      box2.classList.add('greaterThan');
      console.log(`is ${arr[i]} <= ${pivot}`, 'yes', 'i', i);
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
      moveBox(arr[i], arr[idx], false);
      await sleep(1000);
      moveBox(arr[idx], tmp, true);
      await sleep(1000);
    } else {
      console.log(`is ${arr[i]} <= ${pivot}`, 'no');
      box2.classList.add('lessThan');
    }
    box.classList.remove('active');
    box2.classList.remove('lessThan');
    box2.classList.remove('greaterThan');
    await sleep(500);
  }

  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot;
  moveBox(arr[hi], arr[idx], false);
  await sleep(1000);
  moveBox(arr[idx], pivot, true);
  await sleep(1000);

  return idx;
}

async function Quicksort(arr) {
  await qs(arr, 0, arr.length - 1);
  document.getElementById('result').innerHTML = 'Your array is sorted';
  const box = document.getElementById('box-' + arr[arr.length - 1]);
  box.classList.add('locked');
}

function sort() {
  const values = document.getElementById('input').value;
  const arr = values.split(',');
  console.log('initial array:', arr);
  Quicksort(arr);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function removeBoxes() {
  const parentContainer = document.getElementById('space');
  removeAllChildNodes(parentContainer);
}

async function run() {
  console.log('running visualizer');
  document.getElementById('result').innerHTML = '';
  removeBoxes();
  const iterations = document.getElementById('iterations');
  removeAllChildNodes(iterations);
  const values = document.getElementById('input').value;
  const arr = values.split(',');

  const space = document.getElementById('space');
  const spacePosition = space.getBoundingClientRect();
  console.log('spacePosition', spacePosition);

  let left = spacePosition.left + 50;

  arr.forEach(async (v) => {
    const div = document.createElement('span');
    div.classList.add('box');
    div.classList.add('fadein');
    div.style.left = left + 'px';
    div.style.top = spacePosition.top + 30 + 'px';
    div.style.height = spacePosition.height - 55 + 'px';
    div.id = 'box-' + v;
    div.innerHTML = v;
    space.appendChild(div);
    left += 50;
  });

  sort();
}

document.getElementById('run').addEventListener('click', run);
