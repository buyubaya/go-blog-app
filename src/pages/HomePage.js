import * as React from "react";

import {
  Page,
  Grid,
  StatsCard,
  Card,
} from "tabler-react";

import SiteWrapper from "@/containers/SiteWrapper";
import ActivitiesTable from "@/components/activities/ActivitiesTable";


function HomePage() {
  return (
    <SiteWrapper>
      <Page.Content title="Dashboard">

        <Grid.Row cards={true}>
          <Grid.Col width={6} sm={4} lg={2}>
            <Card>
              <Card.Status color="blue" />
              <Card.Body>
                <Card.Title>
                  <h3 style={{ textAlign: "center" }}>20</h3>
                  <h4 style={{ textAlign: "center" }}>Blogs</h4>
                </Card.Title>
              </Card.Body>
            </Card>
          </Grid.Col>

          <Grid.Col width={6} sm={4} lg={2}>
            <Card>
              <Card.Status color="azure" />
              <Card.Body>
                <Card.Title>
                  <h3 style={{ textAlign: "center" }}>20</h3>
                  <h4 style={{ textAlign: "center" }}>Users</h4>
                </Card.Title>
              </Card.Body>
            </Card>
          </Grid.Col>

          <Grid.Col width={6} sm={4} lg={2}>
            <Card>
              <Card.Status color="purple" />
              <Card.Body>
                <Card.Title>
                  <h3 style={{ textAlign: "center" }}>20</h3>
                  <h4 style={{ textAlign: "center" }}>Activities</h4>
                </Card.Title>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col>
            <ActivitiesTable />
          </Grid.Col>
        </Grid.Row>

      </Page.Content>
    </SiteWrapper>
  );
}


export default HomePage;
