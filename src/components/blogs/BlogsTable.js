import React, {
  useState,
} from "react";
import {
  Card,
  Table,
  Tag,
  Dropdown,
  Loader,
} from "tabler-react";
import moment from "moment";
import {
  deletePost,
} from "@/actions/posts";
import {
  withRouter,
} from "react-router-dom";



const BlogsTable = ({
  posts,
  history,
}) => {

  const [loadingID, setLoadingID] = useState({});
  const [removedIDs, setRemovedIDs] = useState({});


  const _handleClickEditItem = (pid) => () => {
    history.push(`/blogs/edit/${pid}`);
  };


  const _handleClickDeleteItem = (pid) => async () => {
    setLoadingID(state => ({
      ...state,
      [pid]: true,
    }));

    try {
      await deletePost(pid);

      setRemovedIDs(state => ({
        ...state,
        [pid]: true,
      }));
    } catch (error) {
      console.error("Delete Post failed", error);
    } finally {
      setLoadingID(state => ({
        ...state,
        [pid]: false,
      }));
    }
  };


  if (
    !posts ||
    !posts.length
  ) {
    return null;
  }


  return (
    <Card>
      <Table
        cards={true}
        striped={true}
        responsive={true}
        className="table-vcenter"
      >
        <Table.Header>
          <Table.Row>
            <Table.ColHeader>No.</Table.ColHeader>
            <Table.ColHeader>Title</Table.ColHeader>
            <Table.ColHeader>Author</Table.ColHeader>
            <Table.ColHeader>Created At</Table.ColHeader>
            <Table.ColHeader>Updated At</Table.ColHeader>
            <Table.ColHeader />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            posts.map((item, index) => {

              if (removedIDs && removedIDs[item.id]) {
                return null;
              }

              const isUpdating = loadingID && loadingID[item.id];

              if (isUpdating) {
                return (
                  <Table.Row key={item.id}>
                    <Table.Col colSpan={6} alignContent="center">
                      <Loader className="d-inline-block" size="sm" />
                    </Table.Col>
                  </Table.Row>
                );
              }

              return (
                <Table.Row key={item.id}>
                  <Table.Col>
                    {index + 1}
                  </Table.Col>
                  <Table.Col>
                    {item.title}
                  </Table.Col>
                  <Table.Col>
                    <Tag avatar={item.author && item.author.photoURL}>
                      {item.author && (item.author.displayName || item.author.email)}
                    </Tag>
                  </Table.Col>
                  <Table.Col>
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </Table.Col>
                  <Table.Col>
                    {moment(item.updatedAt).format("DD/MM/YYYY")}
                  </Table.Col>
                  <Table.Col alignContent="right">
                    <Dropdown
                      value="Show Calendar"
                      color="primary"
                      icon="more-horizontal"
                      toggle
                      items={[
                        <Dropdown.Item 
                          key="edit"
                          onClick={_handleClickEditItem(item.id)}
                        >
                          Edit
                        </Dropdown.Item>,
                        <Dropdown.Item
                          key="delete"
                          onClick={_handleClickDeleteItem(item.id)}
                        >
                          Delete
                        </Dropdown.Item>,
                      ]}
                    />
                  </Table.Col>
                </Table.Row>
              );
            })
          }
        </Table.Body>
      </Table>
    </Card>
  );
};


export default withRouter(BlogsTable);