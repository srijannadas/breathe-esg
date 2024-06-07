import { GetProp, Table, TablePaginationConfig, TableProps } from 'antd'
import { useState } from 'react'
import { IoMdShare } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';

//data for table
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

//function to set risk classification column data style
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
//function to set status column data style
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
//Interface to pass the parameters of table
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, "onChange">>[1];
  }
  interface DataType {
    // Define the properties of DataType here
    key: string;
    assessmentName: string;
    type: string;
    numberOfSuppliers: number;
    score: number;
    riskSatisfaction: string;
    result: string;
    status: string;
  }

//columns
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
const DataEntry = () => {
    const [data, setData] = useState<DataType[]>();
    const loading = false;
    const [tableParams, setTableParams] = useState<TableParams>({
      pagination: {
        current: 1,
        pageSize: 5,
      },
    });

 
  
    

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
        console.log(data);
        
      };
  return (
    <div>
       <Table <DataType>
                dataSource={dataSource}
                columns={columns}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                className="mt-6"
              />
    </div>
  )
}

export default DataEntry
