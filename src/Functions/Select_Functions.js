import { defaultScore, customScore } from "../App";
import { getScore, setScore } from "./Score_Functions";

export function RaceSelect({ races, setScores }) {
	return (
		<select
			className="raceSelect"
			name="race"
			onChange={(e) =>
				races.map((race) => {
					if (race.name === e.target.value) {
                        if(race.subraces){
                            race.subraces.unshift(defaultScore);
	                        race.subraces.push(customScore);
                        }
                        setScore(setScores, "race", race)
                        setScore(setScores, "subrace", defaultScore)
					}
                    return race
				})
			}
		>
			{races &&
				races.map((race) => <option key={race.name}>{race.name}</option>)}
		</select>
	);
}

export function SubRaceSelect({ scores, setScores }) {
    const selectedRace = getScore(scores, "race")
	if (selectedRace.subraces) {
		return (
			<select
            className="subraceSelect"
				name="subrace"
				onChange={(e) =>
					selectedRace.subraces.map((subrace) => {
						if (subrace.name === e.target.value) {
                            setScore(setScores, "subrace", subrace)
						}
                        return subrace
					})
				}
			>
				{selectedRace.subraces &&
					selectedRace.subraces.map((subrace) => (
						<option key={subrace.name}>{subrace.name}</option>
					))}
			</select>
		);
	}
	return;
}