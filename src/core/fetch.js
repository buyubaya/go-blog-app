import * as firebase from "firebase";
import { Promise } from "q";


export const customFetch = async (url, options) => {
	const authClient = await firebase.auth();
	const idToken = (
		authClient &&
		authClient.currentUser &&
		(await authClient.currentUser.getIdToken())
	) || "";


	if (!idToken) {
		return () => {};
	}

	
	const params = {
		...options,
		headers: {
			...options.headers,
			Authorization: idToken,
			"Content-Type": "application/json",
		},
	};


	return fetch(url, params);
}


export const fetchJSON = async (url, options) => {

	const reponse = await customFetch(url, options);
	const json = await reponse.json();

	if (!reponse.ok) {
		return Promise.reject({
			code: reponse.status,
			message: json.error || reponse.statusText,
			...json,
		});
	}

	return json;
}