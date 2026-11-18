import { useEffect, useState } from "react";
import { useCompleteTask, useDeleteTask, useEditTask } from "./hooks/useQuery"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditTaskPopUp from "./EditTaskPopUp";

const Card = ({ id, title, expiresAt, isCompleted}) => {

    const deleteMutation = useDeleteTask();
    const completeMutation = useCompleteTask();
    const editMutation = useEditTask();

    const [editTaskPopUp, setEditTaskPopUp] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const newTitle = title.charAt(0).toLocaleUpperCase() + title.slice(1);

    const newExpiresAt = new Date(expiresAt);
    const options = {
        month: 'long', 
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(newExpiresAt);
    const p = Object.fromEntries(parts.map(part => [part.type, part.value]));
    const newExpiresAtFormatted = `${p.month} ${p.day}, ${p.year} ${p.hour}:${p.minute}`;

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const isExpired = new Date(expiresAt) < now;

    return (
        <div className={`w-[60%] p-4 mb-6 rounded-2xl flex items-center overflow-x ${
            isCompleted ? "bg-green-300" : isExpired ? "bg-red-300" : "bg-gray-200"
        }`}
        >
            
            
            <div className="flex-1">
                <h1 className="font-roboto text-black text-2xl font-bold break-all">{newTitle}</h1>
                <p className="font-roboto text-xl text-gray-700">{`${!isExpired ? "Expires at" : "Expired at"} ${newExpiresAtFormatted}`}</p>
            </div>


            <div className="flex gap-3 px-6">

                {!isExpired && (
                    <button 
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
                            onClick={() => completeMutation.mutate(id)}
                    >
                        {isCompleted ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon/>}
                    </button>
                )}
                
                <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 cursor-pointer"
                        onClick={() => deleteMutation.mutate(id)}
                >
                    <DeleteIcon />
                </button>
        
                {!isExpired && (<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                        onClick={() => {setSelectedTaskId(id);
                                        setEditTaskPopUp(true);
                        }}
                >
                    <EditIcon/>
                </button>)}

            </div>

            <EditTaskPopUp
                open={editTaskPopUp}
                setOpen={setEditTaskPopUp}
                taskId={selectedTaskId}
            />

            
        </div>
    )
}

export default Card