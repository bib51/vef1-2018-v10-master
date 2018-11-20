// todo vísa í rétta hluti með import
import * as helper from './helpers';
import * as storage from './storage';
/**
 * Reikna út stig fyrir svör út frá heildarfjölda svarað á tíma.
 * Ekki þarf að gera ráð fyrir hversu lengi seinasta spurning var sýnd. Þ.e.a.s.
 * stig verða alltaf reiknuð fyrir n-1 af n spurningum.
 *
 * @param {number} total Heildarfjöldi spurninga
 * @param {number} correct Fjöldi svarað rétt
 * @param {number} time Tími sem spurningum var svarað á í sekúndum
 *
 * @returns {number} Stig fyrir svör
 */
export function score(total, correct, time) {
  if (correct === 0) { return 0; }
  const number = ((((correct / total) ** 2) + correct) * total) / time;
  return Math.round(number) * 100;
}

/**
 * Útbúa stigatöflu, sækir gögn í gegnum storage.js
 */
export default class Highscore {
  constructor() {
    this.scores = document.querySelector('.highscore__scores');
    this.button = document.querySelector('.highscore__button');

    this.button.addEventListener('click', this.clear.bind(this));
  }

  /**
   * Hlaða stigatöflu inn
   */
  load() {
    this.highscore(storage.load());
  }

  /**
   * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
   */
  clear() {
    storage.clear();
    helper.empty(this.scores);

    const p = helper.el('p', 'Ekkert skráð');
    this.scores.appendChild(p);
    this.button.classList.add('highscore__button--hidden');
  }

  /**
   * Hlaða inn stigatöflu fyrir gefin gögn.
   *
   * @param {array} data Fylki af færslum í stigatöflu
   */
  highscore(data) {
    if (data.length <= 0) { return; }

    helper.empty(this.scores);
    this.button.classList.remove('highscore__button--hidden');

    const ol = helper.el('ol');
    this.scores.appendChild(ol);
    data.forEach((stig) => {
      const li = helper.el('li');
      const numberItem = helper.el('span', `${stig.points}`);
      numberItem.classList.add('highscore__number');
      const nameItem = helper.el('span', `${stig.name}`);
      numberItem.classList.add('highscore__name');
      li.appendChild(numberItem);
      li.appendChild(nameItem);
      ol.appendChild(li);
    });
  }
}
