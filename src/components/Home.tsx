import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Button } from "antd";

import { FaRegBuilding } from "react-icons/fa";
import { GiRadarSweep } from "react-icons/gi";

import DataEntry from "./DataEntry/DataEntry";
import Tracker from "./Tracker/Tracker";
import SideBar from "./SideBar/SideBar";
import Header from "./NavBar/NavBar";

const { Content } = Layout;

const Home = () => {
  const [tab1Active, setTab1Active] = useState(true);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout>
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {/* Your content here */}
              <div className="sub-head-section flex justify-between">
                <div className="left-sub-head flex">
                  <span
                    className={`${
                      tab1Active ? "text-green-600" : "text-gray-400"
                    } cursor-pointer`}
                    onClick={() => setTab1Active(true)}
                  >
                    {" "}
                    <FaRegBuilding />{" "}
                  </span>
                  <span
                    className={`${
                      tab1Active ? "text-green-600" : "text-gray-400"
                    } ml-2 cursor-pointer`}
                    onClick={() => setTab1Active(true)}
                  >
                    DATA ENTRY
                  </span>

                  <span
                    className={`${
                      !tab1Active ? "text-green-600" : "text-gray-400"
                    } ml-4 cursor-pointer`}
                    onClick={() => setTab1Active(false)}
                  >
                    <GiRadarSweep />
                  </span>
                  <span
                    className={`${
                      !tab1Active ? "text-green-600" : "text-gray-400"
                    } ml-2 cursor-pointer`}
                    onClick={() => setTab1Active(false)}
                  >
                    TRACKER
                  </span>
                </div>
                <div className="right-sub-head flex items-center">
                  <span>For: </span>
                  <div className="relative">
                    <select className="block appearance-none bg-transparent ml-4 border-2 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                      <option>FY 2023-24</option>
                      <option>FY 2022-23</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <Link to={"/login"} className="ml-4">
                    <Button
                      type="primary"
                      className="bg-green-600 p-5 font-bold"
                    >
                      Submit For Approval
                    </Button>
                  </Link>
                </div>
              </div>
              {tab1Active ? <DataEntry /> : <Tracker />}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;