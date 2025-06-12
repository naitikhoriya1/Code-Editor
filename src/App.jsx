import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-dark text-text-light">
      {/* Top Header/Navbar */}
      <header className="bg-secondary-dark p-4 border-b border-border-dark shadow-md flex items-center justify-between">
        {/* Add more header elements here, e.g., Run, Share, Settings buttons */}
        <div className="flex items-center space-x-4">
          {/* Placeholder for settings/share etc. */}
          <button className="btn btn-primary flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.25A2.25 2.25 0 0 0 3 7.5v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25V7.5A2.25 2.25 0 0 0 14.25 5.25H5.25Z"
              />
            </svg>
            <span>File</span>
          </button>
          <button className="btn btn-primary flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.49 1.37l-.456 1.217c-.133.355-.072.751.124 1.076.044.073.087.147.127.22.184.332.496.582.87.645l1.281.213c.542.09.94.56.94 1.11v2.594c0 .55-.398 1.02-.94 1.11l-1.281.213c-.374.063-.686.313-.87.645a1.125 1.125 0 0 1-.127.22c-.196.324-.257.72-.124 1.075l.456 1.217a1.125 1.125 0 0 1-.49 1.37l-2.247 1.296a1.125 1.125 0 0 1-1.37-.49l-1.217-.456c-.355-.133-.751-.072-1.076.124a1.125 1.125 0 0 1-.22.127c-.332.184-.582.496-.645.87l-.213 1.281c-.09.542-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a1.125 1.125 0 0 1-.22-.127c-.324-.196-.72-.257-.124-1.075L3.6 6.134a1.125 1.125 0 0 1 .49-1.37l2.247-1.296a1.125 1.125 0 0 1 1.37.49l.456 1.217c.133.355.751.072 1.076-.124.073-.044.147-.087.22-.127ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
              />
            </svg>
            <span>Settings</span>
          </button>
          <button className="btn btn-secondary flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186A9.75 9.75 0 0 1 12 15.75c2.51 0 4.847-.655 6.876-1.772m-6.876 1.772a2.25 2.25 0 1 1 0 2.186m0-2.186A9.75 9.75 0 0 0 12 12.75c2.51 0 4.847.655 6.876 1.772m0-2.186A9.75 9.75 0 0 1 12 10.25c2.51 0 4.847-.655 6.876-1.772M12 12.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z"
              />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-16 bg-secondary-dark border-r border-border-dark flex flex-col items-center py-4 space-y-6">
          {/* Placeholder for sidebar icons */}
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-light"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V9.75m-8.25 6h2.25"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75A2.25 2.25 0 0 1 19.5 9v1.5a2.25 2.25 0 0 1-2.25 2.25H15a2.25 2.25 0 0 1-2.25-2.25V9a2.25 2.25 0 0 1 2.25-2.25h2.25ZM10.5 7.5V3m0 0L9.342 3.61c1.623 4.493 3.57 7.007 6.107 8.25m-8.62-7.517V3m0 0L7.842 3.61c1.623 4.493 3.57 7.007 6.107 8.25m-8.62-7.517V3M3 10.5h1.5M3 10.5a8.962 8.962 0 0 1 3-5.69m0 0a8.962 8.962 0 0 1 3-5.69M3 4.5h1.5M10.5 7.5H1.5m0 0h1.5"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25m-9-9h5.625c.621 0 1.125.504 1.125 1.125v17.25c0 .621-.504 1.125-1.125 1.125H5.625"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25H21"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 18 4.5H6.75a4.5 4.5 0 0 0-4.5 4.5v6Z"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 12 18c2.305 0 4.47-.612 6-1.664v-14.25c-1.932.351-3.952.512-6 .512Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042V3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 12 18m-9-1.5h1.5M9 15h1.5M12 12.75h1.5M15 10.5h1.5m-1.5 3H21m-3-3h.008v.008H18V10.5Zm-9 0h.008v.008H9V10.5Z"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 10.5-1.516 1.516a2.25 2.25 0 0 1-3.182 0l-1.516-1.516m5.21-6.19a9 9 0 1 0 3 9.453L19.5 19.5l1.5-1.5L21 16.5m-1.5-1.5h-.008v-.008H19.5v.008ZM12 6v.008H12V6Z"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12a7.5 7.5 0 0 1 15 0v2.25c0 1.157-.272 2.231-.745 3.21l-.31.685a.75.75 0 0 1-1.079.19l-2.073-1.803a.75.75 0 0 0-.91-.112l-.764.407a2.592 2.592 0 0 1-1.393 0L9.431 16.68a.75.75 0 0 0-.91.112L6.46 18.255a.75.75 0 0 1-1.079-.19l-.31-.685A7.5 7.5 0 0 1 4.5 14.25V12ZM12 9a.75.75 0 0 1 .75-.75h.008v.008H12V9Z"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125l3 3m0 0l3-3m-3 3v-6m7.5-6h7.5m-7.5 3h7.5m-7.5 3h7.5m-7.5 3h7.5M21 10.5V3.25a2.25 2.25 0 0 0-2.25-2.25H4.5A2.25 2.25 0 0 0 2.25 3.25v17.5A2.25 2.25 0 0 0 4.5 23H15"
              />
            </svg>
          </div>
          <div className="flex-grow"></div> {/* Spacer */}
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 0 18 12.75a9.72 9.72 0 0 0-3.752 2.252A12.006 12.006 0 0 1 12 21c-2.796 0-5.487-.765-7.87-2.122A9.72 9.72 0 0 0 6 12.75a9.72 9.72 0 0 0-3.752-2.252C1.196 10.278 1 10.584 1 10.75v3.5c0 .166.196.472.498.37A12.006 12.006 0 0 1 12 18c2.796 0 5.487-.765 7.87-2.122.302-.102.498.194.498.37v-3.5c0-.166-.196-.472-.498-.37Z"
              />
            </svg>
          </div>
          <div className="sidebar-icon flex items-center justify-center p-2 rounded-lg hover:bg-hover-dark cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 bg-primary-dark overflow-auto">
          <CodeEditor />
        </main>
      </div>
    </div>
  );
}

export default App;
