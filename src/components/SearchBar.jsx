import React, { useState, useEffect, useRef } from "react"

const SearchBar = ({ data, setData, comments }) => {
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
		const value = event.target.value
		setFilterText(value)
	}

	return (
		<div>
			<label htmlFor="filterInput">Filter:</label>
			<input type="text" value={filterText} onChange={handleFilterChange} />
			<button onClick={() => setFilterText("")}>{"x"}</button>
		</div>
	)
}

export default SearchBar
