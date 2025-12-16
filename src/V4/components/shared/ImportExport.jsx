import ExportFun from "./ExportFun"
import ImportFun from "./ImportFun"
import { ArrowLeft, Pencil, Download , Upload, FileText} from 'lucide-react';


function ImportExport(props) {
  return (
    <section className="card-container">
    {/* <section className="bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-100 sm:p-6 mb-4"> */}
      
      {/* Card Header/Title */}
      <div className="flex items-center gap-3 py-3 px-2 border-b border-gray-100">
        <FileText size={20} className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Data Management (Import/Export)</h3>
      </div>

      {/* Card Body with Responsive Grid (Stacks until large screen) */}
      <div className="pt-4 px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- 1. Export Section (Left) --- */}
        <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Download size={18} className="text-green-600" /> Export Resume Data
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Save your current resume data as a JSON file for backup or sharing.
            </p>
          </div>
          
          {/* ExportFun usage: Renders button */}
          <ExportFun formData={props.formData} setFormData={props.setFormData}>
            <button className="w-full bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md flex items-center justify-center mt-4">
              <Download size={18} className="mr-2" /> Download JSON
            </button>
          </ExportFun>
        </div>

        {/* --- 2. Import Section (Right) --- */}
        <div className="border border-gray-200 p-4 rounded-xl shadow-sm bg-gray-50 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Upload size={18} className="text-blue-600" /> Import & Update Data
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Upload a previously exported JSON file to restore your resume data.
            </p>
          </div>
          
          {/* ImportFun usage: Renders file chooser input */}
          <ImportFun formData={props.formData} setFormData={props.setFormData}>
             
          </ImportFun>
        </div>

      </div>
    </section>

  )
}

export default ImportExport