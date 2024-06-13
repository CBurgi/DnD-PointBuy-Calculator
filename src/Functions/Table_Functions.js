/*
    Classes:
        scores-table: borders 
        table-head: head row colouring & font
        table-body: cell height
        table-odd-row: odd row colouring
        table-even-row: even row colouring
        ud-button: increment/decrement buttons

*/

import {
	getScore,
	IncrementAbility,
	DecrementAbility,
	CalculatePointCost,
	setScore,
} from "./Score_Functions";
import { abilities } from "../data/defaultScores";
import React from "react";

export function GenerateTable({ scores, setScores, totalScore }) {
	const headColumnWidth = "20%";
	const columnWidth = "10%";

	return (
		<table className="scores-table" style={{ width: "80%" }}>
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
				<GenerateRows
					scores={scores}
					setScores={setScores}
				/>
				<GenerateTotalRow totalScore={totalScore} />
			</tbody>
		</table>
	);
}

function GeneratePointbuyRow({ scores, setScores }) {
    const row = getScore(scores, "ability")
	return (
		<>
			<tr className="table-odd-row">
				<td>{row.scoreName}</td>
				<RenderCells scores={scores} setScores={setScores} score={"ability"} />
			</tr>
			<tr className="even-row">
				<td>Point Cost</td>
				{abilities.map((ability) => {
					return (
						<td key={ability}>
							<CalculatePointCost
								score={row[ability]}
							/>
						</td>
					);
				})}
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
					return (
						<td key={ability}>{Math.floor((totalScore[ability] - 10) / 2)}</td>
					);
				})}
			</tr>
		</>
	);
}

function GenerateRows({ leadRow = "+", scores, setScores }) {
    return scores.map((row) => {
        if (row.dontInclude || row.key === "ability") return <React.Fragment key={row.key}/>;
    
        return (
            <React.Fragment key={row.key}>
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
                        {row.scoreName}
                        <br />
                        {row.name ? "( " + row.name + " )" : ""}
                        <br />
                    </td>
                    <RenderCells scores={scores} setScores={setScores} score={row.key} />
                </tr>
            </React.Fragment>
        );
    })
}

function RenderCells({ scores, setScores, score }) {
	const row = getScore(scores, score);
	return (
		<>
			{abilities.map((ability) => {
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
																IncrementAbility(
																	scores,
																	setScores,
																	score,
																	ability
																);
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
																DecrementAbility(
																	scores,
																	setScores,
																	score,
																	ability
																);
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
			})}
			{row.mod ? (
				<td>
					<table>
						<tbody>
							<tr>
								<td>
									{row.points}/{row.maxPoints} Points Left
								</td>
							</tr>
							<tr>
								<td>
									<button
										onClick={() => {
											// setAbility(setScores, "ability", "all", 8, true);
											const baseScore = { ...row.base };
											setScore(setScores, row.key, baseScore);
										}}
									>
										Reset
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			) : (
				<></>
			)}
		</>
	);
}
