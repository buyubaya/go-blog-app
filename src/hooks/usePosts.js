import {
  useFetch,
} from "@/helpers/useFetch";


const apiURL = process.env.REACT_APP_API_URL;


export const usePosts = ({
  query = {},
  deps = [],
}) => {

  const {
    data,
    loading,
    error,
    reload,
  } = useFetch({
    url: `${apiURL}/api/posts`,
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