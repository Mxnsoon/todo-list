import s from './App.module.css'
import AddTaskPopup from "../AddTaskPopup/AddTaskPopup";
import React, {useEffect, useState} from "react";

function App() {

  const [isPopupOpened, setIsPopupOpened] = useState(false)
  const [tasksList, setTasksList] = useState<string[]>(JSON.parse(localStorage.getItem('todos')!) || []);
  const [chooseMode, setChooseMode] = useState(false)
  const [choosenTasks, setChoosenTasks] = useState<number[]>([])
  const [completedTasks, setCompletedTasks] = useState<string[]>(JSON.parse(localStorage.getItem('completed')!) || [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasksList))
    localStorage.setItem('completed', JSON.stringify(completedTasks))
  }, [tasksList, completedTasks])

  useEffect(() => {

  }, [])

  const openPopup = () => {
    setIsPopupOpened(true)
  }

  const closePopup = () => {
    setIsPopupOpened(false)
  }

  const addTask = (task: string) => {
    setTasksList([task, ...tasksList])
  }

  const moveTaskTop = (index: number) => {
    if (index > 0) {
      const arr = [...tasksList]
      const temp = arr[index]
      arr[index] = arr[index - 1]
      arr[index - 1] = temp
      setTasksList(arr)

    }
  }

  const moveTaskBottom = (index: number) => {
    if (index < (tasksList.length - 1)) {
      const arr = [...tasksList]
      const temp = arr[index]
      arr[index] = arr[index + 1]
      arr[index + 1] = temp
      setTasksList(arr)
    }
  }

  const removeTask = (i: number) => {
    const removedTask = tasksList[i]
    setTasksList(tasksList.filter((_, index) => index !== i))
    setCompletedTasks([...completedTasks, removedTask])
  }

  const restoreTask = (i: number) => {
    setCompletedTasks(completedTasks.filter((_, index) => index !== i))
    setTasksList([...tasksList, completedTasks[i]])
  }

  const removeTasks = () => {
    const notCompleted: string[] = tasksList.filter((_, index) => !choosenTasks.includes(index))
    const completed: string[] = tasksList.filter((_, index) => choosenTasks.includes(index))
    setTasksList(notCompleted)
    setCompletedTasks([...completed, ...completedTasks])
    setChoosenTasks([])
    setChooseMode(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.checked) {
      setChoosenTasks([...choosenTasks, index])
    } else {
      setChoosenTasks(choosenTasks.filter(el => el !== index))
    }
  }

  return (
    <>
      <div className={s.page}>
        <div className={s.container}>
          <div className={s.buttonsContainer}>
            <button onClick={openPopup}>Добавить задачу</button>
            <button onClick={() => setChooseMode(!chooseMode)}>Выбрать несколько задач</button>
            {choosenTasks.length >= 1 && <button onClick={() => removeTasks()}>Завершить выбранное</button>}
          </div>
          <div className={s.tasksList}>
            {tasksList.map((task, i) => {
              return (
                <div key={i} className={s.task}>
                  {chooseMode &&
                      <input defaultChecked={false} type='checkbox' onChange={(e) => handleChange(e, i)}/>}
                  <p>{task}</p>
                  <button className={s.taskButton} onClick={() => moveTaskTop(i)}>top</button>
                  <button className={s.taskButton} onClick={() => moveTaskBottom(i)}>bot</button>
                  <button className={s.taskButton} onClick={() => removeTask(i)}>remove</button>
                </div>
              )
            })}
            {completedTasks.map((task, i) => {
              return (
                <div key={i} className={s.task}>
                  <div className={s.completedTask}>{task}</div>
                  <button className={s.taskButton} onClick={() => restoreTask(i)}>Восстановить</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <AddTaskPopup addTask={addTask} isOpened={isPopupOpened} onClose={closePopup}/>
    </>
  )
}

export default App
