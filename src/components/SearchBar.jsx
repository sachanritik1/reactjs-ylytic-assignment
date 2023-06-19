import React, { useState, useEffect, useRef } from "react"

const SearchBar = ({ data, setData, comments, setCurrentPage }) => {
	const [filterText, setFilterText] = useState("")
	const previousData = useRef(null)

	useEffect(() => {
		if (filterText === "") {
			if (previousData.current) {
				setData(comments)
				previousData.current = null
			}
		} else {
			const filtered = comments.filter(
				(item) =>
					item.author.toLowerCase().includes(filterText.toLowerCase()) ||
					item.text.toLowerCase().includes(filterText.toLowerCase())
			)
			setData(filtered)
			previousData.current = data
		}
	}, [filterText])

	const handleFilterChange = (event) => {
		setCurrentPage(1)
		const value = event.target.value
		setFilterText(value)
	}

	return (
		<div className="searchBar">
			<div className="container">
				<input
					type="text"
					value={filterText}
					onChange={handleFilterChange}
					placeholder="Filter"
				/>
				<button onClick={() => setFilterText("")}>{"x"}</button>
			</div>
		</div>
	)
}

export default SearchBar
