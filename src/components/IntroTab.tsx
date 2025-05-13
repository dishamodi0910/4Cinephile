import React from 'react'
import { Card, CardContent } from '@mui/material'
const IntroTab = ({heading,content}) => {
  return (

    <div className="max-w-md rounded overflow-hidden shadow-lg border-red-600 border-2">
        <div className="px-6 py-4">
            <div className="heading font-bold text-xxl mb-2">{heading}</div>
            <p className="text-gray-700 text-base content">
                {content}
            </p>
        </div>
    </div>
  )
}

export default IntroTab
