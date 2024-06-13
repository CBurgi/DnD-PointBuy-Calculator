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
	getScore,
	setAbility,
	IncrementAbility,
	DecrementAbility,
	CalculatePointCost,
} from "./Score_Functions";
import { abilities } from "../App";

export function GenerateTable({ scores, setScores, totalScore }) {
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
				<GeneratePointbuyRow scores={scores} setScores={setScores} />
				<GenerateRow
					scoreName={"Race Bonus"}
					score={"race"}
					scores={scores}
					setScores={setScores}
				/>
				<GenerateRow
					scoreName={"Subrace Bonus"}
					score={"subrace"}
					scores={scores}
					setScores={setScores}
				/>
				{/* <GenerateRow
					leadRow="="
                    scoreName={"Total Score"}
                    score={"total"}
                    scores={scores}
					setScores={setScores}
				/> */}
				<GenerateTotalRow totalScore={totalScore} />
			</tbody>
		</table>
	);
}

function GeneratePointbuyRow({ scores, setScores }) {
	return (
		<>
			<tr className="table-odd-row">
				<td>Ability Score</td>
				<RenderCells scores={scores} setScores={setScores} score={"ability"} />
				<td>
					<button
						onClick={() => {
							setAbility(setScores, "ability", "all", 8, true);
						}}
					>
						Reset Scores
					</button>
				</td>
			</tr>
			<tr className="even-row">
				<td>Point Cost</td>
				{abilities.map((ability) => {
					return (
						<td key={ability}>
							<CalculatePointCost
								score={getScore(scores, "ability")[ability]}
							/>
						</td>
					);
				})}
				<td>
					{getScore(scores, "ability").points}/
					{getScore(scores, "ability").maxPoints} Points Left
				</td>
			</tr>
		</>
	);
}

function GenerateTotalRow({ totalScore }) {
	return (
		<>
			<tr className="table-odd-row">
				<td></td>
				{abilities.map((ability) => {
					return <td key={ability}>=</td>;
				})}
			</tr>
			<tr className="table-even-row">
				<td>Total Score</td>
				{abilities.map((ability) => {
					return <td key={ability}>{totalScore[ability]}</td>;
				})}
			</tr>
			<tr className="table-odd-row">
				<td>Ability Modifier</td>
				{abilities.map((ability) => {
					return <td key={ability}>{Math.floor((totalScore[ability] - 10) / 2)}</td>
				})}
			</tr>
		</>
	);
}

function GenerateRow({ leadRow = "+", scoreName, score, scores, setScores }) {
	const row = getScore(scores, score);
	if (row.dontInclude) return;

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
					{scoreName}
					<br />
					{row.name ? "( " + row.name + " )" : ""}
					<br />
				</td>
				<RenderCells scores={scores} setScores={setScores} score={score} />
			</tr>
		</>
	);
}

function RenderCells({ scores, setScores, score }) {
	const row = getScore(scores, score);
	return abilities.map((ability) => {
		if (!row.mod || (row.blocked && row.blocked.includes(ability))) {
			return <td key={ability}>{row[ability]}</td>;
		}
		return (
			<td key={ability}>
				<table>
					<tbody>
						<tr>
							<td />
							<td>{row[ability]}</td>
							<td className="ud-button">
								<table>
									<tbody>
										<tr>
											<td>
												<button
													onClick={() => {
														IncrementAbility(scores, setScores, score, ability);
													}}
												>
													▲
												</button>
											</td>
										</tr>
										<tr>
											<td>
												<button
													onClick={() => {
														DecrementAbility(scores, setScores, score, ability);
													}}
												>
													▼
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		);
	});
}
