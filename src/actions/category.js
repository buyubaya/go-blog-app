import {
	fetchJSON,
} from "@/core/fetch";


const apiURL = process.env.REACT_APP_API_URL;


export const getCategories = async () => {

	const json = await fetchJSON(
		`${apiURL}/api/categories/`,
		{
			method: "GET",
		}
	);

	return json;
}


export const addCategory = async (requestData) => {

	const json = await fetchJSON(
		`${apiURL}/api/categories/`,
		{
			method: "POST",
			body: JSON.stringify(requestData),
		}
	);

	return json;
}


export const deleteCategory = async (cid) => {

	const json = await fetchJSON(
		`${apiURL}/api/categories/${cid}`,
		{
			method: "DELETE",
		}
	);

	return json;
}