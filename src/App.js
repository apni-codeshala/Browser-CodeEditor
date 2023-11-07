import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Editor from "./components/Editor";
import useLocalStorage from "./components/hooks/useLocalStorage";

const App = () => {

    const [html, setHtml] = useLocalStorage('html', ' ');
    const [css, setCss] = useLocalStorage('css', ' ');
    const [js, setJs] = useLocalStorage('js', ' ');
    const [srcDoc, setSrcDoc] = useState('');


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


    return (
        <>
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
                    sandbox="allow-scripts allow-same-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)