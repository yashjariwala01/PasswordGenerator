// import React from 'react'
// import { Routes, Route} from 'react-router-dom';
// import HomePage from './components/HomePage';
// import CourseDetailsPage from './components/CourseDetailsPage';
// import NavBar from './components/Navbar';
// import StudentProfile from './components/StudentProfile';


// const App = () => {
//   return (
//     <div>
//       <NavBar/>
//       <Routes>
//         <Route path='/' element={<HomePage/>}/>
//         <Route path='/item/:id' element={<CourseDetailsPage/>}/>
//         <Route path='/studentprofile' element={<StudentProfile/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App


import React, { useState } from 'react';

function generatePassword(length, useUppercase, useLowercase, useDigits, useSpecial) {
  let characters = '';
  if (useUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
  if (useDigits) characters += '0123456789';
  if (useSpecial) characters += '!@#$%^&*()_+{}:"<>?|[];\',./`~';
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGeneratePassword = () => {
    if (length < 1) {
      setError('Password length must be at least 1.');
      return;
    }
    const newPassword = generatePassword(length, useUppercase, useLowercase, useDigits, useSpecial);
    setPassword(newPassword);
    setError('');
  };

  const handleCopyPassword = () => {
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="container mx-auto max-w-lg p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Password Generator</h1>
      <div className="mb-4">
        <label className="block mb-2">Password Length:</label>
        <input type="number" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Include Uppercase Letters:</label>
        <input type="checkbox" checked={useUppercase} onChange={e => setUseUppercase(e.target.checked)} className="mr-2 leading-tight" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Include Lowercase Letters:</label>
        <input type="checkbox" checked={useLowercase} onChange={e => setUseLowercase(e.target.checked)} className="mr-2 leading-tight" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Include Digits:</label>
        <input type="checkbox" checked={useDigits} onChange={e => setUseDigits(e.target.checked)} className="mr-2 leading-tight" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Include Special Symbols:</label>
        <input type="checkbox" checked={useSpecial} onChange={e => setUseSpecial(e.target.checked)} className="mr-2 leading-tight" />
      </div>
      <button onClick={handleGeneratePassword} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Password</button>
      <button onClick={handleCopyPassword} disabled={!password} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline" style={{ cursor: !password ? 'not-allowed' : 'pointer' }}>Copy Password</button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {password && <div className="mt-4 text-center"><strong>Your Password:</strong> {password}</div>}
    </div>
  );
}

export default PasswordGenerator;
