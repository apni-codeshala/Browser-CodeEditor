import { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2"

const Editor = (props) => {

    const [open, setOpen] = useState(true)

    const { displayName, language, value, onChange } = props;

    function handleChange(editor, data, value) {
        onChange(value);
    }

    return (
        <div className={`editor-container ${open ? ' ' : 'collapsed'}`}>
            <div className={`editor-title ${open ? ' ' : 'editor-title-collapsed'}`}>
                <button
                    onClick={() => {
                        open ? setOpen(false) : setOpen(true)
                    }}
                    className="open-close"
                >{displayName}</button>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: "material",
                    lineNumbers: true
                }}
            />
        </div>
    )
}

export default Editor;