import {
	fetchJSON,
} from "@/core/fetch";


const apiURL = process.env.REACT_APP_API_URL;


export const deleteActivity = async (activityID) => {

	const json = await fetchJSON(
		`${apiURL}/api/activities/${activityID}`,
		{
			method: "DELETE",
		}
	);

	return json;
};
