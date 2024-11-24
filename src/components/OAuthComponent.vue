<script setup>
import { useRouter } from 'vue-router';
import { useUsers } from '../stores/user';
import { onBeforeMount } from 'vue';

const router = useRouter()
const store = useUsers()

onBeforeMount(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if(token){
        sessionStorage.setItem('authToken',token)
        store.authStatus = 200

        router.push({name: 'dashboard'})
    }else{
        router.push({name: 'welcome'})
    }

})
</script>