// import logo from './logo.svg';
import { useCallback, useEffect, useState, useRef } from 'react';

import './App.css';

function App() {
const [length, setLength] = useState(8)
const [numberAllowed, setNumberAllowed] = useState(false)
const [charAllowed, setCharAllowed] = useState(false)
const [password, setPassword] = useState('')

const passwordRef = useRef(null)

const passwordGenrator = useCallback(() =>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) str += "0123456789"
  if(charAllowed) str += "!@#$%^&*"

  for(let i = 1 ; i <= length; i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }
  setPassword(pass)

},[length, numberAllowed, charAllowed,setPassword])

const copyPasswordToClipboard = useCallback(() => {
  // line 30 code is define the selected code in clipboard ? symble mean optionaly selected
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,100)
  window.navigator.clipboard.writeText(password)

},[password])

useEffect(() => {
  passwordGenrator()
} , [length, numberAllowed, charAllowed, passwordGenrator ])

  return (
    <>
      <div className='w-full max-w-md mx-auto roundede-lg px-4 py-3 my-8 shadow-md text-orange-500 bg-gray-800 '>
        <h1 className='text-white text-center'>Password Genrator</h1>
        <div className='flex shadow rounded-lg mb-4 overflow-hidden'>
          <input 
          type="text" 
          value={password} 
          className='w-full outline-none py-1 px-3'
          placeholder='Password'
          readOnly 
          ref={passwordRef} />
         <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 px-3 py-0.5 text-white shrink-0 '>Copy</button>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          value={length}
          min={6}
          max={100}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}} />
          <label >Length: {length}</label>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            id='NumberInput'
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed(prev => !prev)} />
            <label htmlFor="NumberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            id='CharInput'
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed(prev => !prev)} />
            <label htmlFor="charactersInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
