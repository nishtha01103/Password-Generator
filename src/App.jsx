import { useState, useCallback, useEffect, useRef, use } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  //ref hook
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 0; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(Password);
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
      alert("Password copied to clipboard!");
    }
  }, [Password, passwordRef]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="w-full min-h-screen max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center text-white mt-0 mb-8">
        Password Generator
      </h1>
      <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-orange-400">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3 bg-white text-gray-900"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="curson-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <lable>Length: {length}</lable>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberAllowed"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberAllowed">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charAllowed"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charAllowed">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
