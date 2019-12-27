import {
	useEffect,
  useState,
} from "react";
import {
	fetchJSON,
} from "@/core/fetch";


export const useFetch = ({
	url,
	options,
	deps,
}) => {
	const [data, setData] = useState(undefined);
	const [loading, setLoading] = useState(undefined);
	const [error, setError] = useState(undefined);
	const [reload, setReload] = useState({});


	useEffect(() => {
		(async () => {
			setLoading(true);
			setError(undefined);

			try {
				const json = await fetchJSON(url, options);
				setData(json);
			} catch (_error) {
				setError(_error);
			} finally {
				setLoading(false);
			}
		})();
	}, [...deps, reload]);


	return {
		data: data,
		loading: loading,
		error: error,
		setReload: setReload,
	};
}