const InputField = ({ label, value, placeholder, type = "text", name, onChange, flex = false, ...props }) => (
    <div className={`mb-5 ${flex ? 'flex-1' : ''}`}>
        <label className="block text-sm font-medium text-gray-500 mb-1.5">{label}</label>
        <input 
            type={type} 
            name={name}
            value={value} 
            placeholder={placeholder}
            onChange={onChange}
            className="w-full p-2.5 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none transition-all text-gray-900 font-medium text-base hover:border-gray-400"
            {...props}
        />
    </div>
);

export const TextAreaField = ({ label, value, placeholder, name, onChange, minHeight = 'h-24' }) => (
    <div className="mb-5">
        <label className="block text-sm font-medium text-gray-500 mb-1.5">{label}</label>
        <textarea 
            name={name}
            value={value} 
            placeholder={placeholder}
            onChange={onChange}
            className={`w-full ${minHeight} p-4 border border-gray-200 rounded-xl text-base text-gray-700 leading-relaxed focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none resize-none transition-all`}
        ></textarea>
    </div>
);

export default InputField;