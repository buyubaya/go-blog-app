import React from "react";
import SiteWrapper from "@/containers/SiteWrapper";
import {
  Page,
} from "tabler-react";
import BlogDetailForm from "@/components/blogs/BlogDetailForm";


const AddBlogPage = () => {

  return (
    <SiteWrapper>
      <Page.Content title="Add Blog">
        <BlogDetailForm />
      </Page.Content>
    </SiteWrapper>
  );
};


export default AddBlogPage;
