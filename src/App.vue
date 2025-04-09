<script setup>
import { ref } from 'vue'
// import TodoTask from "./components/TodoTask.vue"
import { RouterView } from 'vue-router'
import CreateTodo from './components/CreateTodo.vue'
import EditTodo from './components/EditTodo.vue'
import HomePageTodo from './components/HomePageTodo.vue'

const tasks = ref([
  {
    id: 0,
    description: 'Изучить основы Vue',
    isCompleted: true,
  },
  {
    id: 1,
    description: 'Подготовиться к собеседованию',
    isCompleted: false,
  },
  {
    id: 2,
    description: 'Устроиться на работу',
    isCompleted: false,
  },
])

const newTask = ref('')

const editedTask = ref('')
const idForEditedTask = ref(0)

const isTransitionFromHome = ref(false)

const createTask = () => {
  document.getElementById('create-task').focus()
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)

  for (let i = 0; i < tasks.value.length; i++) {
    tasks.value[i].id = i
  }
}

const setCompletion = (id) => {
  tasks.value.find((task) => task.id === id).isCompleted = !tasks.value.find(
    (task) => task.id === id,
  ).isCompleted
}

const addTask = () => {
  if (newTask.value === '') return
  tasks.value.push({
    id: tasks.value.length + 1,
    description: newTask.value,
    isCompleted: false,
  })

  for (let i = 0; i < tasks.value.length; i++) {
    tasks.value[i].id = i
    // console.log(i)
  }

  newTask.value = ''
}

const cancelAddTask = () => {
  newTask.value = ''
}

const editTask = (id) => {
  // console.log(id)
  editedTask.value = tasks.value[id].description
  idForEditedTask.value = id
  isTransitionFromHome.value = true
  document.getElementById('edit-task').focus()
}

const saveEditedTask = () => {
  if (isTransitionFromHome.value === true) {
    tasks.value[idForEditedTask.value].description = editedTask.value
    editedTask.value = ''
    isTransitionFromHome.value = false
  } else {
    editedTask.value = ''
  }
}

const cancelEditTask = () => {
  editedTask.value = ''
  isTransitionFromHome.value = false
}
</script>

<template>
  <div class="container--home">
    <h2>Список задач</h2>
    <!-- <div>Значение текущее переменной tasks: {{ tasks }}</div> -->
    <a @click="createTask" class="create-link">Создать задачу</a>
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task"
      :class="{ 'task--completed': task.isCompleted }"
      @click="setCompletion(task.id)"
    >
      <p class="task__number">{{ task.id + 1 }} .</p>
      <p class="task__text">{{ task.description }}</p>
      <div>
        <button @click.stop="deleteTask(task.id)" class="task__delete">Удалить</button>
        <button @click.stop="editTask(task.id)" class="task__edit">Редактировать</button>
      </div>
    </div>
  </div>

  <div class="container--create">
    <h2>Создать задачу</h2>
    <!-- <div>Значение текущее newTask: {{ newTask }}</div> -->

    <form @submit.prevent="addTask" class="create__form">
      <label for="create-task">Название задачи</label>
      <input v-model="newTask" type="text" placeholder="" id="create-task" />
      <div>
        <button @click="cancelAddTask" class="create__cancel" type="button">Отменить</button>
        <button class="create__save" type="submit">Сохранить</button>
      </div>
    </form>
  </div>

  <div class="container--edit">
    <h2>Редактировать задачу</h2>
    <!-- <div>Значение текущее editedTask: {{ editedTask }}</div>
    <div>Значение текущее idForEditedTask: {{ idForEditedTask }}</div>
    <div>Значение текущее isTransitionFromHome: {{ isTransitionFromHome }}</div> -->

    <form @submit.prevent="saveEditedTask" class="edit__form">
      <label for="edit-task">Название задачи</label>
      <input v-model="editedTask" type="text" placeholder="" id="edit-task" />
      <div>
        <button @click="cancelEditTask" class="edit__cancel" type="button">Отменить</button>
        <button class="edit__save" type="submit">Сохранить изменения</button>
      </div>
    </form>
  </div>

  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <br />
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <br />
    <RouterLink to="/create">Сreate</RouterLink>
    <br />
    <RouterLink to="/edit">Edit</RouterLink>
  </nav>
  <!-- :tasks="tasks" -->

  <home-page-todo
    @create-task="createTask($event)"
    @set-completion="setCompletion($event)"
    @delete-task="deleteTask($event)"
    @edit-task="editTask($event)"
    :tasks="tasks"
  >
  </home-page-todo>
  <create-todo class="visually-hidden"></create-todo>
  <edit-todo class="visually-hidden"></edit-todo>
  <div class="line"></div>

  <RouterView />
</template>

<style scoped>
/* скрытые компоненты */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

/* удалить */
.line {
  width: 100%;
  height: 20px;
  background-color: red;
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
}

.container--home {
  width: 412px;
  margin: 0 auto;
  padding: 12px;
  background-color: #e6edf9;
  border-bottom: 2px solid #ffffff;
}

.container--home h2 {
  margin-bottom: 12px;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;

  text-align: center;
}

.create-link {
  display: block;

  /* height: 100%; */
  /* width: 73px; */
  padding: 8px 15px;
  margin-bottom: 8px;

  text-align: center;
  font-size: 16px;
  font-weight: 500;

  line-height: 1;
  color: #67c23a;

  outline: none;
  text-decoration: none;
  border: 2px solid #b3e19d;
  border-radius: 5px;
  /* background-color: #2199e8; */

  display: block;
  cursor: pointer;

  transition: all 0.3s ease;
}

