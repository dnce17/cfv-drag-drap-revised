const fill = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.empty');

// Fill listeners
for (const filled of fill) {
  filled.addEventListener('dragstart', dragStart);
  filled.addEventListener('dragend', dragEnd);
}

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}


function dragStart() {
  console.log('start')
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  console.log('end')
  this.className = 'fill';
}

// it is safe to include preventDefault in case the the browser works against you 

function dragOver(e) {
  e.preventDefault();
  console.log('over');
}

function dragEnter(e) {
  console.log('enter');
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  console.log('leave');
  this.className = 'empty';
}

function dragDrop() {
  console.log('drop');
  this.className = 'empty';
  for (const filled of fill) {
    if (filled.classList.contains('invisible')) {
      this.append(filled);
    }
  }
}


