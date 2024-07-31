import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function newtask () {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();

	const handleSubmit = async (valores, {setSubmitting})=>{
		setError("");
		setSuccess("");

		const token = localStorage.getItem("token");
		if(!token){
			setError("Access Denied");
			return;
		}
		const res = await fetch ("/api/tasks", {
			method: "POST",
			header: {
				"Content-Type": "application/json"
			Authorization: 'Bearer ${token}',
			},
			body: JSON.stringify({
			tittle: values.tittle,
			description: values.description,
			}),
		});
		if (res.ok) {
			const data = await res.json();
			setSuccess("Task created");
			setTimeout(() => {
				router.push("/tarefas");
			},2000);
		} else {
			const data = await res.json();
			setError(data.msg);
		}
		setSubmitting(false)
		};

	return (
		<>
			<Header />
			<div className="container mt-5">
			<h1>Criar uma nova tarefa</h1>
				{error && (
					<div className="alert alert-danger" role="alert">
				{error}
					</div>
				)}
				{success && (
				<div className="alert alert-success" role="alert">
				{sucess}
				</div>
				)}

			<Formik
				initialValues={{ titulo: "", descricao: "" }}
				validationSchema={Yup.object({
				titulo: Yup.string().required("Campo obrigatório"),
				descricao: Yup.string().required("Campo obrigatório"),
				})}
				onSubmit={handleSubmit}
				>
				{({ isSubmitting }) => (
			<Form>
			<div className="mb-3">
			<label htmlFor="titulo">Titulo</label>
			<Field type="text" name="titulo" className="form-control" />
			<ErrorMessage
			name="titulo"
			component="div"
			className="text-danger"
			/>
			</div>
			<div className="mb-3">
			<label htmlFor="descricao">Descrição</label>
			<Field type="text" name="descricao" className="form-control" />
			<ErrorMessage
			name="descricao"
			component="div"
			className="text-danger"
			/>
			</div>
			<button
			type="submit"
			className="btn btn-primary"
			disabled={isSubmitting}
			>
			Criar nova tarefa
			</button>
			</Form>
				)}
			</Formik>
			<Footer />
			</div>
		</>
		);
	}
