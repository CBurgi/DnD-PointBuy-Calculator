import "./App.css";
import { useEffect, useState /*useEffect, useReducer*/ } from "react";
import commonRaces from ".//data/races/common";
import exoticRaces from ".//data/races/exotic";
import monstrousRaces from ".//data/races/monstrous";
import settingSpecificRaces from ".//data/races/setting_specific";
import classes from ".//data/classes.json";
import {
	ClassSelect,
	RaceSelect,
	SubraceSelect,
    LevelSelect
} from "./Functions/Select_Functions";
import { GenerateTable } from "./Functions/Table_Functions";
import { defaultScore, defaultAbilityScore, customScore, blankScore } from "./data/defaultScores";

function App() {
	const races = commonRaces.concat(
		exoticRaces,
		monstrousRaces,
		settingSpecificRaces
	);
	races.unshift(defaultScore);
	races.push(customScore);

	const aClasses = classes;
    const [level, setLevel] = useState(20)

	const [scores, setScores] = useState([
		{
			...defaultAbilityScore,
			key: "ability",
			scoreName: "Ability Score",
			base: defaultAbilityScore,
		},
		{
			...defaultScore,
			key: "race",
			scoreName: "Race Bonus",
			base: defaultScore,
		},
		{
			...defaultScore,
			key: "subrace",
			scoreName: "Subrace Bonus",
			base: defaultScore,
		},
	]);

	const [totalScore, setTotalScore] = useState(blankScore);
	useEffect(() => {
		setTotalScore((s) => blankScore);
		scores.map((score) => {
			setTotalScore((s) => {
				return {
					str: s.str + score.str,
					dex: s.dex + score.dex,
					con: s.con + score.con,
					int: s.int + score.int,
					wis: s.wis + score.wis,
					cha: s.cha + score.cha,
				};
			});
			return score;
		});
	}, [scores]);

	return (
		<div className="App">
			<h1>D&D Ability Score Calculator</h1>
			<table className="select-table" style={{ margin:"auto"}}>
                <thead>
                    <tr>
                    <td style={{ width: "20%" }}/>
                    <td style={{ width: "30%" }}/>
                    <td style={{ width: "20%" }}/>
                    <td style={{ width: "30%" }}/>
                    </tr>
                </thead>
				<tbody>
					<tr>
						<RaceSelect races={races} setScores={setScores} />
						<SubraceSelect scores={scores} setScores={setScores} />
					</tr>
					<tr>
						<ClassSelect aClasses={aClasses} setScores={setScores} level={level} setLevel={setLevel} />
                        <LevelSelect level={level} setLevel={setLevel} setScores={setScores} />
					</tr>
				</tbody>
			</table>
			<GenerateTable
				scores={scores}
				setScores={setScores}
				totalScore={totalScore}
			/>
		</div>
	);
}

export default App;
