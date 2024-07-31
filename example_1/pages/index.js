import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Index.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Home() {
  return (
    	<>
		<Header></Header>
 		<div className={`${styles.body} shadow`}>
			<section className={styles.hero}>
				<h2>Example_0</h2>
				<p>Exmple_1</p>
			<Link className="btn btn-primary" href="/login">
				Example_2
			</Link>
        		</section>
        		<section className={styles.features}>
          			<h2>Example_3</h2>
          				<ul>
            					<li>
              						<i className="fas fa-list-ul"></i>
              						<p>Example_4</p>
            					</li>
            					<li>
              						<i className="fas fa-clock"></i>
              						<p>Example_5</p>
            					</li>
            					<li>
              						<i className="fas fa-chart-bar"></i>
              						<p>Example_6</p>
            					</li>
          				</ul>
        		</section>
        		<section className={styles.callToAction}>
          			<h2>Example_7</h2>
          			<p>Example_8</p>
          				<Link className="btn btn-success btn-lg" href="/cadastro">
           					Example_9
          				</Link>
        		</section>
      		</div>
      		<Footer></Footer>
    	</>
  );
}
export default Home;

