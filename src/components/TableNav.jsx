import React from "react"

const TableNav = ({ handlePageChange, currentPage, totalPages }) => {
	const pageArray = Array.from({ length: totalPages }, (_, index) => index + 1)
	return (
		<nav>
			<button
				onClick={() => handlePageChange(1)}
				disabled={totalPages < 1 || currentPage === 1}
			>
				First
			</button>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1 || totalPages < 1}
			>
				{"<<"}
			</button>
			{pageArray.map((page) => {
				return (
					<button
						key={page}
						onClick={() => handlePageChange(page)}
						disabled={page === currentPage}
					>
						{page}
					</button>
				)
			})}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages || totalPages < 1}
			>
				{">>"}
			</button>
			<button
				onClick={() => handlePageChange(totalPages)}
				disabled={totalPages < 1 || currentPage === totalPages}
			>
				Last
			</button>
		</nav>
	)
}

export default TableNav
