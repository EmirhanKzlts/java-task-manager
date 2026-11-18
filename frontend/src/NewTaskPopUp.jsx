
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useCreateTask } from './hooks/useQuery';

const NewTaskPopUp = ({ open, setOpen}) => {

    const handleClose = () => { reset(); setOpen(false); };

    const createTaskMutation = useCreateTask();

    const createNewTaskHandler = (data) => {
        createTaskMutation.mutate(data, {
            onSuccess: () => {
                reset();
                setOpen(false);
            }
        })
    }

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    return (

        <Modal
        isOpen = {open}
        onRequestClose = {handleClose}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
        className="bg-gray-800 w-[30%] h-[50%] p-6 rounded-xl"
        >
            <div className='flex flex-col items-center justify-center'>
                <h1 className="font-roboto text-3xl text-gray-200">
                    New Task
                </h1>

                <form 
                    onSubmit={handleSubmit(createNewTaskHandler)}
                    className='flex flex-col gap-4 w-[65%] mt-6'
                >

                    <input 
                        type="text"
                        placeholder='Enter task'
                        {...register("title", {required: true,})}
                        className='bg-white rounded-xl p-2'
                    />

                    <input 
                        type="datetime-local"
                        min={new Date().toISOString().slice(0,16)}
                        {...register("expiresAt", {required: true,})}
                        className='bg-white rounded-xl p-2'
                    />

                    <div className='flex justify-between mt-4 '>

                        <button 
                            type='submit'
                            className="font-roboto text-xl text-gray-800 bg-white hover:bg-gray-300 cursor-pointer rounded-xl px-4 py-2"
                        >
                            Submit
                        </button>

                        <button
                            type='button'
                            className="font-roboto text-xl text-gray-800 bg-white hover:bg-gray-300 cursor-pointer rounded-xl px-4 py-2"
                            onClick={handleClose}
                        >
                            Close
                        </button>

                    </div>

                </form>

            </div>

        </Modal>

    )
}

export default NewTaskPopUp