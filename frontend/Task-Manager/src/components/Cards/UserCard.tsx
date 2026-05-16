import React from 'react'
import { LuPencil, LuTrash2 } from 'react-icons/lu'
import UserAvatar from '../UserAvatar'

const UserCard = ({userInfo, onEdit, onDelete}) => {
  return (
    <div className="user-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar
            src={userInfo?.profileImageUrl}
            name={userInfo?.name}
            alt={userInfo?.name || 'Avatar'}
            className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-950">{userInfo?.name}</p>
            <p className="truncate text-xs text-slate-500">{userInfo?.email}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-700"
            onClick={onEdit}
            aria-label={`Edit ${userInfo?.name || 'member'}`}
          >
            <LuPencil />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"
            onClick={onDelete}
            aria-label={`Remove ${userInfo?.name || 'member'}`}
          >
            <LuTrash2 />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  )
}

export default UserCard

const StatCard = ({label, count, status}) => {
  const getStatusTagColor = () => {
    switch(status){
      case "In Progress":
        return "text-cyan-700 bg-cyan-50 border-cyan-100";
      case "Pending":
        return "text-blue-700 bg-blue-50 border-blue-100";
      default:
        return "text-emerald-700 bg-emerald-50 border-emerald-100";
    }
  }

  return(
    <div className={`rounded-xl border px-3 py-2 text-center ${getStatusTagColor()}`}>
      <p className="text-lg font-extrabold leading-none">{count}</p>
      <p className="mt-1 text-[11px] font-semibold">{label}</p>
    </div>
  )
}
