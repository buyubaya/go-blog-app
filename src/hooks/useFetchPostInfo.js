import {
  useFetch,
} from "@/helpers/useFetch";


const apiURL = process.env.REACT_APP_API_URL;


export const useFetchPostInfo = (postID) => {

  if (!postID) {
    return {};
  }

	
  const {
    data,
    loading,
    error,
    reload,
  } = useFetch({
    url: `${apiURL}/api/posts/${postID}`,
    options: {
      method: "GET",
    },
    deps: [postID],
  });


  return {
		data: data,
		loading: loading,
		error: error,
		reload: reload,
	};
};