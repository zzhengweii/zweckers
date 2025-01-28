import '../styles/Dashboard.css'

function Dashboard() {
    return (
        <div>
            {/* URL/File Box */}
            <div className="URLBox">
                <ion-icon name="attach"></ion-icon>
                <form className="URLForm">
                    <label htmlFor="url"></label>
                        <input 
                            type="text" 
                            id="url" 
                            placeholder="Insert your URL here or attach a file."
                            className="URLInput" 
                        />
                </form>
            </div>

            {/* Header Text */}
            <div className="Board">
                <p className="BoardHeader">Ready to get started? Attach your file or paste a URL.</p>
                <p className="BoardSubtitle">Only CSV and XLSX files are supported.</p>
            </div>
        </div>
    );
}

export default Dashboard;
