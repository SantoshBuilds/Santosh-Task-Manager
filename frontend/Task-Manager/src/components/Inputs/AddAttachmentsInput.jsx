import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from 'react-icons/lu';

const AddAttachmentsInput = ({attachments = [], setAttachments}) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if(option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updateArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updateArr);
  };

  return (
    <div>
      <div className="space-y-2">
        {attachments.map((item, index) => (
          <div
            key={`${item}_${index}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-slate-500">
                <LuPaperclip className="shrink-0"/>
                <p className="truncate text-sm text-slate-700">{item}</p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"
              onClick={() => handleDeleteOption(index)}
              aria-label="Delete attachment"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
          <LuPaperclip className="text-slate-400"/>
          <input
            type="text"
            placeholder="Add file link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
        <button type="button" className="card-btn shrink-0" onClick={handleAddOption}>
          <HiMiniPlus className="text-lg"/> Add
        </button>
      </div>
    </div>
  )
}

export default AddAttachmentsInput
