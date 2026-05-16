import React, {useState} from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({value, onChange, label, placeholder, type}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="input-box">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400"
          value={value}
          onChange={onChange}
        />

        {type === 'password' && (
          <button
            type="button"
            className="text-slate-500 hover:text-blue-600"
            onClick={toggleShowPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input
