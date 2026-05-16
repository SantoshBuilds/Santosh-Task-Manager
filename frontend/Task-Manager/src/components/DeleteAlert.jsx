import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
      <p className="text-sm leading-6 text-slate-600">{content}</p>

      <div className="mt-6 flex justify-end">
        <button
          className="inline-flex items-center justify-center rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 hover:border-rose-300"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
