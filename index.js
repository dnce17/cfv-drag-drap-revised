var fill = document.querySelectorAll('.fill');
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
  target.children[1].className = 'option_ctnr';
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
  updateCount();
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
      // console.log('card added');

      // if (this.parentElement.classList.contains('hand')) {
      //   console.log('card to hand');
      //   unitCtnr.appendChild(this);
      // } else {
      //   const unitCtnr = this.children[0];
      //   unitCtnr.appendChild(card);
      // }

    }
  }
}

// Mechanics
for (const cardCtnr of fill) {
  // Let the focus be on the card img
  const card = cardCtnr.children[0];
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
    updateCount();
  }
}

// ATK/REST
function tap() {
  const rc = document.querySelectorAll('.rc');
  const vc = document.querySelector('.vc');
  if (vc.contains(this)) {
    this.classList.toggle('tap');
    this.nextElementSibling.classList.toggle('adjust_option');
    return;
  }
  for (var i = 0; i < rc.length; i++) {
    if (rc[i].contains(this)) {
      this.classList.toggle('tap');
      this.nextElementSibling.classList.toggle('adjust_option');
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

// OPEN SEARCH
const allClickable = document.querySelectorAll('.clickable');
function searchEvt() {
  // const allClickable = document.querySelectorAll('.clickable');
  for (const clickable of allClickable) {
    clickable.addEventListener('click', showSearchCtnr);
  }
}

searchEvt()

function showSearchCtnr() {
  for (const clickable of allClickable) {
    if (clickable.classList.contains('selected')) {
      return;
    }
  }
  this.className += ' selected';

  const searchCtnr = document.querySelector('.search-ctnr');
  searchCtnr.classList.remove('hidden');
  appendCards(this);
  // Soul excludes the top card
  if (this.classList.contains('soul-amt')) {
    const searchItemCtnr = document.querySelector('.search-item-ctnr');
    searchItemCtnr.removeChild(searchItemCtnr.children[0]);
  }
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
  for (var i = location.childElementCount; i > 0; i--) {
    const cln = location.children[i - 1].cloneNode(true);
    // add evts to the cards (since they're not copied)
    cln.addEventListener('dragstart', dragStart);
    cln.addEventListener('dragend', dragEnd);
    cln.addEventListener('click', draw);
    cln.addEventListener('click', tap);
    cln.addEventListener('click', blast);
    searchItemCtnr.appendChild(cln);
  }
  // to include the new cards in dragDrop - NOTE: this can be removed if you local the fill variable
  fill = document.querySelectorAll('.fill');
}

// CLOSE SEARCH
function exitSearchEvt() {
  const exit = document.querySelector('.exit');
  exit.addEventListener('click', closeSearchCtnr);
}

exitSearchEvt();

function closeSearchCtnr() {
  for (const clickable of allClickable) {
    if (clickable.classList.contains('selected')) {
      clickable.classList.remove('selected');
    }
  }
  const searchCtnr = document.querySelector('.search-ctnr');
  searchCtnr.className += (' hidden');
  const searchItemCtnr = document.querySelector('.search-item-ctnr');
  var card = searchItemCtnr.lastElementChild;
  while (card) {
    searchItemCtnr.removeChild(card);
    card = searchItemCtnr.lastElementChild;
  }
}

// REMOVE CARD FROM SOURCE WHEN REMOVED FROM SEARCH CTNR
function removedFromSearchCtnr() {
  var itemsToTrack = {
    // NOTE: beware of missing periods in key
    'g-zone-amt': '.stride__down',
    'gb-amt': '.stride__up',
    'soul-amt': '.vc',
    'bind-amt': '.bind',
    'removal-amt': '.removal',
    'deck-count-ctnr': '.deck',
    'drop-count-ctnr': '.drop',
    'damage-count-ctnr': '.damage',
  }

  const searchItemCtnr = document.querySelector('.search-item-ctnr');
  const observer = new MutationObserver(mutations => {
    mutations.forEach(record => {
      if (record.removedNodes.length > 0) {
        for (const clickable of allClickable) {
          if (clickable.classList.contains('selected')) {
            console.log(clickable);
            const entries = Object.entries(itemsToTrack);
            for (const [button, source] of entries) {
              if (clickable.classList.contains(button)) {
                const target = document.querySelector(source);
                const removed = record.removedNodes[0];
                for (var i = 0; i < target.childElementCount; i++) {
                  if (removed.children[0].src == target.children[i].children[0].src) {
                    target.removeChild(target.children[i]);
                    break;
                  }
                }
              }
            }
          }
        }
      }
    })
  })
  observer.observe(searchItemCtnr, {
    childList: true
  });
}

removedFromSearchCtnr();

// COUNT
function updateCount() {
  var itemsToTrack = {
    // NOTE: beware of missing periods in key
    'g-zone-amt': '.stride__down',
    'gb-amt': '.stride__up',
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
    for (const [button, source] of entries) {
      if (count.parentElement.classList.contains(button)) {
        const target = document.querySelector(source);
        count.textContent = target.childElementCount;
        if (button == 'soul-amt') {
          if (target.childElementCount > 0) {
            count.textContent = target.childElementCount - 1;
          }
        }
      }
    }
  }
}

updateCount();


// ACTIONS ABOVE CARD - Lock, Bottom of Deck


const action = document.querySelectorAll('.option');
for (const option of action) {
  option.addEventListener('click', locked);
  option.addEventListener('click', placeBottomDeck);
  // option.addEventListener('click', locked);
}

function locked() {
  if (this.classList.contains('lock')) {
    // console.log('clicked lock');
    const card = this.parentElement.previousElementSibling;
    card.classList.toggle('facedown');
  }
}

function placeBottomDeck() {
  if (this.classList.contains('bottom')) {
    const deck = document.querySelector('.deck');
    console.log(deck);
    const card = this.parentElement.parentElement;
    // Idk why deck is the only thing not working - no idea why its appending to hand
    // FIXED!! - Draw was activating for some reason when clicking the icon
    deck.appendChild(card);
    updateCount();
  }
}





