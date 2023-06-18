import React from "react"
import SearchBar from "./SearchBar"
import TableNav from "./TableNav"

const Header = ({
	data,
	setData,
	comments,
	setItemsPerPage,
	handlePageChange,
	currentPage,
	totalPages,
}) => {
	return (
		<div>
			<h1>Comments</h1>
			<a href="https://app.ylytic.com/ylytic/test">source</a>
			<SearchBar data={data} setData={setData} comments={comments} />
			<div>
				<p>{data.length} records</p>
			</div>
			<select onChange={(e) => setItemsPerPage(e.target.value)}>
				<option value="25">25 per page</option>
				<option value="50">50 per page</option>
				<option value="100">100 per page</option>
			</select>
			<TableNav
				handlePageChange={handlePageChange}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	)
}

export default Header
