import { useState } from "react"

const Dashboard = () => {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [updateIndex, setUpdateIndex] = useState(-1)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!todo) {
            return
        }

        if (updateIndex == -1) {
            setTodos([...todos, { id: Math.random(), todo, createAt: new Date().toLocaleString() }])
        } else {
            todos[updateIndex] = {...todos[updateIndex], todo }
            setUpdateIndex(-1)
        }

        setTodo("")
    }

    const onDeleteButtonClick = (index) => {
        setTodos(todos.filter((_, i) => i == index))
    }

    const onUpdateButtonClick = (index) => {
        setUpdateIndex(index)
        setTodo(todos[index].todo)
    }

    return (
        <div className="container todo">
            <h2>Todo List</h2>

            <form action="/add-todo" method="POST" onSubmit={handleSubmit}>
                <input type="text" name="todo" placeholder="Write here..." value={todo} onChange={(e) => setTodo(e.target.value)} />
                <button type="submit">{ updateIndex == -1 ? 'Add' : 'Update' }</button>
            </form>

            <ul className="todo-list">
                {todos.map((list, index) => (
                    <li key={list.id}>
                        <p>
                            <span>{list.todo}</span>
                            <span>{list.createAt}</span>
                        </p>

                        <div className="todo-list-ctrls">
                            <button type="button" onClick={() => onDeleteButtonClick(index)}>Delete</button>
                            <button type="button" onClick={() => onUpdateButtonClick(index)}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>

            {!todos.length && <p style={{ textAlign: 'center' }}>No todo found</p>}
        </div>
    )
}

export default Dashboard