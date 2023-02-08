const container = document.querySelector('.container');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeAllBoxes() {
  while (container.firstChild) {
    container.removeChild(parent.firstChild);
  }
}

async function generateBars() {
  removeAllBoxes();
  const input = document.getElementById('input');
  const arr = input.value.split(',');

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 3}px`;
    bar.style.transform = `translateX(${i * 30}px)`;

    const barLabel = document.createElement('label');
    barLabel.classList.add('bar__id');
    barLabel.innerHTML = value;
    bar.appendChild(barLabel);
    container.appendChild(bar);
  }
  disable();
  await InsertionSort();
  enable();
}

async function InsertionSort(delay = 600) {
  let bars = document.querySelectorAll('.bar');
  bars[0].classList.add('locked');
  const output = document.getElementById('output');

  for (let i = 1; i < bars.length; i += 1) {
    var j = i - 1;

    const key = parseInt(bars[i].childNodes[0].innerHTML);
    const height = bars[i].style.height;

    output.innerHTML = `<h3>Element Selected is: ${key}</h3>`;

    bars[i].classList.add('active');

    await sleep(delay);

    while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
      bars[j].classList.add('active');
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].childNodes[0].innerText = bars[j].childNodes[0].innerText;

      j = j - 1;

      await sleep(delay);

      // give sorted part a lighter color
      for (let k = i; k >= 0; k--) {
        bars[k].classList.remove('active');
        bars[k].classList.add('locked');
      }
    }

    // put the bar in the right place
    bars[j + 1].style.height = height;
    bars[j + 1].childNodes[0].innerHTML = key;

    await sleep(delay);

    bars[i].style.backgroundColor = ' rgb(49, 226, 13)';
  }

  output.innerHTML = '<h3>Sorted!!</h3>';

  document.getElementById('btn').disabled = false;
}

function disable() {
  document.getElementById('btn').disabled = true;
}

function enable() {
  document.getElementById('btn').disabled = false;
}

function changeHue() {
  const rgb = document.getElementById('rgb').value;
  const hue = document.getElementById('hue').value;
  const div = document.getElementById('color');
  div.style.backgroundColor = rgb;
  if (hue.length > 0) {
    console.log('changing the hue');
    div.style.filter = `hue-rotate(${hue}deg)`;
  }
}

document.getElementById('btn').addEventListener('click', generateBars);
document.getElementById('btnHue').addEventListener('click', changeHue);
