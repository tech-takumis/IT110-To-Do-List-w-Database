<template>
    <div class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="sm:flex sm:items-center px-6 py-4">
        <img
          class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-24 sm:h-32 rounded-full"
          :src="user?.avatar || 'https://via.placeholder.com/150'"
          :alt="user?.name || 'unknown user'"
        />
        <div class="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <p class="text-xl font-bold text-gray-900">{{ user?.name || 'Guest User' }}</p>
          <div class="mt-4">
            <button
              class="text-purple-500 hover:text-white hover:bg-purple-500 border border-purple-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
              @click="connect"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
      <div class="border-t px-6 py-4">
        <div class="flex items-center mb-2">
          <svg class="h-4 w-4 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span class="text-sm text-gray-600">{{ user?.email || 'No email available' }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  defineProps({
    user: {
      type: Object,
      required: true,
      default: () => ({})
    }
  })
  
  const connect = () => {
    alert(`Connecting with ${user?.name}`);
  };
  </script>