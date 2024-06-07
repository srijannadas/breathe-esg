import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import {
  Layout,
  Menu,
  Avatar,
  Button,
  Table,
  Checkbox,
  Pagination,
  TablePaginationConfig,
  GetProp,
  TableProps,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  BarChartOutlined,
  SnippetsOutlined,
  GroupOutlined,
  SolutionOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  LeftOutlined,
  RightOutlined,
  BellOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Logo from "../assets/logo.svg";
import LogoLogo from "../assets/logo_logo.png";
import { FaRegBuilding } from "react-icons/fa";
import { GiRadarSweep } from "react-icons/gi";
import { IoMdShare } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiMessageAdd } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

const { Header, Content, Sider } = Layout;
const dataSource = [
  {
    key: "1",
    assessmentName: "Assessment 1",
    type: "Type A",
    numberOfSuppliers: 5,
    score: 85,
    riskSatisfaction: "High",
    result: "Pass",
    status: "Complete",
  },
  {
    key: "2",
    assessmentName: "Assessment 2",
    type: "Type B",
    numberOfSuppliers: 10,
    score: 72,
    riskSatisfaction: "Medium",
    result: "Fail",
    status: "Pending",
  },
  {
    key: "3",
    assessmentName: "Assessment 3",
    type: "Type C",
    numberOfSuppliers: 8,
    score: 91,
    riskSatisfaction: "Low",
    result: "Pass",
    status: "Complete",
  },
  {
    key: "4",
    assessmentName: "Assessment 4",
    type: "Type D",
    numberOfSuppliers: 12,
    score: 68,
    riskSatisfaction: "High",
    result: "Fail",
    status: "Pending",
  },
  {
    key: "5",
    assessmentName: "Assessment 5",
    type: "Type E",
    numberOfSuppliers: 7,
    score: 79,
    riskSatisfaction: "Medium",
    result: "Pass",
    status: "Complete",
  },
  {
    key: "6",
    assessmentName: "Assessment 6",
    type: "Type F",
    numberOfSuppliers: 6,
    score: 88,
    riskSatisfaction: "Low",
    result: "Fail",
    status: "Pending",
  },
  {
    key: "7",
    assessmentName: "Assessment 7",
    type: "Type G",
    numberOfSuppliers: 9,
    score: 77,
    riskSatisfaction: "High",
    result: "Pass",
    status: "Complete",
  },
  {
    key: "8",
    assessmentName: "Assessment 8",
    type: "Type H",
    numberOfSuppliers: 4,
    score: 94,
    riskSatisfaction: "Medium",
    result: "Fail",
    status: "Pending",
  },
  {
    key: "9",
    assessmentName: "Assessment 9",
    type: "Type I",
    numberOfSuppliers: 11,
    score: 73,
    riskSatisfaction: "Low",
    result: "Pass",
    status: "Complete",
  },
  {
    key: "10",
    assessmentName: "Assessment 10",
    type: "Type J",
    numberOfSuppliers: 5,
    score: 82,
    riskSatisfaction: "High",
    result: "Fail",
    status: "Pending",
  },
];
const dataSource2 = [
  {
    key: "1",
    month: "Jan 2023",
    status: "Pending Approval",
    completion: "20%",
    businessUnit: "Business Unit 1",
  
  }, 
  {
    key: "2",
    month: "Frb 2023",
    status: "Approved",
    completion: "20%",
    businessUnit: "Business Unit 2",
  
  },
  {
    key: "3",
    month: "March 2023",
    status: "Incomplete",
    completion: "20%",
    businessUnit: "Business Unit 3",
  
  },
  

];

const riskSatisfactionColor = (riskLevel: any) => {
  switch (riskLevel) {
    case "High":
      return "text-red-600";
    case "Medium":
      return "text-orange-600";
    case "Low":
      return "text-green-600";
    default:
      return "";
  }
};
const riskSatisfactionBgColor = (riskLevel: any) => {
  switch (riskLevel) {
    case "High":
      return "bg-red-600";
    case "Medium":
      return "bg-orange-600";
    case "Low":
      return "bg-green-600";
    default:
      return "";
  }
};
const statusBadgeColor = (status: any) => {
  switch (status) {
    case "Pending":
      return "bg-red-200 text-red-700";
    case "Complete":
      return "bg-green-200 text-green-700";
    default:
      return "";
  }
};
const statusBadgeColor2 = (status: any) => {
  switch (status) {
    case "Pending Approval":
      return "bg-red-200 text-red-700";
    case "Approved":
      return "bg-green-200 text-green-700";
      case "Incomplete":
        return "bg-orange-200 text-orange-700";
    default:
      return "";
  }
};


interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const columns = [
  {
    title: "Assessment Name",
    dataIndex: "assessmentName",
    key: "assessmentName",
    render: (text: string) => <span className="text-green-600">{text}</span>,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "No. of Suppliers",
    dataIndex: "numberOfSuppliers",
    key: "numberOfSuppliers",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "Risk Classification",
    dataIndex: "riskSatisfaction",
    key: "riskSatisfaction",
    render: (riskSatisfaction: any) => (
      <span
        className={`flex items-center ${riskSatisfactionColor(
          riskSatisfaction
        )}`}
      >
        {" "}
        <div
          className={`w-3 h-3 rounded-full ${riskSatisfactionBgColor(
            riskSatisfaction
          )} mr-2`}
        ></div>{" "}
        {riskSatisfaction}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: any) => (
      <span className={`px-2 py-1 rounded ${statusBadgeColor(status)}`}>
        {status}
      </span>
    ),
  },
  {
    title: "Result",
    dataIndex: "result",
    key: "result",
    render: (_result: any, record: { status: string }) => {
      if (record.status === "Pending") {
        return "-";
      } else {
        return <span className="text-green-600">View</span>;
      }
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <span className="flex text-[#9f9f9f]">
        <span>
          <IoMdShare />
        </span>
        <span className="ml-2">
          <RiDeleteBin6Line />
        </span>
      </span>
    ),
  },
];
const columns2 = [
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: any) => (
      <span className={`px-2 py-1 rounded ${statusBadgeColor2(status)}`}>
        {status}
      </span>
    ),

  },
  {
    title: "Completion",
    dataIndex: "completion",
    key: "completion",
  },
  {
    title: "Business Unit",
    dataIndex: "businessUnit",
    key: "businessUnit",
  },
  
];


const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<DataType[]>();
  const [tab1Active, setTab1Active] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null); // Clear the user state
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  const toggleTabs = () => {
    setTab1Active(!tab1Active);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ background: "#181818" }}
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div className="logo p-4 flex justify-center items-center" />
        <img
          src={collapsed ? LogoLogo : Logo}
          alt=""
          className={`ml-4 ${collapsed ? "w-6" : "w-40"}`}
        />
        <Menu theme="dark" mode="inline" className="bg-[#181818] mt-20">
          <Menu.Item key="1" icon={<BarChartOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/">Entitiy Manager</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            <Link to="/">Data Manager</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SnippetsOutlined />}>
            <Link to="/">Reporting</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<GroupOutlined />}>
            <Link to="/">Materiality</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SolutionOutlined />}>
            <Link to="/">Suppliers</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<LineChartOutlined />}>
            <Link to="/">Analytics</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<RadarChartOutlined />}>
            <Link to="/">Targets</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />}>
            <Link to="/" className="text-red-500">
              Logout
            </Link>
          </Menu.Item>
          {!collapsed ? (
            <Button
              type="primary"
              className="absolute top-[5rem] left-[11.5rem] shadow-xl w-8 rounded-full bg-[#000] text-white hover:text-white hover:bg-black"
              onClick={toggleCollapsed}
            >
              <LeftOutlined />
            </Button>
          ) : (
            <Button
              type="primary"
              className="absolute top-[5rem] left-[4rem] shadow-xl w-8 rounded-full bg-[#000] text-white hover:text-white hover:bg-black"
              onClick={toggleCollapsed}
            >
              <RightOutlined />
            </Button>
          )}
          {/* Add more menu items as needed */}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "transparent",
            borderBottom: "1px solid #cfcfcf",
          }}
        >
          <div className="flex items-center justify-between h-full pr-4">
            <div className="flex items-center ml-4">
              <img src={LogoLogo} className="w-6" alt="" />
              <span className="font-bold ml-2">View Name</span>
              <div className="relative">
                <select className="block appearance-none bg-transparent ml-4 w-full border-2 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                  <option>North India Region</option>
                  <option>South India Region</option>
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
            </div>

            <div className="flex items-center">
              <span className="text-[#9f9f9f] mr-2">
                {" "}
                <BellOutlined />{" "}
              </span>
              {user ? (
                <>
                  <span className="text-[#9f9f9f] mr-2">
                    {user.displayName || user.email}
                  </span>
                  <Avatar src={user.photoURL} />
                  <Button
                    type="text"
                    className="text-[#9f9f9f] ml-4"
                    onClick={handleLogout}
                  >
                    <LogoutOutlined />
                  </Button>
                </>
              ) : (
                <div>
                  <Link to={"/signup"}>
                    <Button type="primary" className="mr-2">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to={"/login"}>
                    <Button type="primary">Login</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Header>
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
                  <select className="block appearance-none bg-transparent ml-4 border-2 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
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
                  <Button type="primary" className="bg-green-600 p-5 font-bold">
                    Submit For Approval
                  </Button>
                </Link>
              </div>
            </div>
            {tab1Active ? (
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                rowSelection={Selection}
                className="mt-6"
              />
            ) : (
              <>
              
                  <div className="card-container flex mt-8">
                    <div className="card p-4 mr-4 rounded-xl border">
                      <div className="flex">
                        <div className="text flex">
                          <p> Pending Trackers </p>
                          <div className="icon p-2 mx-2 rounded-xl bg-[#f3f3f3]">
                            <span className="text-2xl">
                              <GiRadarSweep />
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-2xl font-bold relative bottom-4">
                        45/60
                      </p>
                    </div>

                    <div className="card p-4 rounded-xl border">
                      <div className="flex">
                        <div className="text flex">
                          <p> Pending Reviews </p>
                          <div className="icon p-2 mx-2 rounded-xl bg-[#f3f3f3]">
                            <span className="text-2xl">
                              <BiMessageAdd />
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-2xl font-bold relative bottom-4">3</p>
                    </div>
                  </div>
                  <div className="absolute bottom-[22rem] right-2">
                    <p className="text-gray-400">Autosaved at 12:31 pm</p>
                  </div>
                  <div className="searchBar w-64 border rounded-lg mt-8 p-4 flex">
                  <span className="searchIcon">
                    <CiSearch/>
                  </span>
                  <input type="text" name="" id="" className="bg-transparent focus:outline-none ml-2" placeholder="Search by business unit"/>
                  </div>

                  <Table
                dataSource={dataSource2}
                columns={columns2}
                className="mt-6"
              />
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
