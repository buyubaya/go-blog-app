import * as React from "react";

import {
  Page,
} from "tabler-react";
import SiteWrapper from "@/containers/SiteWrapper";
import Loading from "@/components/common/Loading";
import BlogsTable from "@/components/blogs/BlogsTable";

import {
  usePosts,
} from "@/hooks/usePosts";


function BlogsTablePage() {

  const {
    data,
    loading,
    // error,
    reload,
  } = usePosts();


  const _handleUpdateBlogSuccess = () => {
    if (reload) {
      reload();
    }
  };


  return (
    <SiteWrapper>
      <Page.Content title="Blogs Table">
        {
          loading && (
            <Loading />
          )
        }

        {
          !loading && (
            <BlogsTable
              posts={(data && data.posts)}
              onUpdate={_handleUpdateBlogSuccess}
            />
          )
        }
      </Page.Content>
    </SiteWrapper>
  );
}


export default BlogsTablePage;
