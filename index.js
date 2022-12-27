let minute_id;
let second_id;
let ms_id;
let minute = 0;
let second = 0;
let milli = 0;
function setminute() {
  minute++;
  second = 0;
  if (minute < 10) {
    document.getElementById("minute").innerHTML = "0" + minute;
  } else {
    document.getElementById("minute").innerHTML = minute;
  }
}

function setSecond() {
  second++;
  milli = 0;
  if (second < 10) {
    document.getElementById("second").innerHTML = "0" + second;
  } else {
    document.getElementById("second").innerHTML = second;
  }
}

function setMilliSecond() {
  milli++;
  if (milli < 10) {
    document.getElementById("millisecond").innerHTML = "0" + milli;
  } else {
    document.getElementById("millisecond").innerHTML = milli;
  }
}
// Arrow Function
Start = () => {
  minute_id = setInterval(setminute, 60000);
  second_id = setInterval(setSecond, 1000);
  ms_id = setInterval(setMilliSecond, 1);
};

let total_moves = 9;
let bool;
let boxes = [
  "box-1",
  "box-2",
  "box-3",
  "box-4",
  "box-5",
  "box-6",
  "box-7",
  "box-8",
  "box-9",
];
let performed_moves = {
  "box-1": "",
  "box-2": "",
  "box-3": "",
  "box-4": "",
  "box-5": "",
  "box-6": "",
  "box-7": "",
  "box-8": "",
  "box-9": "",
};
let player_move;

document.getElementById("start").addEventListener("click", () => {
  bool = true;
});
function move(id) {
  if (bool) {
    if (total_moves >= 1 && total_moves <= 9) {
      if (
        total_moves % 2 != 0 &&
        document.getElementById(id).innerHTML != "O"
      ) {
        performed_moves[id] = "X";
        document.getElementById(id).style.color = "red";
        document.getElementById(id).innerHTML = "X";
      } else {
        performed_moves[id] = "O";
        document.getElementById(id).style.color = "green";
        document.getElementById(id).innerHTML = "O";
      }
      total_moves--;

      if (total_moves <= 4) {
        if (
          diagonal_check(performed_moves, "X") ||
          row_check(performed_moves, "X") ||
          column_check(performed_moves, "X")
        ) {
          document.getElementById("result").innerHTML = "Player-1 Wins...";
          clearInterval(minute_id);
          clearInterval(second_id);
          clearInterval(ms_id);
          disable();
          setInterval(() => {
            document.getElementById(
              "result"
            ).innerHTML = `<button id="reset" onclick="Reset()">New Game</button>`;
          }, 10000);
        }
        if (
          diagonal_check(performed_moves, "O") ||
          row_check(performed_moves, "O") ||
          column_check(performed_moves, "O")
        ) {
          document.getElementById("result").innerHTML = "Player-2 Wins...";
          clearInterval(minute_id);
          clearInterval(second_id);
          clearInterval(ms_id);
          disable();
          setInterval(() => {
            document.getElementById(
              "result"
            ).innerHTML = `<button id="reset" onclick="Reset()">New Game</button>`;
          }, 10000);
        }
      }
      if (total_moves == 0) {
        document.getElementById("result").innerHTML = "Game Draw..";
        clearInterval(minute_id);
        clearInterval(second_id);
        clearInterval(ms_id);
        disable();
        setInterval(() => {
          document.getElementById(
            "result"
          ).innerHTML = `<button id="reset" onclick="Reset()">New Game</button>`;
        }, 10000);
      }
    }
  }
}

function row_check(moves, symbol) {
  let res;
  for (let i = 0; i <= 2; i++) {
    res = true;
    for (let j = 0; j < 3; j++) {
      if (moves[boxes[3 * i + j]] != symbol) {
        res = false;
        break;
      }
      if (j == 2 && res) {
        return res;
      }
    }
  }
  return res;
}

function column_check(moves, symbol) {
  let res;
  for (let i = 0; i <= 2; i++) {
    res = true;
    for (let j = 0; j < 3; j++) {
      if (moves[boxes[3 * j + i]] != symbol) {
        res = false;
        break;
      }
      if (j == 2 && res) {
        return res;
      }
    }
  }
  return res;
}

function diagonal_check(moves, symbol) {
  let res = true;
  for (let i = 0; i < 3; i++) {
    if (moves[boxes[4 * i]] != symbol) {
      res = false;
    }
  }

  if (res == false) {
    res = true;
    for (let i = 1; i <= 3; i++) {
      if (moves[boxes[2 * i]] != symbol) {
        res = false;
      }
    }
    return res;
  } else {
    return res;
  }
}

function Reset() {
  minute = 0;
  second = 0;
  milli = 0;
  window.location.reload();
}


function disable(){
  boxes.forEach(element => {
    document.getElementById(element).disabled=true;
  });
}