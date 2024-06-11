const pointDoubleThreshold = 13;
const abilities = ["str", "dex", "con", "int", "wis", "cha"];

/**
 * Returns the requested score from an array of scores
 * @param {Array} scores 
 * @param {String} score 
 * @returns {Object} The score requested from the array.
 */
export const getScore = (scores, score) => {
	return scores.find((s) => s.key === score);
};
/**
 * Sets the requested variable of the requested score to the passed value
 * @param {Array} scores 
 * @param {Function} setScores 
 * @param {String} score 
 * @param {String} variable Pass "all" to set all abilities
 * @param {any} value 
 * @param {Boolean} reset @default false Pass true to reset the score's points
 */
export const setScore = (scores, setScores, score, variable, value, reset = false) => {
	const nextScores = [...scores];
	const scoreA = nextScores.find((s) => s.key === score);
	if ((variable = "all")) abilities.forEach(ability => scoreA[ability] = value);
	else scoreA[variable] = value;
    if(reset) scoreA.points = scoreA.maxPoints
	setScores(nextScores);
};
/**
 * Increments the requested variable of the requested score
 * @param {Array} scores 
 * @param {Function} setScores 
 * @param {String} score 
 * @param {String} variable
 * @returns {Boolean} Whether or not the variable was incremented
 */
export const IncrementScore = (scores, setScores, score, variable) => {
	const nextScores = [...scores];
	const scoreA = nextScores.find((s) => s.key === score);
	let minPoints = scoreA.str < pointDoubleThreshold ? 1 : 2;
	if (
        scoreA[variable] >= scoreA.max ||
		(scoreA.points > -1 && scoreA.points < minPoints) ||
		!scoreA.mod ||
		!abilities.includes(variable)
	)
		return false;
	if (scoreA.points > -1) scoreA.points -= minPoints;
	scoreA[variable]++;
	setScores(nextScores);
    return true;
};
/**
 * Decrements the requested variable of the requested score
 * @param {Array} scores 
 * @param {Function} setScores 
 * @param {String} score 
 * @param {String} variable
 * @returns {Boolean} Whether or not the variable was decremented
 */
export const DecrementScore = (scores, setScores, score, variable) => {
	const nextScores = [...scores];
	const scoreA = nextScores.find((s) => s.key === score);
	let minPoints = scoreA.str < pointDoubleThreshold ? 1 : 2;
	if (
        scoreA[variable] <= scoreA.min ||
		(scoreA.points > -1 && scoreA.points > scoreA.maxPoints - minPoints) ||
		!scoreA.mod ||
		!abilities.includes(variable)
	)
		return false;
	if (scoreA.points > -1) scoreA.points += minPoints;
	scoreA[variable]--;
	setScores(nextScores);
    return true;
};

export function CalculatePointCost({ score }) {
	let cost = 0;
	for (let i = score; i > 8; i--) {
		cost += i <= pointDoubleThreshold ? 1 : 2;
	}
	return cost;
}
