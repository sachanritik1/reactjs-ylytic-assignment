import { useEffect, useState } from "react"
import Table from "./components/Table"
const itemsPerPage = 10
function App() {
	const [comments, setComments] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setLoading(true)
		function fetchData() {
			fetch("https://app.ylytic.com/ylytic/test", {
				mode: "cors",
			})
				.then((res) => res.json())
				.then((res) => {
					setComments(res.comments)
					console.log(res.comments)
				})
				.catch((err) => console.log(err))
		}
		fetchData()
		setLoading(false)
	}, [])

	return (
		<div>
			{loading ? (
				<div>loading...</div>
			) : (
				<Table
					data={comments}
					setData={setComments}
					itemsPerPage={itemsPerPage}
				/>
			)}
		</div>
	)
}

export default App
