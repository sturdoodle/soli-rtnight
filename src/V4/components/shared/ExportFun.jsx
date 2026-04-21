import { useNotification } from "../../../context/NotificationContext";

function ExportFun(props) {
    const { showNotification } = useNotification();
    const downloadJSON = () => {
        const json = JSON.stringify(props.formData, null, 2);  // Prettified JSON
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "resume-data.json";  // File name
        link.click();

        URL.revokeObjectURL(url);
        showNotification("Resume data exported successfully!", "success");
    };


    return (
        <>
            <div className="flex flex-col">
                <button
                    onClick={downloadJSON}
                    className="custom-file-upload-button"
                >
                    Download JSON
                </button>
            </div>
        </>
    )
}

export default ExportFun