<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Todo List</h1>
    <div class="mb-4">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Add a new todo"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <ul class="space-y-2">
      <li v-for="todo in todos" :key="todo.id" class="flex items-center justify-between bg-gray-100 p-3 rounded-md">
        <div class="flex items-center">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo)"
            class="mr-2 form-checkbox h-5 w-5 text-blue-600"
          />
          <span
            :class="{ 'line-through': todo.completed }"
            @click="editTodo(todo)"
            class="cursor-pointer"
          >{{ todo.title }}</span>
        </div>
        <button @click="deleteTodo(todo.id)" class="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useUsers } from '../stores/user';
import axios from '../lib/axios';


const store = useUsers()

const user = store.userData
const todos = ref([]);
const newTodo = ref('');

const API_URL = '/api/todos';

const fetchTodos = async () => {
  try {
    const response = await axios.get(`/api/user/${user.id}/todos`);
    todos.value = response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

const addTodo = async () => {
  if (newTodo.value.trim()) {
    try {
      const response = await axios.post(API_URL, {
        title: newTodo.value,
        user_id: user.id,
        completed: false
      });
      todos.value.push(response.data.task);
      newTodo.value = '';
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
};

const toggleTodo = async (todo) => {
  try {
    const response = await axios.put(`${API_URL}/${todo.id}`, {
      ...todo,
      completed: !todo.completed
    });
    const index = todos.value.findIndex(t => t.id === todo.id);
    todos.value[index] = response.data.task;
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
};

const editTodo = async (todo) => {
  const newTitle = prompt('Edit todo:', todo.title);
  if (newTitle !== null && newTitle.trim() !== '') {
    try {
      const response = await axios.put(`${API_URL}/${todo.id}`, {
        ...todo,
        title: newTitle
      });
      const index = todos.value.findIndex(t => t.id === todo.id);
      todos.value[index] = response.data.task;
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  }
};

const deleteTodo = async (id) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      todos.value = todos.value.filter(t => t.id !== id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
};

onBeforeMount(fetchTodos);
</script>