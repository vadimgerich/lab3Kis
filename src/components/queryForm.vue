//форма для запитів
<template>
    <form @submit.prevent>
        Кількість дітей до <input type="number" v-model.number="query.countOfChilds"> та посада <input type="number" v-model="query.posada">
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити" @click="reset()">
    </form>
</template>
<script>
import { mapActions } from 'vuex';
export default { 
    data(){
        return{
            query: {
               countOfChilds: null,
                posada: null
            }
        }
    },
    methods:{
        ...mapActions(["getBugaltsByQuery"]),
        reset(){
            this.query.posada = this.query.countOfChilds= null;
            this.getBugaltsByQuery(this.query);
        },
        search(){            
            this.getBugaltsByQuery(this.query);
        }
    }
}
</script>