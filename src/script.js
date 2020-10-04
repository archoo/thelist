var txt = '';
var ttFade = 0;
var ttTimer = 0;
var boxFade = 0;
var boxTimer = 0;
var popup = document.getElementById('popup');
var curr = -1;
var item = null;
var hlcurr = false;

function showTxt() {
  ttFade -= 1;
  if (ttFade <= 0) {
    popup.style.visibility = 'hidden';
    clearInterval(ttTimer);
    ttTimer = 0;
  }
}

function showBox() {
  boxFade -= 1;
  if (boxFade <= 0) {
    item.style.border = '';    
    hlcurr = false;
    clearInterval(boxTimer);
    boxTimer = 0;
  }
}

function handleKey(e) {
  if (e.key == 'Enter') {
    if (txt != '') document.getElementById('today').insertAdjacentHTML('afterbegin','<span>'+txt+'</span>');
    txt = '';
  }
  if (e.key == 'Backspace') {
    txt = txt.substr(0,txt.length-1);
    popup.textContent = txt;
    e.preventDefault();
  }
  if (e.key == 'Escape') {
    txt = '';
    popup.style.visibility = 'hidden';
  }
  if (e.key == 'ArrowUp') {
    if (item) item.style.border = '';
    curr--;
    curr = Math.max(0,curr);
    item = document.getElementsByTagName('span')[curr];
    item.style.border = '1px solid yellow';
    hlcurr = true;
    boxFade = 3;
    if (boxTimer == 0) { boxTimer = setInterval(showBox,1000); }
  }
  if (e.key == 'ArrowDown') {
    if (item) item.style.border = '';
    var l = document.getElementsByTagName('span').length;
    curr++
    curr = Math.min(l-1,curr);
    item = document.getElementsByTagName('span')[curr];
    item.style.border = '1px solid yellow';
    hlcurr = true;
    boxFade = 3;
    if (boxTimer == 0) { boxTimer = setInterval(showBox,1000); }
  }
  if (e.key == 'ArrowLeft') {
    if (hlcurr) {
      if (item.style.textDecoration == '') item.remove();
      if (item.style.textDecoration == 'line-through') {
        if (item.parentElement.id == 'done') document.getElementById('today').insertAdjacentElement('beforeend',item);
        else item.style.textDecoration = '';
      }
    boxFade = 3;
    }    
  }
  if (e.key == 'ArrowRight') {
    if (hlcurr) {
      if (item.style.textDecoration == 'line-through') {
        if (item.parentElement.id == 'today') document.getElementById('done').insertAdjacentElement('afterbegin',item);
      }
      if (item.style.textDecoration == '') item.style.textDecoration = 'line-through';
    boxFade = 3;
    }
  }
}

function handleText(e) {
  if (e.charCode > 31 && e.charCode < 127) {
    txt = txt.concat(e.key);
    popup.textContent = txt;
    popup.style.visibility = 'visible';
    ttFade = 3;
    if (ttTimer == 0) { ttTimer = setInterval(showTxt, 1000); }
    }
}

window.addEventListener('keypress', handleText);
window.addEventListener('keydown', handleKey);
window.addEventListener('load', () => {
  document.getElementById('today').innerHTML = JSON.parse(localStorage.getItem('thelist'));
  for (const s of document.getElementsByTagName('span')) s.style.border = 'none';
  });

new MutationObserver((m) => {saveList();}).observe(document.getElementById('today'), { attributes: true, childList: true, subtree: true });

function saveList() {
  localStorage.setItem('thelist',JSON.stringify(document.getElementById('today').innerHTML));
}
