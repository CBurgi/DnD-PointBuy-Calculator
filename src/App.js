import "./App.css";
import { useEffect, useState /*useEffect, useReducer*/ } from "react";
import commonRaces from ".//data/races/common";
import exoticRaces from ".//data/races/exotic";
import monstrousRaces from ".//data/races/monstrous";
import settingSpecificRaces from ".//data/races/setting_specific";
import { RaceSelect, SubRaceSelect } from "./Functions/Select_Functions";
import { GenerateTable } from "./Functions/Table_Functions";
import { getScore, setScore, setAbility, IncrementAbility, DecrementAbility } from "./Functions/Score_Functions";

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
export const tempScore = {
	dontInclude: true,
	name: "[temp]",
	mod: true,
	min: 0,
	max: -1,
	points: -1,
    maxPoints: -1,
	str: 7,
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
	// const [abilityScore, setAbilityScore] = useState(defaultAbilityScore);

	const races = commonRaces.concat(
		exoticRaces,
		monstrousRaces,
		settingSpecificRaces
	);
	races.unshift(defaultScore);
	races.push(customScore);

	// const [selectedRace, setSelectedRace] = useState(defaultScore);

	// const [selectedSubrace, setSelectedSubrace] = useState(defaultScore);

    const [scores, setScores] = useState([
        {...defaultScore, key: "ability"},
        {...defaultScore, key: "race"},
        {...defaultScore, key: "subrace"},
    ])

	const [totalScore, setTotalScore] = useState({
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0,
	});
	useEffect(() => {
		// setTotalScore({
		// 	str: selectedRace.str + selectedSubrace.str + abilityScore.str,
		// 	dex: selectedRace.dex + selectedSubrace.dex + abilityScore.dex,
		// 	con: selectedRace.con + selectedSubrace.con + abilityScore.con,
		// 	int: selectedRace.int + selectedSubrace.int + abilityScore.int,
		// 	wis: selectedRace.wis + selectedSubrace.wis + abilityScore.wis,
		// 	cha: selectedRace.cha + selectedSubrace.cha + abilityScore.cha,
		// });
        setTotalScore({})
        scores.map((score) => {
            setTotalScore({
                str: score.str,
                dex: score.dex,
                con: score.con,
                int: score.int,
                wis: score.wis,
                cha: score.cha,
            })
        })
	}, [scores]);

	return (
		<div className="App">
			<h1>D&D Ability Score Calculator</h1>
			{/* <RaceSelect
				races={races}
				setSelectedRace={setSelectedRace}
				setSelectedSubrace={setSelectedSubrace}
			/>
			<SubRaceSelect
				selectedRace={selectedRace}
				setSelectedSubrace={setSelectedSubrace}
			/>
			<GenerateTable
				abilityScore={abilityScore}
				setAbilityScore={setAbilityScore}
				selectedRace={selectedRace}
				setSelectedRace={setSelectedRace}
				selectedSubrace={selectedSubrace}
				setSelectedSubrace={setSelectedSubrace}
				totalScore={totalScore}
				setTotalScore={setTotalScore}
			/> */}
            <button onClick={() => setScore(scores, setScores, "race", tempScore)}>change temp</button><br/>
            <button onClick={() => setScore(scores, setScores, "race", defaultScore)}>change default</button><br/>
            <button onClick={() => IncrementAbility(scores, setScores, "race", "str")}>race.str ++</button>
            <button onClick={() => DecrementAbility(scores, setScores, "race", "str")}>race.str --</button>
            <button onClick={() => IncrementAbility(scores, setScores, "race", "dex")}>race.dex ++</button>
            <button onClick={() => DecrementAbility(scores, setScores, "race", "dex")}>race.dex --</button>
            <button onClick={() => setAbility(scores, setScores, "race", "all", 0, true)}>reset</button>

            <p>{getScore(scores, "race").name}: str = {getScore(scores, "race").str}, dex = {getScore(scores, "race").dex}, points = {getScore(scores, "race").points}</p>
		</div>
	);
}

export default App;
