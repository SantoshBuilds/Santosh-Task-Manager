import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList = [], setTodoList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...(todoList || []), option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArr = (todoList || []).filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      <div className="space-y-2">
        {todoList.map((item, index) => (
          <div
            key={item + index}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
          >
            <p className="min-w-0 text-sm text-slate-700">
              <span className="mr-3 text-xs font-bold text-slate-400">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>
              <span className="break-words">{item}</span>
            </p>
            <button
              type="button"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"
              onClick={() => handleDeleteOption(index)}
              aria-label="Delete checklist item"
            >
              <HiOutlineTrash className="text-lg" />
            </button>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOption();
        }}
      >
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Enter task"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="form-input mt-0"
          />

          <button className="card-btn shrink-0" type="submit">
            <HiMiniPlus className="text-lg" /> Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoListInput;
