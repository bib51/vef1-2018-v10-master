// todo vísa í rétta hluti með import
import * as helper from './helpers';
import question from './question';
import Highscore, { score } from './highscore';
import * as storage from './storage';
// allar breytur hér eru aðeins sýnilegar innan þessa módúl

let startButton; // takki sem byrjar leik
let problem; // element sem heldur utan um verkefni, sjá index.html
let result; // element sem heldur utan um niðurstöðu, sjá index.html

let playTime; // hversu lengi á að spila? Sent inn gegnum init()
let total = 0; // fjöldi spurninga í núverandi leik
let correct = 0; // fjöldi réttra svara í núverandi leik
let currentProblem; // spurning sem er verið að sýna
let stig = 0;
let probtimer;
let problemAnswer;
let problemInput;
let resultForm;
let resultText;
let resultInput;
let hiScore;

/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */
function finish() {
  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${stig} stig fyrir. Skráðu þig á stigatöfluna!`;
  stig = score(total, correct, playTime);

  const nytt = helper.el('span', text);
  helper.empty(resultText);
  resultText.appendChild(nytt);

  problem.classList.add('problem--hidden');
  result.classList.remove('result--hidden');
}

/**
 * Keyrir áfram leikinn. Telur niður eftir því hve langur leikur er og þegar
 * tími er búinn kallar í finish().
 *
 * Í staðinn fyrir að nota setInterval köllum við í setTimeout á sekúndu fresti.
 * Þurfum þá ekki að halda utan um id á intervali og skilum falli sem lokar
 * yfir fjölda sekúnda sem eftir er.
 *
 * @param {number} current Sekúndur eftir
 */
function tick(current) {
  helper.empty(probtimer);
  const nytt = helper.el('span', `${current}`);
  probtimer.appendChild(nytt);
  setTimeout(() => {
    if (current <= 0) {
      helper.empty(probtimer);
      return finish();
    }
    return tick(current - 1);
  }, 1000);
}

/**
 * Býr til nýja spurningu og sýnir undir .problem__question
 */
function showQuestion() {
  currentProblem = question();
  total += 1;
  const problemQuestion = problem.querySelector('.problem__question');
  helper.empty(problemQuestion);
  const span = helper.el('span', currentProblem.problem);
  problemQuestion.appendChild(span);
}

/**
 * Byrjar leik
 *
 * - Felur startButton og sýnir problem
 * - Núllstillir total og correct
 * - Kallar í fyrsta sinn í tick()
 * - Sýnir fyrstu spurningu
 */
function start() {
  // todo útfæra
  startButton.classList.add('button--hidden');
  problem.classList.remove('problem--hidden');
  total = 0;
  correct = 0;
  tick(playTime);
  showQuestion();
}

/**
 * Event handler fyrir það þegar spurningu er svarað. Athugar hvort svar sé
 * rétt, hreinsar input og birtir nýja spurningu.
 *
 * @param {object} e Event þegar spurningu svarað
 */
function onSubmit(e) {
  // todo útfæra
  e.preventDefault();
  const input = problemInput.value.trim();

  if (!input) { return; }
  if (parseInt(input, 10) === currentProblem.answer) {
    correct += 1;
  }
  problemInput.value = ' ';
  showQuestion();
}

/**
 * Event handler fyrir þegar stig eru skráð eftir leik.
 *
 * @param {*} e Event þegar stig eru skráð
 */
function onSubmitScore(e) {
  e.preventDefault();

  const input = resultInput.value.trim();
  if (!input) {
    return;
  }
  storage.save(input, stig);
  hiScore.load();

  result.classList.add('result--hidden');
  problem.classList.add('problem--hidden');
  startButton.classList.remove('button--hidden');
}

/**
 * Finnur öll element DOM og setur upp event handlers.
 *
 * @param {number} _playTime Fjöldi sekúnda sem hver leikur er
 */
export default function init(_playTime) {
  playTime = _playTime;


  startButton = document.querySelector('.start');
  problem = document.querySelector('.problem');
  problemAnswer = document.querySelector('.problem__answer');
  problemInput = document.querySelector('.problem__input');
  probtimer = document.querySelector('.problem__timer');
  result = document.querySelector('.result');
  resultForm = document.querySelector('.result__form');
  resultText = document.querySelector('.result__text');
  resultInput = document.querySelector('.result__input');

  startButton.addEventListener('click', start);
  problemAnswer.addEventListener('submit', onSubmit);
  resultForm.addEventListener('submit', onSubmitScore);
  hiScore = new Highscore();
}
