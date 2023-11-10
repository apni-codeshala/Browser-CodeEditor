import img from "../Assets/download.jpg"

const Node = ({nodeName, createdAt}) => {
    return (
        <div className="node">
            <div className="img">
            </div>
            <div className="info">
                <div className="name">{nodeName}</div>
                <div className="date">Created At: {createdAt}</div>
            </div>
        </div>
    )
}

export default Node;