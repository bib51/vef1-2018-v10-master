/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';
let itemsArray = [];
/**
 * Sækir gögn úr localStorage. Skilað sem röðuðum lista á forminu:
 * { points: <stig>, name: <nafn> }
 *
 * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    itemsArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  }
  return itemsArray;
}

/**
 * Vista stig
 *
 * @param {string} name Nafn þess sem á að vista
 * @param {number} points Stig sem á að vista
 */
export function save(name, points) {
  const data = { points, name };
  itemsArray.push(data);
  itemsArray.sort((a, b) => Number(b.points) - Number(a.points));
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(itemsArray));
}

/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
  itemsArray = [];
}
