function ExportFun(props) {
    const downloadJSON = () => {
        const json = JSON.stringify(props.formData, null, 2);  // Prettified JSON
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "resume-data.json";  // File name
        link.click();

        URL.revokeObjectURL(url);
    };


    return (
        <>
            <div>
                {/* <h2 style={{ marginBottom: "20px" }}>Export Resume Data</h2> */}

                <button
                    onClick={downloadJSON}
                    style={{
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        // fontSize: "16px",
                    }}
                >
                    Download JSON
                </button>
            </div>
        </>
    )
}

export default ExportFun