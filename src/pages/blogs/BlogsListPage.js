import React, {
  useState,
} from "react";

import { Page, Grid, BlogCard } from "tabler-react";
import SiteWrapper from "@/containers/SiteWrapper";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";

import {
  usePosts,
} from "@/hooks/usePosts";
import moment from "moment";


function BlogsListPage() {

  const [queryParams, setQuerParams] = useState({
    page: 1,
    pageSize: 10,
  });


  const {
    data,
    loading,
    // error,
    // reload,
  } = usePosts({
    query: queryParams,
    deps: [queryParams],
  });

  const posts = data && data.posts;
  const count = data && data.count;
  const currentPage = queryParams && queryParams.page;
  const currentPageSize = queryParams && queryParams.pageSize;


  const _handlePageChange = (page) => {
    setQuerParams(state => ({
      ...state,
      page: page,
    }));
  };


  const _renderBlogList = () => {

    return (
      <Grid.Row cards deck>
        {
          posts && posts.map(item => (
            <Grid.Col lg={4} md={6} sm={12}>
              <BlogCard
                postHref={`/blogs/detail/${item.id}`}
                title={item.title}
                description={
                  item.description
                }
                authorName={item.author && (item.author.dispplayName || item.author.email)}
                avatarImgSrc={item.author && item.author.photoURL}
                date={moment(item.updatedAt).fromNow()}
              />
            </Grid.Col>
          ))
        }
      </Grid.Row>
    );
  };


  return (
    <SiteWrapper>
      <Page.Content title="Blog Component">
        {
          loading && (
            <Loading />
          )
        }

        {
          !loading && _renderBlogList()
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


export default BlogsListPage;
