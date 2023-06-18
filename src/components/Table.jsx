import React, { useEffect, useState } from "react"
import TableNav from "./TableNav"

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
					<button onClick={removeAuthorFilter}>Remove Filter</button>
				)}
			</div>
			<div>
				{data.length < 1 ? (
					<div>No comments match your filter</div>
				) : (
					<table>
						<thead>
							<tr>
								<th onClick={handleAtClick}>
									At
									{direction.at === 0 ? (
										<span>
											<span>&#x25B2;</span> <span>&#x25BC;</span>
										</span>
									) : direction.at === 1 ? (
										<span>&#x25B2;</span>
									) : (
										<span>&#x25BC;</span>
									)}
								</th>
								<th onClick={handleAuthorClick}>
									Author
									{direction.author === 0 ? (
										<span>
											<span>&#x25B2;</span> <span>&#x25BC;</span>
										</span>
									) : direction.author === 1 ? (
										<span>&#x25B2;</span>
									) : (
										<span>&#x25BC;</span>
									)}
								</th>
								<th onClick={handleLikeClick}>
									Like
									{direction.like === 0 ? (
										<span>
											<span>&#x25B2;</span> <span>&#x25BC;</span>
										</span>
									) : direction.like === 1 ? (
										<span>&#x25B2;</span>
									) : (
										<span>&#x25BC;</span>
									)}
								</th>
								<th onClick={handleReplyClick}>
									Reply
									{direction.reply === 0 ? (
										<span>
											<span>&#x25B2;</span> <span>&#x25BC;</span>
										</span>
									) : direction.reply === 1 ? (
										<span>&#x25B2;</span>
									) : (
										<span>&#x25BC;</span>
									)}
								</th>
								<th onClick={handleTextClick}>
									Text
									{direction.text === 0 ? (
										<span>
											<span>&#x25B2;</span> <span>&#x25BC;</span>
										</span>
									) : direction.text === 1 ? (
										<span>&#x25B2;</span>
									) : (
										<span>&#x25BC;</span>
									)}
								</th>
							</tr>
						</thead>
						<tbody>
							{currentItems.map(({ at, author, like, reply, text }) => {
								return (
									<tr key={at}>
										<td>{at}</td>
										<td onClick={handleAuthorFilter(author)}>{author}</td>
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
			<TableNav
				handlePageChange={handlePageChange}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	)
}

export default Table
