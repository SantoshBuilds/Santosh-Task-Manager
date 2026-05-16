import React, { useRef, useState } from 'react'
import { LuUser , LuUpload, LuTrash } from 'react-icons/lu'

const ProfilephotoSelector = ({ image, setImage}) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if(file){
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-blue-100 bg-blue-50 shadow-inner">
          <LuUser className="text-4xl text-blue-600"/>

          <button
            type="button"
            className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
            onClick={onChooseFile}
            aria-label="Upload profile photo"
          >
            <LuUpload/>
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile preview"
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg shadow-slate-200"
          />

          <button
            type="button"
            className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600"
            onClick={handleRemoveImage}
            aria-label="Remove profile photo"
          >
            <LuTrash/>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilephotoSelector
