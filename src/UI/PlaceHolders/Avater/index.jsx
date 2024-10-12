import React from 'react'

function Avater({Char}) {
  return (
<div className="w-12 h-12 bg-sky-600 flex items-center justify-center text-white rounded-full">
<span className="text-xl">{Char}</span>
</div>
  )
}

export default React.memo(Avater)