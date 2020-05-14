const fill = document.querySelectorAll('.fill');
const circles = document.querySelectorAll('.circle');

// Add Drag Events
for (const card of fill) {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
}

function dragStart() {
  // console.log('start');
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  // console.log('end');
  this.className = 'card fill';
}

for (const circle of circles) {
  circle.addEventListener('dragover', dragOver);
  circle.addEventListener('dragenter', dragEnter);
  circle.addEventListener('dragleave', dragLeave);
  circle.addEventListener('drop', dragDrop);
}

function dragOver(e) {
  e.preventDefault();
  // console.log('over');
  if (this.classList.contains('hovered') == false) {
    this.className += ' hovered';
  }
}

function dragEnter(e) {
  e.preventDefault();
  // console.log('enter');
}

function dragLeave() {
  // console.log('leave');
  this.className = 'circle center';
}

function dragDrop() {
  // console.log('drop');
  this.className = 'circle center';
  for (const card of fill) {
    if (card.classList.contains('invisible')) {
      const unitCtnr = this.children[0];
      unitCtnr.appendChild(card);
    }
  }
}

// Mechanics
for (const card of fill) {
  card.addEventListener('click', draw);
  card.addEventListener('click', tap);
}

// Draw
function draw() {
  const deck = document.querySelector('.deck');
  if (deck.contains(this)) {
    console.log('Card has been drawn from deck');
    const hand = document.querySelector('.hand').children[0].children[0];
    hand.appendChild(this);
  }
}

// Atk/Rest
function tap() {
  const rc = document.querySelectorAll('.rc');
  const vc = document.querySelector('.vc');
  if (vc.contains(this)) {
    console.log('In VC');
    return;
  }
  for (i = 0; i < rc.length; i++) {
    if (rc[i].contains(this)) {
      console.log(rc[i] + ' contains this');
    }
  }
}

// Trigger
const trigger = document.querySelector('.trigger');
trigger.addEventListener('click', drive);

function drive() {
  const deck = document.querySelector('.deck');
  this.appendChild(deck.lastElementChild);
}

