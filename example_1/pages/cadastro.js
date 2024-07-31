import Header from "../components/Header";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import styles from "../styles/CadastroUsr.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Cadastro(){
	const[error, setError]  = useState("");
	const [success, setSucccess] = useState("");
	const router =useRouter();
	
	const startValues = {
		name: "",
		email: "",
		password: "",
		confirm_password: "",	
	};

	const schemaValidation = Yup.object()shape({
		name: Yup.string.required("MUST BE COMPLETE"),
		email: Yup.string().email("Invalid email").required("MUST BE COMPLETE"),
		password: Yup.string()
			.min(8, "More than 8 characters")
			.required("MUST BE COMPLET"),
		confirm_password: Yup.string()
				.oneOf([Yup.ref("password"), null], "The passwords are not the same")
				.required("MUST BE COMPLETE"),
		});
	
	const handleSubmit = async (values, {setSubmitting})=>{
		setError("");
		setSucccess("");
		
		const hashPassword = await bcrypt.hash(values.password, 10);
		
		const res = await fetch("api/users/register", {
			method: "POST",
			heders: {
				"Content-Type": "application/json",
				},
			body: JSON.stringify({
				name: values.name,
				email: values.password,
				password: hashPassword,
			}),
		});
				
	if(res.ok) {
		setSuccess("User registred successfull");
		setTimeout(()= {
			router.push("/login")
			}, 2000)
	} else{
		const data = await.res.json();
		setError(data.msg);	
	}
	setSubmitting(false);
	};
	  return (
    <>
      <Header></Header>
      <div className={`${styles.body} shadow`}>
        <div className={styles.hero}>
          <h2> Cadastro </h2>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {sucesso}
          </div>
        )}
        <Formik
          initialValues={startValues}
          validationSchema={schemaValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className="mb-3">
                <label for="nome" className="form-label">
                  Name
                </label>
                <Field
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="nome"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label for="email" className="form-label">
                  E-mail
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@domain.com"
                />
                <ErrorMessage
                  name="nome"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label for="senha" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  name="senha"
                  className="form-control"
                  placeholder=" (Password (> 6 characteres)"
                />
                <ErrorMessage
                  name="senha"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label for="" className="form-label">
                Confirm Password 
                </label>
                <Field
                  type="password"
                  name="confirmaSenha"
                  className="form-control"
                  placeholder="Confirm Password"
                     />
                <ErrorMessage
                  name="confirmaSenha"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Registrar-se
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Cadastro;

