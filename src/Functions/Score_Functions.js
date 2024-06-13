import { abilities } from "../App";

const pointDoubleThreshold = 13;
const clearScore = {
	mod: false,
	min: 0,
	max: -1,
	points: -1,
	maxPoints: -1,
	blocked: [],
	str: 0,
	dex: 0,
	con: 0,
	int: 0,
	wis: 0,
	cha: 0,
	subraces: false,
	dontInclude: false,
};

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
 * Sets requested score to the passed new score
 * @param {Function} setScores
 * @param {String} score
 * @param {Object} newScore
 */
export const setScore = (setScores, score, newScore) => {
	setScores((scores) => {
		let nextScores = [...scores];
		const scoreA = nextScores.find((s) => s.key === score);
		const scoreB = Object.assign({}, clearScore, newScore, {
			key: score,
			maxPoints: newScore.points,
			base: newScore,
		});
		nextScores = nextScores.filter((s) => {
			return s.key !== scoreA.key;
		});
		nextScores.push(scoreB);
		return nextScores;
	});
};
/**
 * Adds passed new score to scores
 * @param {Function} setScores
 * @param {Object} newScore
 */
export const addScore = (setScores, newScore) => {
	setScores((scores) => {
		let nextScores = [...scores];
		nextScores.push(newScore);
		return nextScores;
	});
};
/**
 * Removes requested score from scores
 * @param {Function} setScores
 * @param {String} score
 */
export const deleteScore = (setScores, score) => {
	setScores((scores) => {
		let nextScores = [...scores];
		nextScores = nextScores.filter((s) => {
			// return s.key !== score;
			return !s.key.includes(score);
		});
		return nextScores;
	});
};
/**
 * Sets the requested variable of the requested score to the passed value
 * @param {Function} setScores
 * @param {String} score
 * @param {String} variable Pass "all" to set all abilities
 * @param {any} value
 * @param {Boolean} reset @default false Pass true to reset the score's points
 */
export const setAbility = (
	setScores,
	score,
	variable,
	value,
	reset = false
) => {
	setScores((scores) => {
		const nextScores = [...scores];
		const scoreA = nextScores.find((s) => s.key === score);
		if ((variable = "all"))
			abilities.forEach((ability) => (scoreA[ability] = value));
		else scoreA[variable] = value;
		if (reset) scoreA.points = scoreA.maxPoints;
		return nextScores;
	});
};
/**
 * Increments the requested variable of the requested score
 * @param {Function} setScores
 * @param {String} score
 * @param {String} variable
 * @returns {Boolean} Whether or not the variable was incremented
 */
export const IncrementAbility = (scores, setScores, score, variable) => {
	const nextScores = [...scores];
	const scoreA = nextScores.find((s) => s.key === score);
	let minPoints = scoreA[variable] < pointDoubleThreshold ? 1 : 2;
	if (
		(scoreA.max > -1 && scoreA[variable] >= scoreA.max) ||
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
export const DecrementAbility = (scores, setScores, score, variable) => {
	const nextScores = [...scores];
	const scoreA = nextScores.find((s) => s.key === score);
	let minPoints = scoreA[variable] <= pointDoubleThreshold ? 1 : 2;
	if (
		(scoreA.min > -1 && scoreA[variable] <= scoreA.min) ||
		// (scoreA.points > -1 && scoreA.points > scoreA.maxPoints - minPoints) ||
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
