import React from 'react'

const Progress = ({progress = 0, status}) => {
  const getStatusColor = (currentStatus) => {
    switch (currentStatus) {
      case "In Progress":
        return "bg-cyan-500"
      case "Completed":
        return "bg-emerald-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`${getStatusColor(status)} h-full rounded-full transition-all duration-300`}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  )
};

export default Progress
