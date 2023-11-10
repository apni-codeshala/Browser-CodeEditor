import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "./Editor";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./utils/UserContext";

const EditorPage = () => {

    const { id } = useParams();

    const [title, setTitle] = useState("Untitled");
    const [html, setHtml] = useLocalStorage('html', ' ');
    const [css, setCss] = useLocalStorage('css', ' ');
    const [js, setJs] = useLocalStorage('js', ' ');
    const [srcDoc, setSrcDoc] = useState('');
    const [newNode, setNewNode] = useState((!Number(id)) ? true : false);

    const { user, setUser } = useContext(UserContext);


    // The html, css and js on every click this slow down our page so we will do it after some interval
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
            <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script> 
            </html>
            `)
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js])

    useEffect(() => {
        if (id) {
            getNodeCode();
        }
    }, [])

    const getNodeCode = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/getcode/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTitle(data.data.name)
                setHtml(data.data.html)
                setCss(data.data.css)
                setJs(data.data.js)
            }
        } catch (error) {
            console.log("Not getting the node code");
        }
    }

    const updateNode = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/updatenode/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: title,
                    html: html,
                    css: css,
                    js: js
                })
            });
            if (response.ok) {
                const data = await response.json();
                if (data.data) {
                    console.log(data);
                }
            }
        } catch (error) {
            console.log("Node Update Failed");
        }
    }

    const saveNode = async () => {
        try {
            const data = {
                name: title,
                html: html,
                css: css,
                js: js,
                userId: user.id
            }
            console.log(id)
            console.log(data);
            const response = await fetch("http://localhost:3000/api/v1/createnode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            console.log(await response.json());
        } catch (error) {
            console.log("Something went wrong in sending the node data");
        }
    }

    return (
        <>
            <nav className="menu">
                <Link to="/">
                    <div className="logo">
                        <span className="head-first">Code</span>
                        <span className="head-end">Node</span>
                    </div>
                </Link>
                <div className="title">
                    <input type="text" className="title-input" placeholder="Node Name" value={title} onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                </div>

                <div className="new">
                    <button className="header-button" onClick={(newNode) ? saveNode : updateNode}>Save Node</button>
                </div>
            </nav>
            <div className="pane top-pane">
                <Editor
                    language="xml"
                    displayName="HTML"
                    value={html}
                    onChange={setHtml}
                />
                <Editor
                    language="css"
                    displayName="CSS"
                    value={css}
                    onChange={setCss}
                />
                <Editor
                    language="javascript"
                    displayName="JS"
                    value={js}
                    onChange={setJs}
                />
            </div>
            <div className="pane">
                <iframe
                    srcDoc={srcDoc}  // This is the most important this this loads html in iframe
                    title="output"
                    sandbox="allow-scripts "
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        </>
    )
}

export default EditorPage;