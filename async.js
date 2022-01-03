'use strict';

/**
 * return a random number of seconds
 */
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min) * 1000;
}

function one(next) {
  setTimeout(() => {
    next(null, '1st task done');
  }, randomNumberBetween(1, 5));
}

function two(next) {
  setTimeout(() => {
    next(null, '2nd task done');
  }, randomNumberBetween(1, 5));
}

function three(next) {
  setTimeout(() => {
    next(null, '3rd task done');
  }, randomNumberBetween(1, 5));
}

const tasks = [
  one,
  two,
  three,
  function four(next) {
    setTimeout(() => {
      next(null, '4th task done');
    }, randomNumberBetween(1, 5));
  },
  function five(next) {
    setTimeout(() => {
      next(null, '5th task done');
    }, randomNumberBetween(1, 5));
  },
  function fivehalf(next) {
    next(null, 'i am a different thing');
  },
  function six(next) {
    setTimeout(() => {
      next(null, '6th task done');
    }, randomNumberBetween(1, 5));
  },
  function iwillfail(next) {
    next(Error('kaszana!'));
  },
];

let completed = 0;
tasks.forEach((task, i) => {
  console.log(`task ${i} started`);
  task((err, msg) => {
    /* The current task has just completed */
    console.log({ err, msg });
    if (++completed === tasks.length) {
      finish();
    }
  });
});

function finish() {
  console.log('All the tasks completed');
}
