const fill = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.empty');
const damage = document.querySelector('#damage');
const deck = document.querySelector('#deck');
const hand = document.querySelector('#hand');
const deckCount = document.querySelector('.counter');
const drop = document.querySelector('#drop');

// Fill listeners
for (const filled of fill) {
  filled.addEventListener('dragstart', dragStart);
  filled.addEventListener('dragend', dragEnd);
  filled.addEventListener('click', tap);
  filled.addEventListener('click', blast);
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
  if (this.classList.contains('blasted')) {
    this.classList.remove('blasted');
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
  // console.log('over');
  e.preventDefault();
  this.className += ' hovered';
}

function dragEnter(e) {
  // console.log('enter');
  e.preventDefault();
}

function dragLeave() {
  // console.log('leave');
  this.className = 'empty';
}

function dragDrop() {
  // console.log('drop');
  this.className = 'empty';
  for (const filled of fill) {
    if (this.getAttribute('id') == 'deck' && filled.classList.contains('invisible')) {
      this.insertBefore(filled, this.lastElementChild);
    } else if (filled.classList.contains('invisible')) {
      this.append(filled);
      //the line here works - this is my hope
      // this.insertBefore(filled, this.lastElementChild);
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

function blast() {
  if (damage.contains(this)) {
    if (this.classList.contains('blasted') == false) {
      this.className += ' blasted';
    } else {
      this.classList.toggle('blasted');
    }
  }
}

var imgAmt = deck.getElementsByTagName("img").length;
deck.addEventListener('click', draw);
function draw() {
  // if (imgAmt == 0) {
  //   return;
  // }
  var randCard = Math.floor(Math.random() * imgAmt)
  if (this.children[randCard].getAttribute('draggable')) {
    hand.appendChild(this.children[randCard]);
    // imgAmt--;
    // deckCount.textContent = imgAmt;
  }
}

deckCount.textContent = imgAmt;
const deckAmt = new MutationObserver(mutations => {
  mutations.forEach(record => {
    if (record.addedNodes.length > 0) {
      imgAmt = deck.getElementsByTagName("img").length;
      deckCount.textContent = imgAmt;
    }
    if (record.removedNodes.length > 0) {
      imgAmt = deck.getElementsByTagName("img").length;
      deckCount.textContent = imgAmt;
    }
  })
})

deckAmt.observe(deck, {
  childList: true
})

// 
