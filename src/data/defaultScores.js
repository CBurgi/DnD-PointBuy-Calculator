export const abilities = ["str", "dex", "con", "int", "wis", "cha"];

export const blankScore = {
	str: 0,
	dex: 0,
	con: 0,
	int: 0,
	wis: 0,
	cha: 0,
};

export const defaultAbilityScore = {
	mod: true,
	min: 8,
	max: 15,
	points: 27,
	maxPoints: 27,
	str: 8,
	dex: 8,
	con: 8,
	int: 8,
	wis: 8,
	cha: 8,
};

export const defaultScore = {
	dontInclude: true,
	name: "[select]",
	mod: false,
	min: 0,
	max: -1,
	points: -1,
	maxPoints: -1,
	...blankScore,
};

export const defaultASI = {
	name: "Level ",
	mod: true,
	min: 0,
	max: 2,
	points: 2,
	...blankScore,
};

export const customScore = {
	name: "Custom",
	mod: true,
	min: -1,
	max: -1,
	points: -1,
	maxPoints: -1,
};