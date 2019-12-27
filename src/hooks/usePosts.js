import {
  useFetch,
} from "@/helpers/useFetch";


const apiURL = process.env.REACT_APP_API_URL;


export const usePosts = (params = {}) => {

  const {
    data,
    loading,
    error,
    reload,
  } = useFetch({
    url: `${apiURL}/api/posts`,
    options: {
      method: "PUT",
      body: JSON.stringify(params),
    },
    deps: [],
  });


  return {
		data: data,
		loading: loading,
		error: error,
		reload: reload,
	};
};