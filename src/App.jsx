import { useEffect, useState } from "react"
import Table from "./components/Table"
import Header from "./components/Header"
function App() {
	const [comments, setComments] = useState(null)
	const [data, setData] = useState([])
	const [itemsPerPage, setItemsPerPage] = useState(25)
	useEffect(() => {
		function fetchData() {
			fetch("https://app.ylytic.com/ylytic/test", {
				mode: "cors",
			})
				.then((res) => res.json())
				.then((res) => {
					setComments(res.comments)
					setData(res.comments)
				})
				.catch((err) => console.log(err))
		}
		fetchData()
	}, [])

	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(data.length / itemsPerPage)
	const lastIndex = currentPage * itemsPerPage
	const firstIndex = lastIndex - itemsPerPage
	const currentItems = data.slice(firstIndex, lastIndex)

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}

	return (
		<div className="app">
			<Header
				data={data}
				setData={setData}
				comments={comments}
				setItemsPerPage={setItemsPerPage}
				handlePageChange={handlePageChange}
				currentPage={currentPage}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
			/>
			<Table
				data={data}
				setData={setData}
				handlePageChange={handlePageChange}
				currentPage={currentPage}
				totalPages={totalPages}
				currentItems={currentItems}
			/>
		</div>
	)
}

export default App
