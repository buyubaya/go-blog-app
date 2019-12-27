import {
  useFetch,
} from "@/helpers/useFetch";


const apiURL = process.env.REACT_APP_API_URL;


export const useFetchActivities = ({ query = {}, deps = [] } = {}) => {
	
  const {
    data,
    loading,
    error,
    reload,
  } = useFetch({
    url: `${apiURL}/api/activities/`,
    options: {
      method: "PUT",
      body: JSON.stringify(query),
    },
    deps: deps,
  });


  return {
		data: data,
		loading: loading,
		error: error,
		reload: reload,
	};
};