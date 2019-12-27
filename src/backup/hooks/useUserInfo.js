import {
	useState,
	useEffect,
} from "react";
import {
  getUsers,
} from "@/actions/user";


export const useUserInfo = (userUID) => {

	const [data, setData] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(undefined);
	const [triggerUpdate, setTriggerUpdate] = useState({});
	

	const reload = () => {
		setTriggerUpdate({});
	};

	
	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				const userJson = await getUsers([userUID]);
				const userInfo = userJson && userJson[userUID];
				setData(userInfo);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}

		})();
	}, [triggerUpdate, userUID]);
  

  return {
		data: data,
		loading: loading,
		error: error,
		reload: reload,
	};
};