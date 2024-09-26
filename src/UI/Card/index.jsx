import React from 'react'

function Card(props) {
  return (
    <div className="p-4 mb-3 rounded-lg block bg-white dark:bg-darkColor-700 shadow-md">{props.children}</div>
  )
}

export default Card