function ImportFun(props) {
  const handleImportJson = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);  // Convert file → JSON
        props.setFormData(jsonData);                              // Update state
        alert("JSON Imported Successfully!");
      } catch (error) {
        alert("Invalid JSON file!");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <label htmlFor="jsonFile" className="custom-file-upload-button">
        Choose JSON File
      </label>
      <input type="file" accept="application/json" onChange={handleImportJson} id="jsonFile" className="hidden-input" />
    </>
  )
}

export default ImportFun