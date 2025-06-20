import React from 'react'

const Footer = () => {
  return (
    <div className="bg-blue-900 text-white py-8 mt-10">
          <div className="text-center mt-8 text-xs border-t border-blue-700 pt-4">
        © {new Date().getFullYear()} Book Reservation System. All rights reserved.
      </div>
    </div>
  )
}

export default Footer