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
      <h2 style={{ marginBottom: "20px" }}>Import JSON & Update State</h2>

      <input
        type="file"
        accept="application/json"
        onChange={handleImportJson}
        style={{ marginBottom: "20px", cursor: "pointer" }}
      />

    </>
  )
}

export default ImportFun