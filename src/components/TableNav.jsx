import React from "react"

const TableNav = ({ handlePageChange, currentPage, totalPages }) => {
	return (
		<nav>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</button>
			<span>
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</nav>
	)
}

export default TableNav
