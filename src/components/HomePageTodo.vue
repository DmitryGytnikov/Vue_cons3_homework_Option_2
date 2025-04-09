<script setup>
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
    default: [{}],
  },
})

// console.log(props.tasks)

const emit = defineEmits(['createTask', 'setCompletion', 'deleteTask', 'editTask'])

const createTask = () => {
  emit('createTask')
}

// const idForEmmit = ref(0)

// const setCompletionDop = (index) => {
//   idForEmmit = index
//   setCompletion()
// }

const setCompletion = () => {
  emit('setCompletion', props.tasks[idForEmit].id)
}

const deleteTask = () => {
  emit('deleteTask', props.tasks.id)
}

const editTask = () => {
  emit('editTask', props.tasks.id)
}
</script>

<template>
  <div class="container--home">
    <h2>Список задач</h2>
    <!-- <div>Значение текущее переменной tasks: {{ tasks }}</div> -->
    <!-- <a @click="createTask" class="create-link">Создать задачу</a> -->
    <RouterLink @click="createTask" class="create-link" to="/create">Создать задачу</RouterLink>
    <div
      v-for="(task, index) in tasks"
      :key="task.id"
      class="task"
      :class="{ 'task--completed': task.isCompleted }"
      @click="setCompletion(index)"
    >
      <p class="task__number">{{ task.id + 1 }} .</p>
      <p class="task__text">{{ task.description }}</p>
      <div>
        <button @click.stop="deleteTask(task.id)" class="task__delete">Удалить</button>
        <!-- <button @click.stop="editTask(task.id)" class="task__edit">Редактировать</button> -->
        <RouterLink @click.stop="editTask(task.id)" class="task__edit" to="/edit">
          Редактировать
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
