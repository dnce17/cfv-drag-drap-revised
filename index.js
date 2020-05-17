const fill = document.querySelectorAll('.fill');
const circles = document.querySelectorAll('.circle');

// Add Drag Events
for (const card of fill) {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
}

// For a reset of classes that may have been added on to card/img (e.g. tap or blast)
function clsReset(target) {
  target.className = 'card fill';
  target.children[0].className = '';
}

// For zone that inherently are -90 deg - these cards won't have tap
function upright(target) {
  const damage = document.querySelector('.damage');
  const trigger = document.querySelector('.trigger');
  if (damage.contains(target) || trigger.contains(target)) {
    target.className += ' upright';
  }
}

function dragStart(e) {
  // console.log('start');
  clsReset(this);
  upright(this);
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
  card.addEventListener('click', blast);
}

// DRAW
function draw() {
  const deck = document.querySelector('.deck');
  if (deck.contains(this)) {
    console.log('Card has been drawn from deck');
    const hand = document.querySelector('.hand').children[0].children[0];
    hand.appendChild(this);
  }
}

// ATK/REST
function tap() {
  const rc = document.querySelectorAll('.rc');
  const vc = document.querySelector('.vc');
  if (vc.contains(this)) {
    this.classList.toggle('tap');
    return;
  }
  for (var i = 0; i < rc.length; i++) {
    if (rc[i].contains(this)) {
      this.classList.toggle('tap');
    }
  }
}

// CB & DAMAGE
function blast() {
  const damage = document.querySelector('.damage');
  if (damage.contains(this)) {
    this.children[0].classList.toggle('facedown');
  }
}

// TRIGGER
function triggerEvt() {
  const trigger = document.querySelector('.trigger');
  trigger.addEventListener('click', drive);
  trigger.addEventListener('contextmenu', triggerToHand);
}

triggerEvt();

function drive() {
  const deck = document.querySelector('.deck');
  this.appendChild(deck.lastElementChild);
}

function triggerToHand(e) {
  e.preventDefault();
  if (this.childElementCount > 0) {
    const hand = document.querySelector('.hand').children[0].children[0];
    while (this.childElementCount > 0) {
      hand.appendChild(this.lastElementChild);
    }
  }
}

// SEARCH
function searchEvt() {
  const allClickable = document.querySelectorAll('.clickable');
  for (const clickable of allClickable) {
    if (clickable.classList.contains('cb-amt')) {
      continue;
    } else {
      clickable.addEventListener('click', showSearchCtnr);
    }
  }
}

searchEvt()

function showSearchCtnr() {
  // console.log(this);
  const searchCtnr = document.querySelector('.search-ctnr');
  searchCtnr.classList.remove('hidden');
  appendCards(this);
}

function appendCards(btn) {

  var switchSource = {
    'g-zone-amt': '.stride__down',
    'gb-amt': '.stride__up',
    'soul-amt': '.vc',
    'bind-amt': '.bind',
    'removal-amt': '.removal',
    'deck-count-ctnr': '.deck',
    'drop-count-ctnr': '.drop'
  }

  const entries = Object.entries(switchSource);
  for (const [button, source] of entries) {
    if (btn.classList.contains(button)) {
      const target = document.querySelector(source);
      copyCards(target);
    }
  }

}

function copyCards(location) {
  const searchItemCtnr = document.querySelector('.search-item-ctnr');
  for (var i = 0; i < location.childElementCount; i++) {
    const cln = location.children[i].cloneNode(true);
    searchItemCtnr.appendChild(cln);
  }
}

// close the search ctnr
function exitSearchEvt() {
  const exit = document.querySelector('.exit');
  exit.addEventListener('click', closeSearchCtnr);
}

exitSearchEvt();

function closeSearchCtnr() {
  const searchCtnr = document.querySelector('.search-ctnr');
  searchCtnr.className += (' hidden');
  const searchItemCtnr = document.querySelector('.search-item-ctnr');
  var card = searchItemCtnr.lastElementChild;
  while (card) {
    searchItemCtnr.removeChild(card);
    card = searchItemCtnr.lastElementChild;
  }
}

// NEXT OBJECTIVE
// Remove the card from the source when you drag the card out of the search ctnr


// COUNT - Will need to change cb later, so that it only counts face up cards
function updateCount() {
  var itemsToTrack = {
    // NOTE: beware of missing periods in key
    'g-zone-amt': '.stride__down',
    'gb-amt': '.stride__up',
    'cb-amt': '.damage',
    'soul-amt': '.vc',
    'bind-amt': '.bind',
    'removal-amt': '.removal',
    'deck-count-ctnr': '.deck',
    'drop-count-ctnr': '.drop',
    'damage-count-ctnr': '.damage',
  }

  const entries = Object.entries(itemsToTrack);
  const counts = document.querySelectorAll('.count');
  for (const count of counts) {
    console.log(count);
    console.log(count.parentElement);
    for (const [button, source] of entries) {
      if (count.parentElement.classList.contains(button)) {
        const btn = document.querySelector(`.${button}`);
        const target = document.querySelector(source);
        count.textContent = target.childElementCount;
      }
    }
  }
}

updateCount()

