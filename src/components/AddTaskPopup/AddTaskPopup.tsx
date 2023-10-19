import s from './AddTaskPopup.module.css'
import {useState} from "react";

type Props = {
  isOpened: boolean
  onClose: () => void
  addTask: (task: string) => void
}

const AddTaskPopup = ({isOpened, onClose, addTask}: Props) => {
  const [task, setTask] = useState('')

  return (
    <div onClick={onClose} className={isOpened ? `${s.popup} ${s.popup_visible}` : `${s.popup}`}>
      <div onClick={(e) => e.stopPropagation()} className={s.popup__content}>
        <p>Название:</p>
        <input value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={() => addTask(task)}>Добавить</button>
      </div>
    </div>
  );
};

export default AddTaskPopup;
