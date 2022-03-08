// typing speed test
// wpm = (chars / 5) / minutes. accuracy = correct / typed * 100.

var passageEl = document.getElementById("passage");
var inputEl = document.getElementById("input");
var timeEl = document.getElementById("time");
var wpmEl = document.getElementById("wpm");
var accEl = document.getElementById("acc");
var resetBtn = document.getElementById("reset");
var limitSel = document.getElementById("limit");
var resultBox = document.getElementById("result");
var rWpm = document.getElementById("rWpm");
var rAcc = document.getElementById("rAcc");
var rChars = document.getElementById("rChars");
var rTime = document.getElementById("rTime");

var current = "";
var startedAt = null;
var timerId = null;
var limit = 60;
var finished = false;

function pickPassage() {
  var i = Math.floor(Math.random() * PASSAGES.length);
  return PASSAGES[i];
}

function renderPassage(typed) {
  var html = "";
  for (var i = 0; i < current.length; i++) {
    var ch = current.charAt(i);
    if (i < typed.length) {
      if (typed.charAt(i) === ch) {
        html += '<span class="ok">' + escape(ch) + '</span>';
      } else {
        // show the expected char marked as wrong
        html += '<span class="bad">' + escape(ch) + '</span>';
      }
    } else if (i === typed.length) {
      html += '<span class="cur">' + escape(ch) + '</span>';
    } else {
      html += escape(ch);
    }
  }
  passageEl.innerHTML = html;
}

function escape(c) {
  if (c === "<") return "&lt;";
  if (c === ">") return "&gt;";
  if (c === "&") return "&amp;";
  return c;
}

function reset() {
  finished = false;
  current = pickPassage();
  startedAt = null;
  if (timerId) { clearInterval(timerId); timerId = null; }
  limit = parseInt(limitSel.value, 10) || 60;
  inputEl.value = "";
  inputEl.disabled = false;
  timeEl.textContent = limit;
  wpmEl.textContent = "0";
  accEl.textContent = "100";
  resultBox.classList.add("hidden");
  renderPassage("");
  inputEl.focus();
}

function tick() {
  if (!startedAt) return;
  var elapsed = (Date.now() - startedAt) / 1000;
  var remaining = Math.max(0, limit - Math.floor(elapsed));
  timeEl.textContent = remaining;
  updateStats();
  if (remaining <= 0) {
    finish();
  }
}

function updateStats() {
  var typed = inputEl.value;
  var elapsed = startedAt ? (Date.now() - startedAt) / 1000 : 0;
  var minutes = elapsed / 60;
  var correct = 0;
  for (var i = 0; i < typed.length && i < current.length; i++) {
    if (typed.charAt(i) === current.charAt(i)) correct++;
  }
  var wpm = 0;
  if (minutes > 0) {
    wpm = Math.round((typed.length / 5) / minutes);
  }
  var acc = typed.length > 0 ? Math.round(correct / typed.length * 100) : 100;
  wpmEl.textContent = wpm;
  accEl.textContent = acc;
  return { wpm: wpm, acc: acc, typed: typed.length, elapsed: elapsed };
}

function finish() {
  if (finished) return;
  finished = true;
  if (timerId) { clearInterval(timerId); timerId = null; }
  var s = updateStats();
  inputEl.disabled = true;
  rWpm.textContent = s.wpm;
  rAcc.textContent = s.acc;
  rChars.textContent = s.typed;
  rTime.textContent = Math.round(s.elapsed);
  resultBox.classList.remove("hidden");
}

inputEl.addEventListener("input", function () {
  if (finished) return;
  if (!startedAt) {
    startedAt = Date.now();
    timerId = setInterval(tick, 200);
  }
  var typed = inputEl.value;
  // cap the input at passage length so we know when they finish
  if (typed.length > current.length) {
    inputEl.value = typed.slice(0, current.length);
    typed = inputEl.value;
  }
  renderPassage(typed);
  updateStats();
  if (typed === current) {
    finish();
  }
});

resetBtn.addEventListener("click", reset);
limitSel.addEventListener("change", reset);

// kick it off
reset();
