import React from 'react'

const InfoCard = ({label, value, color}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-extrabold text-slate-950">
            {value}
          </p>
        </div>
        <span className={`mt-1 h-3 w-3 rounded-full ${color}`} />
      </div>
    </div>
  )
}

export default InfoCard
