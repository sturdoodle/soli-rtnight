
import { Plus, Save,Trash2 } from 'lucide-react';

function ItemButton(props) {
    // console.log(props)
    switch (props.type) {
        case "Delete":
            return  <button className="flex gap-2 items-center text-sm font-semibold mb-2 p-1.5 hover:bg-red-50 px-4 py-2  text-red-500 hover:text-red-600 transition-colors" onClick={props.onclick}><Trash2 size={16} /> {props?.buttonText}</button>
        case "save":
            return <button className="flex gap-2 items-center text-sm font-semibold mb-2 p-1.5 hover:bg-green-50 px-4 py-2  text-blue-500 hover:text-green-600 transition-colors" onClick={props.onclick} ><Save size={16} />{props?.buttonText}</button>
        default:
            break;
    }
}

export default ItemButton