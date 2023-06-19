import React, { useEffect, useState } from "react"
import TableNav from "./TableNav"
import ColumnHeading from "./ColumnHeading"

const defaultDirection = {
	at: 0,
	author: 0,
	like: 0,
	reply: 0,
	text: 0,
}

const Table = ({
	data,
	setData,
	handlePageChange,
	currentPage,
	totalPages,
	currentItems,
}) => {
	const [previousData, setPreviousData] = useState(null)
	console.log(data)
	const [direction, setDirection] = useState(defaultDirection)

	const handleAtClick = () => {
		setDirection({
			...defaultDirection,
			at: direction.at === 1 ? -1 : 1,
		})
		const newData = data.sort((a, b) => {
			const aDate = new Date(a.at)
			const bDate = new Date(b.at)
			return direction.at === 1 ? aDate - bDate : bDate - aDate
		})
		setData([...newData])
	}
	const handleAuthorClick = () => {
		setDirection({
			...defaultDirection,
			author: direction.author === 1 ? -1 : 1,
		})
		const newData = data.sort((a, b) => {
			const aAuthor = a.author.toLowerCase()
			const bAuthor = b.author.toLowerCase()
			if (aAuthor < bAuthor) {
				return direction.author === -1 ? 1 : -1
			}
			if (aAuthor > bAuthor) {
				return direction.author === 1 ? 1 : -1
			}
		})
		setData([...newData])
	}
	const handleLikeClick = () => {
		setDirection({
			...defaultDirection,
			like: direction.like === 1 ? -1 : 1,
		})
		const newData = data.sort((a, b) => {
			return direction.like === 1 ? b.like - a.like : a.like - b.like
		})
		setData([...newData])
	}

	const handleReplyClick = () => {
		setDirection({
			...defaultDirection,
			reply: direction.reply === 1 ? -1 : 1,
		})
		const newData = data.sort((a, b) => {
			return direction.reply === 1 ? b.reply - a.reply : a.reply - b.reply
		})
		setData([...newData])
	}

	const handleTextClick = () => {
		setDirection({
			...defaultDirection,
			text: direction.text === 1 ? -1 : 1,
		})
		const newData = data.sort((a, b) => {
			const aText = a.text.toLowerCase()
			const bText = b.text.toLowerCase()
			if (aText < bText) {
				return direction.text === -1 ? 1 : -1
			}
			if (aText > bText) {
				return direction.text === 1 ? 1 : -1
			}
			return 0
		})
		setData([...newData])
	}

	const handleAuthorFilter = (author) => () => {
		setPreviousData(data)
		const newData = data.filter((item) => item.author === author)
		setData([...newData])
	}

	const removeAuthorFilter = () => {
		if (previousData) {
			setData(previousData)
			setPreviousData(null)
		}
	}

	return (
		<div>
			<div>
				{previousData && (
					<div className="speacial-filter-button">
						<div>
							<button onClick={removeAuthorFilter}>x </button>
							Author
						</div>
						{data[0].author}
					</div>
				)}
			</div>
			<div>
				{data.length < 1 ? (
					<div>No comments match your filter</div>
				) : (
					<table>
						<thead>
							<tr className="table-headers">
								<ColumnHeading
									handleSort={handleAtClick}
									label="At"
									sortOrder={direction.at}
								/>
								<ColumnHeading
									handleSort={handleAuthorClick}
									label="Author"
									sortOrder={direction.author}
								/>
								<ColumnHeading
									handleSort={handleLikeClick}
									label="Like"
									sortOrder={direction.like}
								/>
								<ColumnHeading
									handleSort={handleReplyClick}
									label="Reply"
									sortOrder={direction.reply}
								/>
								<ColumnHeading
									handleSort={handleTextClick}
									label="Text"
									sortOrder={direction.text}
								/>
							</tr>
						</thead>
						<tbody>
							{currentItems.map(({ at, author, like, reply, text }) => {
								return (
									<tr key={at}>
										<td>{at}</td>
										<td>
											<button
												className="speacial-filter"
												onClick={handleAuthorFilter(author)}
											>
												{author}
											</button>
										</td>
										<td>{like}</td>
										<td>{reply}</td>
										<td>{text}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				)}
			</div>
			<div className="footer-nav">
				<TableNav
					handlePageChange={handlePageChange}
					currentPage={currentPage}
					totalPages={totalPages}
				/>
			</div>
		</div>
	)
}

export default Table
