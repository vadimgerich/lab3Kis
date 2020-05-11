// рядок пошуку 
<template>
    <form @submit.prevent>
        <input type="text" v-model="searchString">
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити пошук" @click="clear()">
    </form>
</template>
<script>
import {mapMutations} from 'vuex';
export default {        
    data(){
        return{
           searchString:""   
        }
    },
    methods:{
        ...mapMutations(["setSerchString"]),
        search(){            
            this.setSerchString(this.searchString);
        },
        clear(){
            this.searchString ="";
            this.setSerchString(this.searchString);
        }
    }
}
</script>
<style scoped>

</style>