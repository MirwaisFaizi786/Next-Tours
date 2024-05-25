"use client";
import { useFormStatus } from 'react-dom'

function Button({ children }:{ children: React.ReactNode }) {
    const {pending} = useFormStatus();
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
      { pending ? "Loading..." : children}
    </button>
  )
}

export default Button