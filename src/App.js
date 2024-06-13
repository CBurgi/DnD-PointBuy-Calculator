import "./App.css";
import { useEffect, useState /*useEffect, useReducer*/ } from "react";
import commonRaces from ".//data/races/common";
import exoticRaces from ".//data/races/exotic";
import monstrousRaces from ".//data/races/monstrous";
import settingSpecificRaces from ".//data/races/setting_specific";
import { RaceSelect, SubRaceSelect } from "./Functions/Select_Functions";
import { GenerateTable } from "./Functions/Table_Functions";

export const abilities = ["str", "dex", "con", "int", "wis", "cha"];

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
	str: 0,
	dex: 0,
	con: 0,
	int: 0,
	wis: 0,
	cha: 0,
};
export const blankScore = {
	str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
};

export const customScore = {
	name: "Custom",
	mod: true,
	min: -1,
	max: -1,
	points: -1,
    maxPoints: -1,
};

function App() {

	const races = commonRaces.concat(
		exoticRaces,
		monstrousRaces,
		settingSpecificRaces
	);
	races.unshift(defaultScore);
	races.push(customScore);

    const [scores, setScores] = useState([
        {...defaultAbilityScore, key: "ability"},
        {...defaultScore, key: "race"},
        {...defaultScore, key: "subrace"},
        {...blankScore, key: "total"}
    ])

	const [totalScore, setTotalScore] = useState(blankScore);
	useEffect(() => {
        setTotalScore((s) => blankScore)
        scores.map((score) => {
            setTotalScore((s) =>{ return {
                str: s.str + score.str,
                dex: s.dex + score.dex,
                con: s.con + score.con,
                int: s.int + score.int,
                wis: s.wis + score.wis,
                cha: s.cha + score.cha,
        }})
        return score
        })
	}, [scores]);

	return (
		<div className="App">
			<h1>D&D Ability Score Calculator</h1>
			<RaceSelect
				races={races}
                setScores={setScores}
			/>
			<SubRaceSelect
				scores={scores}
                setScores={setScores}
			/>
			<GenerateTable
				scores={scores}
                setScores={setScores}
                totalScore={totalScore}
			/>
		</div>
	);
}

export default App;
