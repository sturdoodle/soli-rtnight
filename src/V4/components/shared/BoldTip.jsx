import { Star } from 'lucide-react'
import React from 'react'

function BoldTip() {
    return (
        <span className='text-sm flex gap-2'><Star size={16} color="blue" />Tip: use <b>**</b>WORD<b>**</b> for <i><b>WORD</b></i></span>
    )
}

export default BoldTip