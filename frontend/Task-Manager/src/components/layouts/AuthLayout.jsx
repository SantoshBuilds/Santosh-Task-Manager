import React from 'react'
import UI_IMG from "../../assets/Images/Login_Ui_Bg.jpg"

const AuthLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-slate-950 md:grid md:grid-cols-[minmax(0,1fr)_minmax(360px,42vw)]">
      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-8 sm:px-8 lg:px-12">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/20">
              S
            </div>
            <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
              Team Task Manager
            </h1>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7">
            {children}
          </div>
        </div>
      </section>

      <section className="relative hidden overflow-hidden md:block">
        <img
          src={UI_IMG}
          className="h-full w-full object-cover"
          alt="Task manager interface preview"
        />
        <div className="absolute inset-0 bg-slate-950/20" />
        <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/15 p-5 text-white shadow-2xl backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Task Manager
          </p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight">
            Plan the day with clarity.
          </h2>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
