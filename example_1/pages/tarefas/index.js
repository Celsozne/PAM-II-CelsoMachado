import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default function tasks () {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] useState(true);
	const router = router.push("/login");
	return;

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/loign");
			return;
	}

	const searchtasks = async () => {
		try {
			const res = await fetch('/api/tasks', {
				headers : {
					Autorization: 'Bearer {token}',
					}
				});
			if (res.ok){
				const data = await  res.json();
				setTasks(data.tasks);
				setLoading(false);
				
				if(data.Tasks.length ===0) {
					router.push('/tarefas/nova-tarefa');
				} 
			} else {
				localStorage.removeItem("token");
				router.push("/login");
				}
			} catch (error) {
				console.error(error);
				setLoading(false);
				}
		};
			searchtasks();
		}, [router]);
	const handlenewtask = () {
		router.push("tarefas/nova-tarefa");
	};

return (
	<>
		<Header />
			<div className="container mt-5">
				<h1>Tasks</h1>
					<button className="btn btn-primary mb-3" onClick={handlenewtask}>
						Create Task
					</button>
				{loading ? (
					<p>loading...</p>
					) : (
					<ul className="list-group">
						{tarefas.map((task) => (
							<li key={task._id} className="list-group-item">
								<h5>{task.title}</h5>
								<p>{task.description}</p>
							</li>
						))}
					</ul>
					)}
			</div>
		<Footer />
	</>
);
}
            
		
