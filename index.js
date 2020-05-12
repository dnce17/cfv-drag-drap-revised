const fill = document.querySelectorAll('.fill');
const circles = document.querySelectorAll('.circle');
const units = document.querySelectorAll('.unit-ctnr');

for (const card of fill) {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
}

function dragStart() {
  console.log('start');
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  console.log('end');
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
  console.log('over');
  this.className += ' hovered';
}

function dragEnter(e) {
  e.preventDefault();
  console.log('enter');
}

function dragLeave() {
  console.log('leave');
  this.className = 'circle center';
}

function dragDrop() {
  console.log('drop');
  this.className = 'circle center';
  for (const card of fill) {
    if (card.classList.contains('invisible')) {
      const unitCtnr = this.children[0];
      unitCtnr.appendChild(card);
    }
  }
}