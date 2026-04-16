import { useState } from "react"
import "./TodoList.css"

type Task = {
    title: string
    completed: boolean
}

export const TodoList = () => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<string>("")

    const addTask = () => {
        if (newTask.trim() === "") return

        setTasks([...tasks, { title: newTask.trim(), completed: false }])
        setNewTask("")
    }

    const deleteTask = (index: number) => {
        const newTasks = [...tasks]
        newTasks.splice(index, 1)
        setTasks(newTasks)
    }

    const editTask = (index: number, newTitle: string) => {
        const newTasks = [...tasks]
        newTasks[index] = { ...newTasks[index], title: newTitle }
        setTasks(newTasks)
    }

    const toggleTask = (index: number) => {
        const newTasks = [...tasks]
        newTasks[index].completed = !newTasks[index].completed
        setTasks(newTasks)
    }

    const handleEditClick = (index: number) => {
        setEditingIndex(editingIndex === index ? null : index)
    }

    return (
        <div className="todo-list-container">
            <h1>To-do List</h1>
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <button onClick={addTask}>Adicionar Tarefa</button>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input id={`task-${index}`} type="checkbox" checked={task.completed} onChange={() => toggleTask(index)} />
                        {editingIndex === index ? (
                            <input
                                value={task.title}
                                onChange={(e) => editTask(index, e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <span
                                className={task.completed ? "completed" : ""}
                                style={{
                                    textDecoration: task.completed ? "line-through" : "none"
                                }}
                            >
                                {task.title}
                            </span>
                        )}
                        <button onClick={() => handleEditClick(index)}>
                            {editingIndex === index ? "Salvar" : "Editar"}
                        </button>
                        <button onClick={() => deleteTask(index)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}