import React, { useState } from "react"
import TableNav from "./TableNav"

const Table = ({ data, setData, itemsPerPage }) => {
	const [direction, setDirection] = useState({
		at: true,
		author: true,
		like: true,
		reply: true,
		text: true,
	})

	const handleAtClick = () => {
		setDirection({ ...direction, at: !direction.at })
		const newData = data.sort((a, b) => {
			const aDate = new Date(a.at)
			const bDate = new Date(b.at)
			return direction.at ? aDate - bDate : bDate - aDate
		})
		setData([...newData])
	}
	const handleAuthorClick = () => {
		setDirection({ ...direction, author: !direction.author })
		const newData = data.sort((a, b) => {
			const aAuthor = a.author.toLowerCase()
			const bAuthor = b.author.toLowerCase()
			if (aAuthor < bAuthor) {
				return direction.author ? -1 : 1
			}
			if (aAuthor > bAuthor) {
				return direction.author ? 1 : -1
			}
			return 0
		})
		setData([...newData])
	}
	const handleLikeClick = () => {
		setDirection({ ...direction, like: !direction.like })
		const newData = data.sort((a, b) => {
			return direction.like ? b.like - a.like : a.like - b.like
		})
		setData([...newData])
	}

	const handleReplyClick = () => {
		setDirection({ ...direction, reply: !direction.reply })
		const newData = data.sort((a, b) => {
			return direction.reply ? b.reply - a.reply : a.reply - b.reply
		})
		setData([...newData])
	}

	const handleTextClick = () => {
		setDirection({ ...direction, text: !direction.text })
		const newData = data.sort((a, b) => {
			const aText = a.text.toLowerCase()
			const bText = b.text.toLowerCase()
			if (aText < bText) {
				return direction.text ? -1 : 1
			}
			if (aText > bText) {
				return direction.text ? 1 : -1
			}
			return 0
		})
		setData([...newData])
	}

	const handleAuthorFilter = (author) => () => {
		const newData = data.filter((item) => item.author === author)
		setData([...newData])
	}

	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(data.length / itemsPerPage)

	const lastIndex = currentPage * itemsPerPage
	const firstIndex = lastIndex - itemsPerPage

	const currentItems = data.slice(firstIndex, lastIndex)

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}
	return (
		<div>
			<TableNav
				handlePageChange={handlePageChange}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
			<table>
				<thead>
					<tr>
						<th onClick={handleAtClick}>At</th>
						<th onClick={handleAuthorClick}>Author</th>
						<th onClick={handleLikeClick}>Like</th>
						<th onClick={handleReplyClick}>Reply</th>
						<th onClick={handleTextClick}>Text</th>
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
			<TableNav
				handlePageChange={handlePageChange}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	)
}

export default Table
