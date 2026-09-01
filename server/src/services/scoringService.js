const { CHIT_POINTS } = require('../utils/constants');

/**
 * Given whether Mantri guessed correctly, return points for each role.
 * Correct: Raja=1000, Mantri=500, Sipahi=300, Chor=0
 * Wrong:   Raja=1000, Mantri=0,   Sipahi=300, Chor=500
 */
function calculatePoints(isCorrect) {
  return {
    raja: CHIT_POINTS.raja,
    mantri: isCorrect ? CHIT_POINTS.mantri : 0,
    sipahi: CHIT_POINTS.sipahi,
    chor: isCorrect ? 0 : CHIT_POINTS.mantri
  };
}

module.exports = { calculatePoints };
