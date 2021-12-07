'use strict';

const loger = [];

function randomSeconds() {
  return 100 * (Math.floor(Math.random() * 10) + 1);
}

function one(next) {
  setTimeout(() => {
    next(null, '1st task done');
  }, randomSeconds());
}

function two(next) {
  setTimeout(() => {
    next(null, '2nd task done');
  }, randomSeconds());
}

function three(next) {
  setTimeout(() => {
    next(null, '3rd task done');
  }, randomSeconds());
}

const tasks = [
  one,
  two,
  three,
  (next) => {
    next(new Error('not good'));
  },
  function four(next) {
    setTimeout(() => {
      next(null, '4th task done');
    }, randomSeconds());
  },
  function five(next) {
    setTimeout(() => {
      next(null, '5th task done');
    }, randomSeconds());
  },
  function six(next) {
    setTimeout(() => {
      next(null, '6th task done');
    }, randomSeconds());
  },
];

function iterate(index) {
  if (index === tasks.length) {
    return finish();
  }
  const task = tasks[index];
  task(function (err, msg) {
    loger.push({ index, err: err?.message, msg });
    if (err) {
      onError(err, index);
    } else {
      console.log(`Task #${index} done with msg: ${msg}`);
    }
    return iterate(index + 1);
  });
}

function finish() {
  console.log('completed');
  console.table(loger);
}

function onError(err, index) {
  console.log(`Error: Task #${index}: `, err.message);
  //process.exit(1);
}

iterate(0);
