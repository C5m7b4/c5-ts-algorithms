const sideMargin = 20;
const topMargin = 20;
timeoutValue = 600;
let storedArray = [];

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function showBoxes() {
  const container = document.getElementById('container');
  removeAllChildNodes(container);

  const arrayContainer = document.createElement('array-container');
  arrayContainer.id = 'arrayContainer';
  arrayContainer.classList.add('array-container');

  const arr = getArrayValues();

  for (i of arr) {
    const value = document.createElement('p');
    value.innerText = i;
    const element = document.createElement('div');
    element.classList.add('array-element');
    element.appendChild(value);
    arrayContainer.append(element);
  }

  container.append(arrayContainer);
  const left = `${
    container.getBoundingClientRect().width / 2 -
    arrayContainer.getBoundingClientRect().width / 2
  }px`;
  console.log('left', left);
  arrayContainer.style.left = left;
  arrayContainer.style.top = '0px';
  arrayContainer.style.height = '45px';
}

function getArrayValues() {
  const values = document.getElementById('values');
  const arr = values.value.split(',');
  return arr;
}

function getArrayNodes() {
  const arrayContainer = document.getElementById('arrayContainer');
  return arrayContainer;
}

function createSubArray(arr, from, to) {
  const subContainer = document.createElement('div');
  subContainer.classList.add('array-container');
  for (let i = from; i < to; i++) {
    const value = document.createElement('p');
    value.innerHTML = arr.childNodes[i].innerHTML;
    const element = document.createElement('div');
    element.classList.add('array-element');
    element.appendChild(value);
    subContainer.appendChild(element);
    subContainer.style.height = '45px';
  }
  return subContainer;
}
function animateSplit(half, dir) {
  console.log('animating split');
  return new Promise((resolve) => {
    half.animate(
      {
        transform: [
          `translate(${dir}10px, ${
            -parseInt(half.style.height.replace('px', '')) - topMargin
          }px)`,
          'translate(0, 0)',
        ],
      },
      timeoutValue
    );
    setTimeout(() => {
      resolve();
    }, timeoutValue);
  });
}

function getPosition(el) {
  const left = el.style.left.replace('px', '');
  const top = el.style.top.replace('px', '');
  const height = el.style.height.replace('px', '');
  return {
    left: parseInt(left),
    top: parseInt(top),
    height: parseInt(height),
  };
}

function getCalculatedPosition(el) {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0,
    };
  }

  const rect = el.getBoundingClientRect();
  const win = el.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
}

function animateMerge(element, target) {
  console.log('animating merge');
  const calculatedTarget = getCalculatedPosition(target);
  const calculatedElement = getCalculatedPosition(element);
  return new Promise((resolve) => {
    element.animate(
      {
        transform: [
          'translate(0, 0)',
          `translate(${calculatedTarget.left - calculatedElement.left}px,
          ${calculatedTarget.top - calculatedElement.top}px)`,
        ],
      },
      timeoutValue
    );
    setTimeout(() => {
      target.innerHTML = element.innerHTML;
      element.style.opacity = 0;
      target.style.backgroundColor = '#21db37';
      resolve();
    }, timeoutValue);
  });
}

async function merge(left, right, target) {
  console.log('merging');
  let i1 = 0,
    i2 = 0,
    i3 = 0;
  console.log(
    'i1',
    i1,
    'left.childNodes',
    left.childNodes.length,
    'i2',
    i2,
    'right.childNodes',
    right.childNodes.length
  );
  while (i1 < left.childNodes.length && i2 < right.childNodes.length) {
    console.log('first while loop');
    let value1 = parseInt(left.childNodes[i1].textContent);
    let value2 = parseInt(right.childNodes[i2].textContent);
    console.log('comparing value1: ', value1, ' to  value2: ', value2);
    if (value1 < value2) {
      await animateMerge(left.childNodes[i1++], target.childNodes[i3++]);
    } else {
      await animateMerge(right.childNodes[i2++], target.childNodes[i3++]);
    }
  }
  while (i1 < left.childNodes.length) {
    console.log('second while loop');
    await animateMerge(left.childNodes[i1++], target.childNodes[i3++]);
  }
  while (i2 < right.childNodes.length) {
    console.log('third while loop');
    await animateMerge(right.childNodes[i2++], target.childNodes[i3++]);
  }
}

async function sort(arr) {
  console.log('sorting');
  if (arr.childNodes.length <= 1) {
    return;
  }

  const mid = Math.floor(arr.childNodes.length / 2);
  const left = createSubArray(arr, 0, mid);
  const right = createSubArray(arr, mid, arr.childNodes.length);

  container.append(left);

  const position = getPosition(arr);
  left.style.left = `${position.left - sideMargin}px`;
  left.style.top = `${position.top + position.height + topMargin}px`;

  await animateSplit(left, '+');

  container.append(right);

  const rightOffset = right.childNodes.length * 40;
  right.style.top = `${position.top + position.height + topMargin}px`;
  right.style.left = `${position.left + rightOffset + sideMargin * 2}px`;

  await animateSplit(right, '-');

  await sort(left);
  await sort(right);

  await merge(left, right, arr);
}

showBoxes();

function extractArray() {
  let numbers = '';
  if (storedArray.childNodes.length > 0) {
    for (let i = 0; i < storedArray.childNodes.length; i++) {
      const el = storedArray.childNodes[i];
      numbers += el.textContent + ',';
    }
  }
  return numbers.substring(0, numbers.length - 1);
}

document.getElementById('btnSort').addEventListener('click', () => {
  const arr = getArrayNodes();
  console.log('arr', arr);
  storedArray = arr;
  sort(arr);
});

document.getElementById('submit').addEventListener('click', showBoxes);
document.getElementById('btnUnsort').addEventListener('click', () => {
  // const numbers = extractArray();
  // document.getElementById('values').valueu = numbers;
  showBoxes();
});
