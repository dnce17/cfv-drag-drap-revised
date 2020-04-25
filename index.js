var fill = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.empty');
const damage = document.querySelector('#damage');
const deck = document.querySelector('#deck');
const hand = document.querySelector('#hand');
const counter = document.querySelectorAll('.counter');
const drop = document.querySelector('#drop');
const searchBut = document.querySelector('.deck_search');
const searchHolder = document.querySelector('.search_container');

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
  if (this.classList.contains('hovered') == false) {
    this.className += ' hovered';
  }
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

var deckCount = deck.getElementsByTagName("img").length;
deck.addEventListener('click', draw);
function draw() {
  // if (deckCount == 0) {
  //   return;
  // }
  var randCard = Math.floor(Math.random() * deckCount)
  if (this.children[randCard].getAttribute('draggable')) {
    hand.appendChild(this.children[randCard]);
    // deckCount--;
    // deckCount.textContent = deckCount;
  }
}

counter[1].textContent = deckCount;
const deckAmt = new MutationObserver(mutations => {
  mutations.forEach(record => {
    if (record.addedNodes.length > 0) {
      deckCount = deck.getElementsByTagName("img").length;
      counter[1].textContent = deckCount;
    }
    if (record.removedNodes.length > 0) {
      deckCount = deck.getElementsByTagName("img").length;
      counter[1].textContent = deckCount;
    }
  })
})

deckAmt.observe(deck, {
  childList: true
})

var dropCount = drop.getElementsByTagName("img").length
counter[2].textContent = dropCount;
const dropAmt = new MutationObserver(mutations => {
  mutations.forEach(record => {
    if (record.addedNodes.length > 0) {
      dropCount = drop.getElementsByTagName("img").length
      counter[2].textContent = dropCount;
      // console.log('drop +');
    }
    if (record.removedNodes.length > 0) {
      dropCount = drop.getElementsByTagName("img").length
      counter[2].textContent = dropCount;
      // console.log('drop -');
    }
  })
})

dropAmt.observe(drop, {
  childList: true
})

var damageCount = damage.getElementsByTagName("img").length
counter[0].textContent = damageCount;
const damageAmt = new MutationObserver(mutations => {
  mutations.forEach(record => {
    if (record.addedNodes.length > 0) {
      damageCount = damage.getElementsByTagName("img").length
      counter[0].textContent = damageCount;
    }
    if (record.removedNodes.length > 0) {
      damageCount = damage.getElementsByTagName("img").length
      counter[0].textContent = damageCount;
    }
  })
})

damageAmt.observe(damage, {
  childList: true
})

// 
searchBut.addEventListener('click', deckSearch);

function deckSearch() {
  if (searchBut.classList.contains('over') == false) {
    searchBut.classList.toggle('over');
  } else {
    searchBut.classList.toggle('over');
  }

  if (searchHolder.classList.contains('disappear')) {
    searchHolder.classList.toggle('disappear');
    // console.log('if');
    for (const child of deck.children) {
      if (child.getAttribute('draggable')) {
        // console.log(child);
        var cln = child.cloneNode(true);
        cln.addEventListener('click', remove);
        searchHolder.appendChild(cln);
      }
    }
    evtToNew(searchHolder);
  } else {
    // console.log('else');
    searchHolder.classList.toggle('disappear');
    var card = searchHolder.lastElementChild;
    while (card) {
      searchHolder.removeChild(card);
      card = searchHolder.lastElementChild;
    }
  }
}

function remove() {
  if (searchHolder.contains(this)) {
    // console.log('no poop');
    hand.appendChild(this);
    // for (var i = 0; i < deck.childElementCount; i++) {
    //   if (this.src == deck.children[i].src) {
    //     // console.log('a match! So removed!');
    //     deck.removeChild(deck.children[i]);
    //     break;
    //   }
    // }
  }
}

function evtToNew(target) {
  fill = document.querySelectorAll('.fill');
  for (const filled of fill) {
    if (target.contains(filled)) {
      addEvt(filled);
    }
  }
}

function addEvt(target) {
  target.addEventListener('dragstart', dragStart);
  target.addEventListener('dragend', dragEnd);
  target.addEventListener('click', tap);
  target.addEventListener('click', blast);
}

// Issue here: I think it is fixed; check before putting it on github: CHECKED!! hopefully...
const searchCont = new MutationObserver(mutations => {
  mutations.forEach(record => {
    if (record.addedNodes.length > 0) {
      // console.log('drop +');
    }
    if (record.removedNodes.length > 0) {
      if (searchBut.classList.contains('over') == false) {
        console.log('erss');
      } else {
        console.log('drop -');
        const removed = record.removedNodes[0];
        for (var i = 0; i < deck.childElementCount; i++) {
          if (removed.src == deck.children[i].src) {
            deck.removeChild(deck.children[i]);
            break;
          }
        }
      }
    }
  })
})

searchCont.observe(searchHolder, {
  childList: true
})