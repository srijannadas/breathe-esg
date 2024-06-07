import { Table } from 'antd';
import { BiMessageAdd } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { GiRadarSweep } from 'react-icons/gi';


//data for table
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

//function to set status column style
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
//columns of table
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

const Tracker = () => {
  return (
    <div>
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
                pagination={false}
                className="mt-6"
              />
    </div>
  )
}

export default Tracker
