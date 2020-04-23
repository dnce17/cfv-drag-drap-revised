const fill = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.empty');
const damage = document.querySelector('#damage');

// Fill listeners
for (const filled of fill) {
  filled.addEventListener('dragstart', dragStart);
  filled.addEventListener('dragend', dragEnd);
  filled.addEventListener('click', tap);
}

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}


function dragStart() {
  // console.log('start')
  if (this.classList.toggle('tap')) {
    this.classList.toggle('tap')
  }
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  // console.log('end')
  if (damage.contains(this)) {
    this.className = 'fill';
    this.className += ' tap'
  } else {
    this.className = 'fill';
  }
}

// it is safe to include preventDefault in case the the browser works against you 

function dragOver(e) {
  e.preventDefault();
  // console.log('over');
}

function dragEnter(e) {
  // console.log('enter');
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  // console.log('leave');
  this.className = 'empty';
}

function dragDrop() {
  // console.log('drop');
  this.className = 'empty';
  for (const filled of fill) {
    if (filled.classList.contains('invisible')) {
      this.append(filled);
    }
  }
}

function tap() {
  const noTap = [0, 4, 8];
  for (const val of noTap) {
    if (empties[val].contains(this)) {
    } else {
      if (this.classList.contains('tap') == false) {
        this.className += ' tap';
      } else {
        this.classList.toggle('tap');
      }
    }
  }
}