import React from "react";
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import TheatresList from "./TheatresList";
import AllBookings from "./Allbookings";


function Admin() {
  return (
    <div>
    <PageTitle title="Admin" />

    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Movies" key="1">
          <MoviesList/>
      </Tabs.TabPane>

      <Tabs.TabPane tab="Theatres" key="2">
          <TheatresList/>
      </Tabs.TabPane>

      <Tabs.TabPane tab="All Bookings" key="3">
          <div><AllBookings/></div>
      </Tabs.TabPane>
    </Tabs>
  </div>
  );
}

export default Admin;