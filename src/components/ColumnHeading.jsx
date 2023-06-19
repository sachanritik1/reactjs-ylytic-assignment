import React from "react"

const ColumnHeading = ({ label, sortOrder, handleSort }) => {
	const arrowIcon = sortOrder === 0 ? "▲▼" : sortOrder === 1 ? "▲" : "▼"

	return (
		<th className="sort-by" onClick={handleSort}>
			{label}
			{arrowIcon}
		</th>
	)
}

export default ColumnHeading
