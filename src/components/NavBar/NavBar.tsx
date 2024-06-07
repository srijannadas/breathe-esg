import { useEffect, useState } from 'react'
import {Avatar, Button, Layout} from 'antd'
import {  BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import LogoLogo from "../../assets/logo_logo.png";
const { Header } = Layout;

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);

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
  return (
    <div>
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
                <select className="block appearance-none bg-transparent ml-4 w-full border-2 border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
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
    </div>
  )
}

export default NavBar
