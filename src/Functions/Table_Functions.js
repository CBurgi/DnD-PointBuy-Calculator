/*
    Classes:
        table: borders 
        table-head: head row colouring & font
        table-body: cell height
        table-odd-row: odd row colouring
        table-even-row: even row colouring
        ud-button: increment/decrement buttons

*/

import {
	IncrementScore,
	DecrementScore,
	// ResetScore,
	CalculatePointCost,
} from "./Mod_Functions";

export function GenerateTable({
	abilityScore,
	setAbilityScore,
	selectedRace,
	setSelectedRace,
	selectedSubrace,
	setSelectedSubrace,
	totalScore,
	setTotalScore,
}) {
	const headColumnWidth = "20%";
	const columnWidth = "10%";

	return (
		<table className="table" style={{ width: "80%" }}>
			<thead>
				<tr className="table-head">
					<th style={{ width: headColumnWidth }}>Attribute</th>
					<th style={{ width: columnWidth }}>STR</th>
					<th style={{ width: columnWidth }}>DEX</th>
					<th style={{ width: columnWidth }}>CON</th>
					<th style={{ width: columnWidth }}>INT</th>
					<th style={{ width: columnWidth }}>WIS</th>
					<th style={{ width: columnWidth }}>CHA</th>
					<th style={{ width: headColumnWidth }}></th>
				</tr>
			</thead>
			<tbody className="table-body">
				<GenerateScoreRow
					abilityScore={abilityScore}
					setAbilityScore={setAbilityScore}
				/>
				<GenerateRow
					leadRow="+"
					mainRow={selectedRace}
					mainRowName={"Race Bonus"}
					setter={setSelectedRace}
				/>
				<GenerateRow
					leadRow="+"
					mainRow={selectedSubrace}
					mainRowName={"Subrace Bonus"}
					setter={setSelectedSubrace}
				/>
				<GenerateRow
					leadRow="="
					mainRow={totalScore}
					mainRowName={"Total Score"}
					setter={setTotalScore}
				/>
				<GenerateModifierRow totalScore={totalScore} />
			</tbody>
		</table>
	);
}

function GenerateScoreRow({ abilityScore, setAbilityScore }) {
	return (
		<>
			<tr className="table-odd-row">
				<td>Ability Score</td>
				<RenderCells row={abilityScore} setter={setAbilityScore} />
				<td>
					<button
						onClick={() => {
							// ResetScore(abilityScore, setAbilityScore, 8);
						}}
					>
						Reset Scores
					</button>
				</td>
			</tr>
			<tr className="even-row">
				<td>Point Cost</td>
				<td>
					<CalculatePointCost score={abilityScore.str} />
				</td>
				<td>
					<CalculatePointCost score={abilityScore.dex} />
				</td>
				<td>
					<CalculatePointCost score={abilityScore.con} />
				</td>
				<td>
					<CalculatePointCost score={abilityScore.int} />
				</td>
				<td>
					<CalculatePointCost score={abilityScore.wis} />
				</td>
				<td>
					<CalculatePointCost score={abilityScore.cha} />
				</td>
				<td>
					{abilityScore.points}/{abilityScore.maxPoints} Points Left
				</td>
			</tr>
		</>
	);
}

function GenerateModifierRow({ totalScore }) {
	return (
		<>
			<tr className="table-odd-row">
				<td>Ability Modifier</td>
				<td>{Math.floor((totalScore.str - 10) / 2)}</td>
				<td>{Math.floor((totalScore.dex - 10) / 2)}</td>
				<td>{Math.floor((totalScore.con - 10) / 2)}</td>
				<td>{Math.floor((totalScore.int - 10) / 2)}</td>
				<td>{Math.floor((totalScore.wis - 10) / 2)}</td>
				<td>{Math.floor((totalScore.cha - 10) / 2)}</td>
			</tr>
		</>
	);
}

function GenerateRow({ leadRow, mainRow, mainRowName, setter }) {
	if (mainRow.dontInclude) {
		return;
	}

	return (
		<>
			<tr className="table-odd-row">
				<td></td>
				<td>{leadRow}</td>
				<td>{leadRow}</td>
				<td>{leadRow}</td>
				<td>{leadRow}</td>
				<td>{leadRow}</td>
				<td>{leadRow}</td>
			</tr>
			<tr className="table-even-row">
				<td>
					{mainRowName}
					<br />
					{mainRow.name ? "( " + mainRow.name + " )" : ""}
					<br />
				</td>
				<RenderCells row={mainRow} setter={setter} />
			</tr>
		</>
	);
}

function RenderCells({ row, setter }) {
	const cells = [
		{ score: "str", value: row.str },
		{ score: "dex", value: row.dex },
		{ score: "con", value: row.con },
		{ score: "int", value: row.int },
		{ score: "wis", value: row.wis },
		{ score: "cha", value: row.cha },
	];
	return cells.map((cell) => {
		if (!row.mod || (row.blocked && row.blocked.includes(cell.score))) {
			return <td key={cell.score}>{cell.value ? cell.value : 0}</td>;
		}
		return (
			<td key={cell.score}>
				<table>
                    <tbody>
					<tr>
						<td />
						<td>{cell.value ? cell.value : 0}</td>
						<td className="ud-button">
							<button
								onClick={() => {
									if (row.max < 0 || cell.value < row.max) {
										IncrementScore(row, setter, cell.score);
									}
								}}
							>
								▲
							</button>
							<button
								onClick={() => {
									if (row.min < 0 || cell.value > row.min) {
										DecrementScore(row, setter, cell.score);
									}
								}}
							>
								▼
							</button>
						</td>
					</tr>
                    </tbody>
				</table>
			</td>
		);
	});
}