.create-link:hover,
.create-link:focus,
.create-link:active {
  background-color: #67c23a;
  color: #fffff3;
  border: 2px solid #67c23a;
}

.task {
  border: 1px solid #9ca3af;
  border-radius: 5px;
  min-height: 96px;
  width: 100%;

  margin-bottom: 20px;
  padding: 12px;

  display: flex;
  align-items: center;
  cursor: pointer;
}

.task--completed {
  background-color: rgb(220 252 231);
}

.task--completed .task__text {
  text-decoration: line-through;
}

.task__number {
  width: 30px;
  flex-shrink: 0;
}

.task__text {
  flex-grow: 1;
  padding-right: 10px;
}

.task div {
  flex-shrink: 0;
  align-self: stretch;
  width: 130px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task__delete {
  height: 32px;
  width: 100%;

  font-weight: 600;
  color: #f56c93;

  border: 2px solid #facbcb;
  border-radius: 5px;
  background-color: #fef0f0;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease;
}

.task__delete:hover,
.task__delete:focus,
.task__delete:active {
  background-color: #f56c6c;
  color: #fffff6;
  border: 2px solid #f56c6c;
}

.task__edit {
  height: 32px;
  width: 100%;

  font-weight: 600;
  color: #40b4ff;

  border: 2px solid #a0cfff;
  border-radius: 5px;
  background-color: #ecf5ff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease;
}

.task__edit:hover,
.task__edit:focus,
.task__edit:active {
  background-color: #409eff;
  color: #f3ffff;
  border: 2px solid #409eff;
}

/* _______ */

.container--create {
  width: 412px;
  margin: 0 auto;
  padding: 12px;
  background-color: #e6edf9;
  border-bottom: 2px solid #ffffff;
}

.container--create h2 {
  margin-bottom: 12px;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;

  text-align: center;
}

.create__form label {
  display: block;
  margin-bottom: 8px;
}

.create__form input {
  display: block;

  height: 35px;
  width: 100%;

  padding: 1px 10px;

  margin-bottom: 18px;

  font-style: normal;
  font-weight: 400;
  /* font-size: 1rem; */
  color: black;

  border: 1px solid #9ca3af;
  border-radius: 5px;
  outline: none;
  background-color: #fefefe;

  transition: all 0.4s ease;
}

.create__form input::placeholder {
  font-style: normal;
  font-weight: 400;
  color: black;
}

.create__form input:hover {
  border-color: #c0c4cc;
}

.create__form input:focus,
.create__form input:active {
  border-color: #a0cfff;
}

.create__form div {
  display: flex;
}

.create__cancel {
  width: 50%;
  height: 32px;

  font-weight: 600;
  color: #f56c93;

  border: 2px solid #facbcb;
  border-radius: 5px;
  background-color: #fef0f0;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease;
}

.create__cancel:hover,
.create__cancel:focus,
.create__cancel:active {
  background-color: #f56c6c;
  color: #fffff6;
  border: 2px solid #f56c6c;
}

.create__save {
  width: 50%;
  height: 32px;

  font-weight: 600;
  color: #40b4ff;

  border: 2px solid #a0cfff;
  border-radius: 5px;
  background-color: #ecf5ff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease;
}

.create__save:hover,
.create__save:focus,
.create__save:active {
  background-color: #409eff;
  color: #f3ffff;
  border: 2px solid #409eff;
}

/* _______ */

.container--edit {
  width: 412px;
  margin: 0 auto;
  padding: 12px;
  background-color: #e6edf9;
  border-bottom: 2px solid #ffffff;
}

.container--edit h2 {
  margin-bottom: 12px;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;

  text-align: center;
}

.edit__form label {
  display: block;
  margin-bottom: 8px;
}

.edit__form input {
  display: block;

  height: 35px;
  width: 100%;

  padding: 1px 10px;

  margin-bottom: 18px;

  font-style: normal;
  font-weight: 400;
  color: black;

  border: 1px solid #9ca3af;
  border-radius: 5px;
  outline: none;
  background-color: #fefefe;

  transition: all 0.4s ease;
}

.edit__form input::placeholder {
  font-style: normal;
  font-weight: 400;
  color: black;
}

.edit__form input:hover {
  border-color: #c0c4cc;
}

.edit__form input:focus,
.edit__form input:active {
  border-color: #a0cfff;
}

.edit__form div {
  display: flex;
}

.edit__cancel {
  width: 50%;
  height: 32px;

  font-weight: 600;
  color: #f56c93;

  border: 2px solid #facbcb;
  border-radius: 5px;
  background-color: #fef0f0;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease;
}

.edit__cancel:hover,
.edit__cancel:focus,
.edit__cancel:active {
  background-color: #f56c6c;
  color: #fffff6;
  border: 2px solid #f56c6c;
}

.edit__save {
  width: 50%;
  height: 32px;

  font-weight: 600;
  color: #40b4ff;

  border: 2px solid #a0cfff;
  border-radius: 5px;
  background-color: #ecf5ff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease;
}

.edit__save:hover,
.edit__save:focus,
.edit__save:active {
  background-color: #409eff;
  color: #f3ffff;
  border: 2px solid #409eff;
}
</style>
