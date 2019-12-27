import React from "react";
import SiteWrapper from "@/containers/SiteWrapper";
import {
  Page,
} from "tabler-react";
import BlogDetailForm from "@/components/blogs/BlogDetailForm";
import Loading from "@/components/common/Loading";
import {
  withRouter,
} from "react-router-dom";
import {
  useFetchPostInfo,
} from "@/hooks/useFetchPostInfo";


const EditBlogPage = ({
  match,
}) => {
  
  const pid = match && match.params && match.params.pid;
  const {
    data: post,
    loading,
    reload,
  } = useFetchPostInfo(pid) || {};


  const _updatePostInfo = () => {
    if (reload) {
      reload();
    }
  };


  return (
    <SiteWrapper>
      <Page.Content title="Edit Blog">
        {
          loading && <Loading />
        }

        {
          !loading &&
          <BlogDetailForm
            post={post}
            onUpdate={_updatePostInfo}
          />
        }
      </Page.Content>
    </SiteWrapper>
  );
};


export default withRouter(EditBlogPage);
