import React from 'react'

export default function ValidationError({error}) {
    return (
        <div>
            <p className="text-red-500">{error}</p>
        </div>
    )
}
