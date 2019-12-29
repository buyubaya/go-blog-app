import React, {
  useState,
  useEffect,
} from "react";
import {
  Avatar,
  Icon,
  Card,
  Table,
  Loader,
  Button,
} from "tabler-react";
import moment from "moment";
import Loading from "@/components/common/Loading";
import {
  deleteActivity,
} from "@/actions/activities";
import {
  useFetchActivities,
} from "@/hooks/useFetchActivities";


const ActivitiesTable = () => {

  const [currentList, setCurrentList] = useState([]);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [loadingIDs, setLoadingIDs] = useState({});
  const [removedIDs, setRemovedIDs] = useState({});

  const {
    data,
    loading,
  } = useFetchActivities({
    query: queryParams,
    deps: [queryParams],
  });

  const activities = data && data.activities;
  const count = data && data.count;
  const currentPage = (queryParams && queryParams.page) || 1;
  const currentPageSize = (queryParams && queryParams.pageSize) || 1;
  const pageCount = Math.ceil(count / currentPageSize);
  const showLoadMore = currentPage < pageCount;


  useEffect(() => {
    if (activities) {
      setCurrentList(state => [
        ...state,
        ...activities,
      ]);
    }
  }, [activities]);


  const _handleClickDeleteActivity = (aid) => async () => {
    setLoadingIDs(state => ({
      ...state,
      [aid]: true,
    }));

    try {
      await deleteActivity(aid);

      setRemovedIDs(state => ({
        ...state,
        [aid]: true,
      }));
    } catch (error) {
      console.error("Delete Activity failed", error);
    } finally {
      setLoadingIDs(state => ({
        ...state,
        [aid]: false,
      }));
    }
  };


  const _handleLoadMore = () => {
    setQueryParams(state => ({
      ...state,
      page: state.page + 1,
    }));
  };


  return (
    <Card>
      <Card.Header>
        <Card.Title>Activities</Card.Title>
      </Card.Header>

      {
        loading && <Loading />
      }

      {
        !loading && (
          <>
            <Table
              cards={true}
              striped={true}
              responsive={true}
              className="table-vcenter"
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColHeader colSpan={2}>User</Table.ColHeader>
                  <Table.ColHeader>Action</Table.ColHeader>
                  <Table.ColHeader>Date</Table.ColHeader>
                  <Table.ColHeader />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  currentList && currentList.map(item => {

                    if (removedIDs && removedIDs[item.id]) {
                      return null;
                    }

                    const isUpdating = loadingIDs && loadingIDs[item.id];

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
                      <Table.Row>
                        <Table.Col className="w-1">
                          <Avatar
                            imageURL={item.creator && item.creator.photoURL}
                          />
                        </Table.Col>
                        <Table.Col>
                          {item.creator && (item.creator.displayName || item.creator.email)}
                        </Table.Col>
                        <Table.Col>
                          {item && item.action}
                        </Table.Col>
                        <Table.Col className="text-nowrap">
                          {
                            moment(item.createdAt).format("DD/MM/YYYY")
                          }
                        </Table.Col>
                        <Table.Col className="w-1">
                          <Icon
                            link={true}
                            name="trash"
                            onClick={_handleClickDeleteActivity(item.id)}
                          />
                        </Table.Col>
                      </Table.Row>
                    );
                  })
                }
              </Table.Body>
            </Table>
          
            {
              showLoadMore && (
                <Button
                  block
                  color="secondary"
                  onClick={_handleLoadMore}
                >
                  Load more
                </Button>
              )
            }
          </>
        )
      }

    </Card>
  );
};


export default ActivitiesTable;
