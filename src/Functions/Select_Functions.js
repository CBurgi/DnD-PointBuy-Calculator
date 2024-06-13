import { defaultScore, customScore, defaultASI } from "../data/defaultScores";
import { addScore, deleteScore, getScore, setScore } from "./Score_Functions";

export function RaceSelect({ races, setScores }) {
	return (
		<>
			<td key={"race-title"}>Race: </td>
			<td key={"race"}>
				<select
					className="raceSelect"
					name="race"
					onChange={(e) =>
						races.map((race) => {
							if (race.name === e.target.value) {
								if (race.subraces && !race.subracesSet) {
									race.subraces.unshift(defaultScore);
									race.subraces.push(customScore);
                                    race.subracesSet = true;
								}
								setScore(setScores, "race", race);
								setScore(setScores, "subrace", defaultScore);
							}
							return race;
						})
					}
				>
					{races &&
						races.map((race) => <option key={race.name}>{race.name}</option>)}
				</select>
			</td>
		</>
	);
}

export function SubraceSelect({ scores, setScores }) {
	const selectedRace = getScore(scores, "race");
	if (selectedRace.subraces) {
		return (
			<>
				<td>Subace: </td>
				<td>
					<select
						className="subraceSelect"
						name="subrace"
						onChange={(e) =>
							selectedRace.subraces.map((subrace) => {
								if (subrace.name === e.target.value) {
									setScore(setScores, "subrace", subrace);
								}
								return subrace;
							})
						}
					>
						{selectedRace.subraces &&
							selectedRace.subraces.map((subrace) => (
								<option key={subrace.name}>{subrace.name}</option>
							))}
					</select>
				</td>
			</>
		);
	}
	return;
}

export function ClassSelect({ aClasses, setScores, level }) {
	return (
		<>
			<td>Class :</td>
			<td>
				<select
					className="classSelect"
					name="class"
					onChange={(e) => {
						deleteScore(setScores, "asi");
						aClasses.map((aClass) => {
							if (aClass.name === e.target.value) {
								aClass.asi.map((asiLevel) => {
									const newASI = {
										...defaultASI,
										name: defaultASI.name + asiLevel,
										key: "asi" + asiLevel,
                                        level: asiLevel,
										scoreName: "Ability Score Increase",
									};
									addScore(setScores, newASI);
                                    return asiLevel;
								});
							}
                            showASI(setScores, level)
							return aClass;
						});
					}}
				>
					{aClasses &&
						aClasses.map((aClass) => (
							<option key={aClass.name}>{aClass.name}</option>
						))}
				</select>
			</td>
		</>
	);
}

const showASI = (setScores, level) => {
    setScores((scores) => {
		const nextScores = [...scores];
        nextScores.map((nextScore) => {
            if(nextScore.level){
                nextScore.dontInclude = nextScore.level <= level ? false : true
            }
            return nextScore
        })
		return nextScores;
	});
}

export function LevelSelect({ level, setLevel, setScores }) {
    const levels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
	return (
		<>
			<td>Level :</td>
			<td>
				<select
                    value={20}
					className="levelSelect"
					name="level"
					onChange={(e) => {
						setLevel((l) => e.target.value)
                        showASI(setScores, e.target.value)
					}}
				>
					{levels.map((l) => {return <option value={l} key={l}>Level {l}</option>})}
				</select>
			</td>
		</>
	);
}
