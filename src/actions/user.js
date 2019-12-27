import {
	fetchJSON,
} from "@/core/fetch";


const apiURL = process.env.REACT_APP_API_URL;


export const registerUser = async (userInfo) => {

	const json = await fetchJSON(
		`${apiURL}/register`,
		{
			method: "POST",
			body: JSON.stringify(userInfo),
		}
	);

	return json;
}


export const getUsers = async (userUIDs) => {

	if (!userUIDs) {
		return null;
	}

	const _userUIDs = Array.from(new Set(userUIDs)).filter(item => !!item);
	if (_userUIDs.length < 1) {
		return null;
	}

	const json = await fetchJSON(
		`${apiURL}/api/users/`,
		{
			method: "PUT",
			body: JSON.stringify({
				userUIDs: userUIDs,
			}),
		}
	);

	return json;
}


export const addUser = async (userInfo) => {

	const json = await fetchJSON(
		`${apiURL}/api/users/`,
		{
			method: "POST",
			body: JSON.stringify(userInfo),
		}
	);

	return json;
}


export const updateUser = async (uid, userInfo) => {

	const json = await fetchJSON(
		`${apiURL}/api/users/${uid}`,
		{
			method: "PUT",
			body: JSON.stringify(userInfo),
		}
	);

	return json;
}