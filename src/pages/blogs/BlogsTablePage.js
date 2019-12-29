import React, {
  useState,
} from "react";

import {
  Page,
} from "tabler-react";
import SiteWrapper from "@/containers/SiteWrapper";
import Loading from "@/components/common/Loading";
import BlogsTable from "@/components/blogs/BlogsTable";
import Pagination from "@/components/common/Pagination";

import {
  usePosts,
} from "@/hooks/usePosts";


function BlogsTablePage() {

  const [queryParams, setQuerParams] = useState({
    page: 1,
    pageSize: 10,
  });


  const {
    data,
    loading,
    // error,
    reload,
  } = usePosts({
    query: queryParams,
    deps: [queryParams],
  });

  const posts = data && data.posts;
  const count = data && data.count;
  const currentPage = queryParams && queryParams.page;
  const currentPageSize = queryParams && queryParams.pageSize;


  const _handleUpdateBlogSuccess = () => {
    if (reload) {
      reload();
    }
  };


  const _handlePageChange = (page) => {
    setQuerParams(state => ({
      ...state,
      page: page,
    }));
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
              posts={posts}
              onUpdate={_handleUpdateBlogSuccess}
            />
          )
        }

         <Pagination
          page={currentPage}
          pageSize={currentPageSize}
          count={count}
          onPageChange={_handlePageChange}
        />

      </Page.Content>
    </SiteWrapper>
  );
}


export default BlogsTablePage;
