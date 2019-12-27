import {
	fetchJSON,
} from "@/core/fetch";


const apiURL = process.env.REACT_APP_API_URL;


export const addPost = async (requestData) => {

	const json = await fetchJSON(
		`${apiURL}/api/posts/`,
		{
			method: "POST",
			body: JSON.stringify(requestData),
		}
	);

	return json;
}


export const updatePost = async (pid, requestData) => {

	const json = await fetchJSON(
		`${apiURL}/api/posts/${pid}`,
		{
			method: "PUT",
			body: JSON.stringify(requestData),
		}
	);

	return json;
}


export const deletePost = async (pid) => {

	const json = await fetchJSON(
		`${apiURL}/api/posts/${pid}`,
		{
			method: "DELETE",
		}
	);

	return json;
}