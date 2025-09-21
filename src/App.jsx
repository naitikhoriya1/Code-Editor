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
        {/* Main Content Area */}
        <main className="flex-1 p-4 bg-primary-dark overflow-auto">
          <CodeEditor />
        </main>
      </div>
    </div>
  );
}

export default App;
