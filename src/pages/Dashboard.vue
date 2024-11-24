<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import TodoList from "../components/TodoList.vue"
import ProfileCard from '../components/ProfileCard.vue';
import { useUsers } from '../stores/user';

const store = useUsers();
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        You're logged in!
                        
                    </div>
                </div>
                <!-- <TodoList /> -->
            </div>
        </div>

        <div>
            <ProfileCard :user="store.userData" />
        </div>
    </AuthenticatedLayout>
</template>
