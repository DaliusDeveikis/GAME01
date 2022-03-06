'use strict';

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

// Selected elements
const elements = {
  leftSquare: document.querySelector('#left-square'),
  rightSquare: document.querySelector('#right-square'),
  timer: document.querySelector('#timer'),
  modal: document.querySelector('.modal'),
  closeModal: document.querySelectorAll('[data-bs-dismiss=modal]')
};

let secundes = 0;
let minute = 1;
let interval;
let count = 0;

// class Matrix creating elements
class Matrix {
  constructor(element) {
    this.element = element;
  }
  create(row, column) {
    for (let i = 0; i < row; i++) {
      const divRow = document.createElement('div');
      divRow.classList.add('row');
      for (let j = 0; j < column; j++) {
        const divCol = document.createElement('div');
        divCol.classList.add('col');
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-outline-dark', 'mt-4');
        const textBtn = document.createTextNode('  ');
        btn.appendChild(textBtn);
        divCol.appendChild(btn);
        divRow.appendChild(divCol);
      }
      this.element.appendChild(divRow);
    }
    return this.element;
  }
  createBtn(name) {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    const text = document.createTextNode(name);
    btn.appendChild(text);
    btn.classList.add('btn', 'btn-danger', 'btn-lg', 'mt-5', name);
    div.appendChild(btn);
    this.element.appendChild(div);
    return document.querySelector('.' + name);
  }
}

// creating objects
const ob1 = new Matrix(elements.leftSquare);
const ob2 = new Matrix(elements.rightSquare);

const matrix1 = ob1.create(5, 5);
const matrix2 = ob2.create(5, 5);

const btnSTART = ob1.createBtn('START');
const btnRESET = ob2.createBtn('RESET');

// creating timer
const h1 = document.createElement('h1');
h1.classList.add('mt-10');

// creating list of number from 1 to 25
const list1 = [];
for (let i = 1; i <= 25; i++) {
  list1.push(i);
}
let sortlist1 = list1;

// START button
btnSTART.addEventListener('click', () => {
  sortlist1.sort(() => random(-10, 10));
  console.log('Antras: ', sortlist1);
  const leftSquare = document.querySelectorAll('#left-square .row .col button');
  const rightSquare = document.querySelectorAll(
    '#right-square .row .col button'
  );
  leftSquare.forEach((btn, i) => {
    const elementColor = (btn.style.background = '#' + randomColor());

    btn.innerText = sortlist1[i];
    btn.addEventListener('click', () => {
      count++;
      if (count != list1[i]) {
        count--;
        elements.modal.classList.add('show');
        elements.modal.style.display = 'block';
      } else {
        rightSquare.forEach((item, j) => {
          if (j == count - 1) {
            item.innerText = list1[i];
            item.style.background = elementColor;
          }
        });
      }
      if (count == 25) {
        const modalBody = document.querySelector('.modal-body');
        const modalTitle = document.querySelector('.modal-title');
        elements.modal.classList.add('show');
        elements.modal.style.display = 'block';
        modalTitle.innerText = 'SVEIKINAME!!!!';
        modalBody.innerText = 'JUS LAIMEJOTE!!\n JUSU LAIKAS YRA: ' + secundes;
      }
      console.log(count);
    });
  });
  interval = setInterval(() => {
    secundes++;
    if (secundes < 10) {
      h1.innerText = '00:0' + secundes;
    } else {
      h1.innerText = '00:' + secundes;
    }
  }, 1000);
  elements.timer.appendChild(h1);
});

// RESET button
btnRESET.addEventListener('click', () => {
  console.log('RESETING.....');
  count = 0;
  sortlist1 = list1;
  secundes = 0;
  clearInterval(interval);
  h1.innerText = secundes;
  elements.timer.appendChild(h1);
  const rightSquare = document.querySelectorAll(
    '#right-square .row .col button'
  );
  const leftSquare = document.querySelectorAll('#left-square .row .col button');
  rightSquare.forEach(item => {
    item.innerText = '';
    item.style.background = '';
  });
  leftSquare.forEach(it => {
    it.style.background = '';
    it.innerText = '';
  });
  elements.modal.classList.remove('show');
  elements.modal.style.display = 'none';
});

// Modal
elements.closeModal.forEach(close => {
  close.addEventListener('click', () => {
    elements.modal.classList.remove('show');
    elements.modal.style.display = 'none';
  });
});
