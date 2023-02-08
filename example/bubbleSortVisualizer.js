let lastLeft = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function moveBox(left, right, moveLeft) {
  let position = 0;
  box = document.getElementById('box-' + left);

  if (moveLeft) {
    position = lastLeft - 10;
  } else {
    const rightBox = document.getElementById('box-' + right);
    position = rightBox.getBoundingClientRect().left - 10;
    lastLeft = box.getBoundingClientRect().left;
  }
  box.style.left = position + 'px';
}

async function sort() {
  const values = document.getElementById('input').value;
  const arr = values.split(',');
  console.log('initial array:', arr);

  for (let i = 0; i < arr.length; i++) {
    console.log('****************************');
    console.log('i=' + i);
    console.log('current state of the array: ', arr);
    const div = document.createElement('div');
    div.classList.add('iteration');
    div.innerHTML = i + ' iteration results: ' + arr;
    const iterations = document.getElementById('iterations');
    iterations.appendChild(div);
    for (j = 0; j < arr.length - 1 - i; j++) {
      console.log('loop: ' + j);
      const box = document.getElementById('box-' + arr[j]);
      box.classList.add('active');
      const box2 = document.getElementById('box-' + arr[j + 1]);

      console.log(`is ${arr[j]} > ${arr[j + 1]}`);
      if (arr[j] > arr[j + 1]) {
        console.log('yes');
        box2.classList.add('lessThan');
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        console.log('swapping ' + arr[j] + ' with ' + arr[j + 1]);

        await sleep(500);
        moveBox(arr[j + 1], arr[j], false);
        await sleep(500);
        moveBox(arr[j], arr[j + 1], true);
        await sleep(500);
      } else {
        console.log('no');
        box2.classList.add('greaterThan');
      }
      box.classList.remove('active');
      box2.classList.remove('lessThan');
      box2.classList.remove('greaterThan');
      await sleep(300);
      if (j === arr.length - 2 - i) {
        const fixedBox = document.getElementById(
          'box-' + arr[arr.length - 1 - i]
        );
        fixedBox.classList.add('locked');
      }
    }
  }
  const firstBox = document.getElementById('box-' + arr[0]);
  firstBox.classList.add('locked');

  document.getElementById('result').innerHTML = 'Your Array has been sorted';
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
