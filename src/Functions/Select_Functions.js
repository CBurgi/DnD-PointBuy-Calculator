export function RaceSelect({ races, setSelectedRace, setSelectedSubrace }) {
	return (
		<select
			className="raceSelect"
			name="race"
			onChange={(e) =>
				races.map((race) => {
					if (race.name === e.target.value) {
						setSelectedRace({
							name: race.name,
							mod: race.mod,
                            min: (race.min ? race.min : 0),
                            max: (race.max ? race.max : -1),
                            points: (race.points ? race.points : -1),
                            maxPoints: (race.points ? race.points : -1),
                            blocked: race.blocked,
							str: race.str ? race.str : 0,
							dex: race.dex ? race.dex : 0,
							con: race.con ? race.con : 0,
							int: race.int ? race.int : 0,
							wis: race.wis ? race.wis : 0,
							cha: race.cha ? race.cha : 0,
							subraces: race.subraces ? race.subraces : false,
						});
                        setSelectedSubrace({
                            name: "No Subrace",
                            str: 0,
                            dex: 0,
                            con: 0,
                            int: 0,
                            wis: 0,
                            cha: 0,
                            dontInclude: race.subraces ? false : true,
                        });
					}
				})
			}
		>
			{races &&
				races.map((race) => <option key={race.name}>{race.name}</option>)}
		</select>
	);
}

export function SubRaceSelect({ selectedRace, setSelectedSubrace }) {
	if (selectedRace.subraces) {
		return (
			<select
            className="subraceSelect"
				name="subrace"
				onChange={(e) =>
					selectedRace.subraces.map((subrace) => {
						if (subrace.name === e.target.value) {
							setSelectedSubrace({
								name: subrace.name,
                                mod: subrace.mod,
                                min: (subrace.min ? subrace.min : 0),
                                max: (subrace.max ? subrace.max : -1),
                                points: (subrace.points ? subrace.points : -1),
                                maxPoints: (subrace.points ? subrace.points : -1),
                                blocked: subrace.blocked,
								str: subrace.str ? subrace.str : 0,
								dex: subrace.dex ? subrace.dex : 0,
								con: subrace.con ? subrace.con : 0,
								int: subrace.int ? subrace.int : 0,
								wis: subrace.wis ? subrace.wis : 0,
								cha: subrace.cha ? subrace.cha : 0,
							});
						}
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