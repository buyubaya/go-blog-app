import {
  useFetch,
} from "@/helpers/useFetch";


const apiURL = process.env.REACT_APP_API_URL;


export const useFetchCategory = ({ deps = [] } = {}) => {
	
  const {
    data,
    loading,
    error,
    reload,
  } = useFetch({
    url: `${apiURL}/api/categories`,
    options: {
      method: "GET",
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