const pointDoubleThreshold = 13;

export const IncrementScore = (modifier, setter, score) => {
	let min = 0;
	switch (score) {
		case "str":
			min = modifier.str < pointDoubleThreshold ? 1 : 2;
			if ((modifier.points > -1 && modifier.points < min)) return;
            if (modifier.points > -1 ) modifier.points -= min;
			setter({ ...modifier, str: modifier.str + 1 });
			return;
		case "dex":
			min = modifier.dex < pointDoubleThreshold ? 1 : 2;
			if (modifier.points > -1 && modifier.points < min) return;
            if (modifier.points > -1 ) modifier.points -= min;
			setter({ ...modifier, dex: modifier.dex + 1 });
			return;
		case "con":
			min = modifier.con < pointDoubleThreshold ? 1 : 2;
			if (modifier.points > -1 && modifier.points < min) return;
            if (modifier.points > -1 ) modifier.points -= min;
			setter({ ...modifier, con: modifier.con + 1 });
			return;
		case "int":
			min = modifier.int < pointDoubleThreshold ? 1 : 2;
			if (modifier.points > -1 && modifier.points < min) return;
            if (modifier.points > -1 ) modifier.points -= min;
			setter({ ...modifier, int: modifier.int + 1 });
			return;
		case "wis":
			min = modifier.wis < pointDoubleThreshold ? 1 : 2;
			if (modifier.points > -1 && modifier.points < min) return;
            if (modifier.points > -1 ) modifier.points -= min;
			setter({ ...modifier, wis: modifier.wis + 1 });
			return;
		case "cha":
			min = modifier.cha < pointDoubleThreshold ? 1 : 2;
			if (modifier.points > -1 && modifier.points < min) return;
            if (modifier.points > -1 ) modifier.points -= min;
			setter({ ...modifier, cha: modifier.cha + 1 });
			return;
		default:
			return;
	}
};
export const DecrementScore = (modifier, setter, score) => {
	switch (score) {
		case "str":
            if (modifier.points > -1 ) modifier.points += modifier.str <= pointDoubleThreshold ? 1 : 2;
			setter({ ...modifier, str: modifier.str - 1 });
			return;
            case "dex":
            if (modifier.points > -1 ) modifier.points += modifier.dex <= pointDoubleThreshold ? 1 : 2;
			setter({ ...modifier, dex: modifier.dex - 1 });
			return;
            case "con":
            if (modifier.points > -1 ) modifier.points += modifier.con <= pointDoubleThreshold ? 1 : 2;
			setter({ ...modifier, con: modifier.con - 1 });
			return;
            case "int":
            if (modifier.points > -1 ) modifier.points += modifier.int <= pointDoubleThreshold ? 1 : 2;
			setter({ ...modifier, int: modifier.int - 1 });
			return;
            case "wis":
            if (modifier.points > -1 ) modifier.points += modifier.wis <= pointDoubleThreshold ? 1 : 2;
			setter({ ...modifier, wis: modifier.wis - 1 });
			return;
            case "cha":
            if (modifier.points > -1 ) modifier.points += modifier.cha <= pointDoubleThreshold ? 1 : 2;
			setter({ ...modifier, cha: modifier.cha - 1 });
			return;
		default:
			return;
	}
};

export const ResetScore = (modifier, setter, resetVal) => {
    setter({
        ...modifier,
        points: modifier.points > -1 ? modifier.maxPoints : -1,
        str: resetVal,
        dex: resetVal,
        con: resetVal,
        int: resetVal,
        wis: resetVal,
        cha: resetVal,
    })
};

export function CalculatePointCost({score}){
    let cost = 0;
    for(let i = score; i > 8; i--){
        cost += (i <= pointDoubleThreshold ? 1 : 2);
    }
    return cost;
}