import { AVLTree } from '../src';
const verticalGap = 40;
const radius = 20;

let tree = new AVLTree();
console.log('tree', tree);
console.log(tree.isEmpty());

function draw() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  canvas.width = window.innerWidth - 20;
  canvas.height = 210;
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '14px sans-serif';
  context.strokeStyle = '#100';

  if (tree.isEmpty()) {
    context.fillText('tree is empty', canvas.width / 2 - 50, 15);
  } else {
    const x = canvas.width / 2;
    const y = 30;

    drawTree(context, x, y, radius, tree.root, canvas.width / 4);
  }

  context.stroke();
}

function drawTree(context, x, y, radius, root, horizontalGap) {
  console.log('tree', tree);
  if ((root.key + '').length == 1) {
    context.fillText(root.key, x - 5, y + 5);
  } else if ((root.value + '').length == 2) {
    context.fillText(root.key, x - 8, y + 5);
  } else if ((root.key + '').length == 3) {
    context.fillText(root.key, x - 12, y + 5);
  } else {
    context.fillText(root.key, x - 8, y + 5);
  }
  console.log('key', root.key);

  context.arc(x, y, radius, 0, Math.PI * 2, false);

  if (typeof root.left !== 'undefined' && root.left != null) {
    connectTwoCircles(context, x, y, x - horizontalGap, y + verticalGap);
    context.moveTo(x - horizontalGap + radius, y + verticalGap);
    drawTree(
      context,
      x - horizontalGap,
      y + verticalGap,
      radius,
      root.left,
      horizontalGap / 2
    );
  }
  if (typeof root.right !== 'undefined' && root.right != null) {
    connectTwoCircles(context, x, y, x + horizontalGap, y + verticalGap);
    context.moveTo(x + horizontalGap + radius, y + verticalGap);
    drawTree(
      context,
      x + horizontalGap,
      y + verticalGap,
      radius,
      root.right,
      horizontalGap / 2
    );
  }
}

function connectTwoCircles(context, x1, y1, x2, y2) {
  const d = Math.sqrt(verticalGap * verticalGap + (x2 - x1) * (x2 - x1));
  const x11 = x1 - (radius * (x1 - x2)) / d;
  const y11 = y1 - (radius * (y1 - y2)) / d;
  const x21 = x2 + (radius * (x1 - x2)) / d;
  const y21 = y2 + (radius * (y1 - y2)) / d;
  context.moveTo(x11, y11);
  context.lineTo(x21, y21);
}

function search() {
  const inputField = document.getElementById('value');
  const result = tree.get(parseInt(inputField.value));
  document.getElementById('results').innerHTML = result;
  inputField.value = '';
  inputField.focus();
}

function insert() {
  const inputField = document.getElementById('value');
  tree.insert(parseInt(inputField.value), parseInt(inputField.value));
  inputField.value = '';
  draw();
  inputField.focus();
}

function remove() {
  const inputField = document.getElementById('value');
  tree.remove(parseInt(inputField.value));
  document.getElementById('results').innerHTML = '';
  inputField.value = '';
  inputField.focus();
  draw();
}

function clear() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  tree = new AVLTree();
}

function findMax() {
  const result = tree.findMaximum();
  document.getElementById('results').innerHTML = result;
}

function findMin() {
  const result = tree.findMinimum();
  document.getElementById('results').innerHTML = result;
}

function contains() {
  const inputField = document.getElementById('value');
  const result = tree.contains(parseInt(inputField.value));
  document.getElementById('results').innerHTML = result;
  inputField.value = '';
  inputField.focus();
  draw();
}

function preOrder() {
  const result = tree.preOrderTraversal(tree.root);
  document.getElementById('results').innerHTML = result;
}

function inOrder() {
  const result = tree.inOrderTraversal(tree.root);
  document.getElementById('results').innerHTML = result;
}

function postOrder() {
  const result = tree.postOrderTraversal(tree.root);
  document.getElementById('results').innerHTML = result;
}

function macro1() {
  clear();
  tree.insert(50);
  tree.insert(70);
  tree.insert(30);
  tree.insert(75);
  tree.insert(35);
  tree.insert(60);
  tree.insert(20);
  tree.insert(80);
  tree.insert(15);
  draw();
}

function macro2() {
  clear();
  tree.insert(50);
  tree.insert(70);
  tree.insert(30);
  tree.insert(75);
  tree.insert(35);
  tree.insert(60);
  tree.insert(20);
  tree.insert(80);
  tree.insert(15);
  tree.remove(75);
  draw();
}

function macro3() {
  tree.insert(50);
  tree.insert(70);
  tree.insert(30);
  tree.insert(75);
  tree.insert(35);
  tree.insert(25);
  tree.remove(35);
  tree.remove(25);
  tree.remove(30);
  draw();
}

function macro4() {
  console.log('fill in this macro');
}

function macro5() {
  console.log('fill in this macro');
}

draw();

function keyup(e) {
  if (e.keyCode == 13) {
    insert();
  }
}

function canvasClick(e) {
  console.log('canvas click', e);
}

document.getElementById('canvas').addEventListener('click', canvasClick);
document.getElementById('insert').addEventListener('click', insert);
document.getElementById('search').addEventListener('click', search);
document.getElementById('remove').addEventListener('click', remove);
document.getElementById('maxvalue').addEventListener('click', findMax);
document.getElementById('minvalue').addEventListener('click', findMin);
document.getElementById('contains').addEventListener('click', contains);
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('preorder').addEventListener('click', preOrder);
document.getElementById('inorder').addEventListener('click', inOrder);
document.getElementById('postorder').addEventListener('click', postOrder);

document.getElementById('macro1').addEventListener('click', macro1);
document.getElementById('macro2').addEventListener('click', macro2);
document.getElementById('macro3').addEventListener('click', macro3);
document.getElementById('macro4').addEventListener('click', macro4);
document.getElementById('macro5').addEventListener('click', macro5);

document.getElementById('value').addEventListener('keyup', keyup);
