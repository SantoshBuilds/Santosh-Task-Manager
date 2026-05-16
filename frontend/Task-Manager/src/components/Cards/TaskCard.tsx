import React from 'react'
import Progress from '../Progress';
import AvatarGroup from "../AvatarGroup";
import { LuCalendarDays, LuCircleCheck, LuPaperclip } from 'react-icons/lu';
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-700 bg-cyan-50 border-cyan-200";
      case "Completed":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      default:
        return "text-blue-700 bg-blue-50 border-blue-200"
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Medium":
        return "text-amber-700 bg-amber-50 border-amber-200";
      default:
        return "text-rose-700 bg-rose-50 border-rose-200"
    }
  };

  return (
    <button
      type="button"
      className="group flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/80"
      onClick={onClick}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`status-pill ${getStatusTagColor()}`}>
          {status}
        </span>
        <span className={`status-pill ${getPriorityTagColor()}`}>
          {priority} Priority
        </span>
      </div>

      <div className="mt-4 flex-1">
        <h3 className="line-clamp-2 text-base font-bold text-slate-950 group-hover:text-blue-700">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <LuCircleCheck className="text-blue-500" />
              Task Done
            </span>
            <span className="text-slate-900">
              {completedTodoCount} / {todoChecklist.length || 0}
            </span>
          </div>
          <Progress progress={progress} status={status} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <LuCalendarDays /> Start
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {moment(createdAt).format("Do MMM YYYY")}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <LuCalendarDays /> Due
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {moment(dueDate).format("Do MMM YYYY")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <AvatarGroup avatars={assignedTo || []}/>
        {attachmentCount > 0 && (
          <div className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-blue-700">
            <LuPaperclip />
            <span className="text-xs font-bold">{attachmentCount}</span>
          </div>
        )}
      </div>
    </button>
  )
}

export default TaskCard
