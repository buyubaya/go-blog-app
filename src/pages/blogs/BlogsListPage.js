import * as React from "react";

import { Page, Grid, BlogCard } from "tabler-react";
import SiteWrapper from "@/containers/SiteWrapper";


function BlogsListPage() {
  return (
    <SiteWrapper>
      <Page.Content title="Blog Component">
        <Grid.Row cards deck>
          <Grid.Col lg={4}>
            <BlogCard
              postHref={"#"}
              title={"Weaseling out of things is important to learn."}
              description={
                "Please do not offer my god a peanut. That's why I love elementary school, Edna. The children beli..."
              }
              profileHref={"./profile.html"}
              authorName={"Bobby Knight"}
              avatarImgSrc={"./demo/faces/male/4.jpg"}
              date={"3 days ago"}
            />
          </Grid.Col>
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}


export default BlogsListPage;
