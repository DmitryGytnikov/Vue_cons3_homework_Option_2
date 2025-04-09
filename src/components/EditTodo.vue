<script setup>
import { ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const tasks = ref([])
const task = ref({
  id: 0,
  description: '',
  isCompleted: false,
})

const getTodos = () => {
  tasks.value = JSON.parse(localStorage.getItem('tasks'))
}

const getTask = () => {
  task.value = tasks.value.find((task) => task.id === +route.params.id)
}

getTodos()
getTask()

const saveTask = () => {
  tasks.value = tasks.value.map((currentTask) => {
    if (currentTask.id === +route.params.id) {
      currentTask.description = task.value.description
    }
    return currentTask
  })

  localStorage.setItem('tasks', JSON.stringify(tasks.value))

  router.push({ name: 'home' })
}
</script>

<template>
  <div>params id:{{ route.params.id }}</div>
  <div>Create Todo</div>
  <label
    >Название задачи
    <input v-model="task.description" type="text" />
  </label>
  <button @click="saveTask">Сохранить</button>
</template>

<!-- <div class="container--edit">
    <h2>Редактировать задачу</h2>

    <form @submit.prevent="saveEditedTask" class="edit__form">
      <label for="edit-task">Название задачи</label>
      <input v-model="editedTask" type="text" placeholder="" id="edit-task" />
      <div>
        <button @click="cancelEditTask" class="edit__cancel" type="button">Отменить</button>
        <button class="edit__save" type="submit">Сохранить изменения</button>
      </div>
    </form>
  </div> -->

<style scoped>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
}

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
