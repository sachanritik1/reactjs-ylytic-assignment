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
	setCurrentPage,
}) => {
	return (
		<div className="header">
			<h1 className="title">Comments</h1>
			<a className="source" href="https://app.ylytic.com/ylytic/test">
				Source
			</a>
			<div className="search-record-page">
				<SearchBar
					data={data}
					setData={setData}
					comments={comments}
					setCurrentPage={setCurrentPage}
				/>

				<p className="records">{data.length} records</p>
				<div className="page-dropdown">
					<select
						onChange={(e) => {
							setItemsPerPage(e.target.value)
							setCurrentPage(1)
						}}
					>
						<option value="25">25 per page</option>
						<option value="50">50 per page</option>
						<option value="100">100 per page</option>
					</select>
				</div>
			</div>
			<div className="header-nav">
				<TableNav
					handlePageChange={handlePageChange}
					currentPage={currentPage}
					totalPages={totalPages}
				/>
			</div>
		</div>
	)
}

export default Header
