
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKLSyFpv3OmCSKNa6cjt289lCFeH_GBv0",
  authDomain: "firstproject-79507.firebaseapp.com",
  projectId: "firstproject-79507",
  storageBucket: "firstproject-79507.appspot.com",
  messagingSenderId: "830555530179",
  appId: "1:830555530179:web:2e74b7bde631fdcc29d376"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import React {useEffect, useState} from "react";
import {View, Text, Flatlist} from "react-native";

export default function App() {
	const [nomes, setNomes] = useState([]);
	
	useEffect((){
		const fetchData = async ()=>{
			const nomesCollection = firebase.firestore()collection('Nomes');
			const snapshot = await nomesCollection.get();

			const data = [];
			snapshot.forEach((doc)=> {
				data.push({id: doc.id, ...doc.data});
			});
		setNomes(data);
		};
	fetchData();}, []);
	return (
		<View style={{flex: 1, justifyContent: 'center'	, alignItems: 'center'}}>
			<Text> Lista de Nomes: </Text>
				<Flatlist
					data = {nomes}
					keyExtractor = {(item) => id.item}
					renderItem = `{({item}) => (
						<View>
						<Text>
							{""}
							{item.Nome} {item.Sobrenome}
						</Text>
					)}
				/>
			</View>
	);
}

