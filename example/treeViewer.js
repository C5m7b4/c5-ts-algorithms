import { BinarySearchTree } from '../src';

const radius = 20;
const verticalGap = 40;

function comparator(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

const tree = new BinarySearchTree(comparator);

function draw() {
  console.log('tree', tree);
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  canvas.width = window.innerWidth - 20;
  canvas.height = 230;
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.font = '14px sans-serif';
  context.strokeStyle = '#100';

  if (!tree.head) {
    context.fillText('tree is empty', canvas.width / 2 - 50, 15);
  } else {
    const x = canvas.width / 2;
    const y = 30;

    drawTree(context, x, y, radius, tree.head, canvas.width / 4);
  }

  context.stroke();
}

function drawTree(context, x, y, radius, root, horizontalGap) {
  context.fillText(root.data + '', x - 5, y + 5);
  context.arc(x, y, radius, 0, Math.PI * 2, false);

  if (root.left) {
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

  if (root.right) {
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

draw();

function insert() {
  const inputField = document.getElementById('value');
  const value = inputField.value;
  console.log('val', value);
  tree.insert(parseInt(value));
  inputField.value = '';
  draw();
  inputField.focus();
}

function preorder() {
  const results = tree.preOrderTraversal(tree.head);
  document.getElementById('results').innerHTML = results;
}

function inorder() {
  const results = tree.inOrderTraversal(tree.head);
  document.getElementById('results').innerHTML = results;
}

function postorder() {
  const results = tree.postOrderTraversal(tree.head);
  document.getElementById('results').innerHTML = results;
}

function search() {
  const inputField = document.getElementById('value');
  const result = tree.search(inputField.value);
  if (result) {
    document.getElementById('results').innerHTML =
      inputField.value + ' was found in the tree';
  } else {
    document.getElementById('results').innerHTML =
      inputField.value + ' was not found in the tree';
  }
  inputField.value = '';
}

function remove() {
  const inputField = document.getElementById('value');
  tree.remove(tree.head, inputField.value);
  draw();
  inputField.value = '';
}

document.getElementById('insert').addEventListener('click', insert);
document.getElementById('preorder').addEventListener('click', preorder);
document.getElementById('inorder').addEventListener('click', inorder);
document.getElementById('postorder').addEventListener('click', postorder);
document.getElementById('search').addEventListener('click', search);
document.getElementById('remove').addEventListener('click', remove);
