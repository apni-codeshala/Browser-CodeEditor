import { useContext } from "react";
import UserContext from "./utils/UserContext";
import { Link } from "react-router-dom";

const MainHeader = () => {

    const {user, setUser} = useContext(UserContext)

    return (
        <nav className="menu">
            
            <div className="logo">
                <span className="head-first">Code</span>
                <span className="head-end">Node</span>
            </div>
            <div className="title">
                <h1>{user.email}</h1>
            </div>

            <div className="new">
                <Link to="/editor/0">
                    <button className="header-button">New Node</button>
                </Link>
            </div>
        </nav>
    )
}

export default MainHeader;