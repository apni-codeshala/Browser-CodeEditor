import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import Node from "./Node";
import UserContext from "./utils/UserContext";

const Works = () => {
    const { user } = useContext(UserContext);
    const [nodes, setNodes] = useState([]);
 
    useEffect(() => {
        getNodes();
    }, []);

    const getNodes = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/findbyuserid/${user.id}}`);
        const obj = await response.json();
        setNodes(obj.data);
    }

    return (
        <div className="works">
            <MainHeader />
            <div className="work">
                {
                    nodes.map((node, index) => ( 
                        <Link to={"/editor/"+node.id} >
                            <Node 
                                key={node.id} 
                                nodeName={node.name} 
                                createdAt={formatDate(node.createdAt)} 
                                code={{
                                    html: node.html,
                                    css: node.css,
                                    js: node.js
                                }}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(dateObject);
}

export default Works;