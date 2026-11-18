import { useState } from 'react'
import { useFetchTasks } from './hooks/useQuery';
import './App.css'
import Card from './Card';
import NewTaskPopUp from './NewTaskPopUp';
import SortIcon from '@mui/icons-material/Sort';
import DehazeIcon from '@mui/icons-material/Dehaze';

function App() {

  const { data = [], isLoading, error } = useFetchTasks();
  const [newTaskPopUp, setNewTaskPopUp] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");

  const filteredTasks = data.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "expired") {
      return !task.completed && new Date(task.expiresAt) < new Date();
    }

    if (filter === "active") {
      return !task.completed && new Date(task.expiresAt) > new Date();
    }

    return true;
  })

  const sortedTasks = [...filteredTasks].sort((a,b) => {
    const dateA = new Date(a.expiresAt);
    const dateB = new Date(b.expiresAt);

    switch (sort) {
      case "asc":
        return dateA - dateB;
      
      case "desc":
        return dateB - dateA;
      
      default:
        return 0;
    }
  });

  const handleSort = () => {
    setSort((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    })
  }

  return (
      <div className='min-h-screen bg-gray-800 flex flex-col items-center'>

        <h1 className='font-roboto text-5xl mt-10 text-gray-200 mb-8'>
          TASK TRACKER
        </h1>

        <button className='font-roboto bg-gray-200 p-4 rounded-2xl mb-8 hover:bg-gray-300 cursor-pointer'
                onClick={() => setNewTaskPopUp(true)}
        >
          Create New Task
        </button>

        <div className='w-[60%] flex gap-3 mb-4'>

          <div className='flex gap-0.5  bg-gray-400 shadow-inner w-fit rounded-xl'>

            <button className={`py-2 px-2 rounded-xl text-black font-roboto hover:bg-gray-200
                    ${
                      filter === "all" ? "bg-gray-200" : "bg-gray-400"
                    }`}
                    onClick={() => setFilter("all")}
            >
              View All
            </button>

            <button className={`py-2 px-2 rounded-xl text-black font-roboto hover:bg-gray-200
                    ${
                      filter === "active" ? "bg-gray-200" : "bg-gray-400"
                    }`}
                    onClick={() => setFilter("active")}
            >
              Active
            </button>
            
            <button className={`py-2 px-2 rounded-xl text-black font-roboto hover:bg-gray-200
                    ${
                      filter === "completed" ? "bg-gray-200" : "bg-gray-400"
                    }`}
                    onClick={() => setFilter("completed")}
            >
              Completed
            </button>

            <button className={`py-2 px-2 rounded-xl text-black font-roboto hover:bg-gray-200
                    ${
                      filter === "expired" ? "bg-gray-200" : "bg-gray-400"
                    }`}
                    onClick={() => setFilter("expired")}
            >
              Expired
            </button>

          </div>
            
            <button className="py-2 px-2 rounded-xl text-black font-roboto bg-gray-400 hover:bg-gray-200"
                    onClick={handleSort}
            >
              {sort === "desc" ? <SortIcon /> : sort === "asc" ? <SortIcon className='-scale-y-100'/> : <DehazeIcon />}
            </button>

        </div>

        {isLoading && (
          <p className='font-roboto text-3xl mt-10 text-gray-200 mb-8'>Loading...</p>
        )}

        {error && (
          <p className='font-roboto text-3xl mt-10 text-gray-200 mb-8'>Error ocurred.</p>
        )}

        {!isLoading && !error && data?.length === 0 && (
          <p className='font-roboto text-3xl mt-10 text-gray-200 mb-8'>You Have No Task</p>
        )}

        {!isLoading && !error && sortedTasks.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            title={task.title}
            expiresAt={task.expiresAt}
            isCompleted={task.completed}
          />
        ))}

        <NewTaskPopUp
          open={newTaskPopUp}
          setOpen={setNewTaskPopUp}
        />

      </div>
  )
}

export default App
