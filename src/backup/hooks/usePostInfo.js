import {
  useFetch,
} from "@/helpers/useFetch";


const apiURL = process.env.REACT_APP_API_URL;


export const usePostInfo = (postID) => {

  if (!postID) {
    return {};
  }

	
  const {
    data,
    loading,
    error,
    setReload,
  } = useFetch({
    url: `${apiURL}/api/posts/${postID}`,
    options: {
      method: "GET",
    },
    deps: [],
  });


  const reload = () => {
		setReload({});
	};
  

  return {
		data: data,
		loading: loading,
		error: error,
		reload: reload,
	};
};