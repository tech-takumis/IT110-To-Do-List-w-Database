<script setup>
import { useRoute } from 'vue-router'
import { useUsers } from '@/stores/user'
import { computed, ref } from 'vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import Checkbox from '@/components/Checkbox.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const route = useRoute()

const store = useUsers()

const form = ref({
    email: '',
    password: '',
    remember: false,
})

const processing = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)

const status = route.query.reset?.length > 0 ? atob(route.query.reset) : null

const submitLogin = () => {
    store.login(form, setErrors, processing)
}

const handleOAuthLogin = (provider) => {
    try {
        window.location.href = `http://localhost:8000/auth/${provider}/redirect`
    } catch (error) {
        console.log("Error"+error)
    }
}
</script>

<template>
    <GuestLayout>
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <ValidationErrors class="mb-4" :errors="errors" />

        <form @submit.prevent="submitLogin">
            <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="username" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox
                        v-model="form.remember"
                        name="remember"
                        :checked="form.remember" />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <router-link
                    to="/forgot-password"
                    class="underline text-sm text-gray-600 hover:text-gray-900">
                    Forgot your password?
                </router-link>
                <PrimaryButton class="ml-4" :processing="processing">
                    Login
                </PrimaryButton>
            </div>
        </form>
        <div class="mt-6 grid grid-cols-3 gap-3">
            <div>
                <button
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    @click="handleOAuthLogin('google')">
                    <span class="sr-only">Sign in with Google</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <!-- Google icon SVG -->
                    </svg>
                    Google
                </button>
            </div>
            <div>
                <button 
                    class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    @click="handleOAuthLogin('facebook')">
                    <span class="sr-only">Sign in with Facebook</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <!-- Facebook icon SVG -->
                    </svg>
                    Facebook
                </button>
            </div>
            <div>
                <button 
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                @click="handleOAuthLogin('github')" >
                    <span class="sr-only">Sign in with GitHub</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <!-- GitHub icon SVG -->
                    </svg>
                    Github
                </button>
            </div>
        </div>
    </GuestLayout>
</template>
