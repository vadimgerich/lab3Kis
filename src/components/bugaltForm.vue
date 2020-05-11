// Форма для додавання/редагування книги
<template>
    <form v-if="visible" @submit.prevent> <!-- якщо форма видима то показати її і відмінити надсилання запиту за замовчуванням-->
        <label> Піб <input type="text" v-model="bugalt.pib" required> </label> <br>
        <label> Посада <setInput v-model="bugalt.posada"> </setInput></label> <br>
        <label> Зарплата <input type="date" v-model.number="bugalt.payment"> </label> <br>
        <label> Кількість дітей<input type="number" v-model.number="bugalt.countOfChilds" min="0"> </label> <br>
        <label> Стаж <input type="number" v-model.number="bugalt.stage" min="0" step="0.01"> </label> <br>  
        <input type="button" @click="save" value="Зберегти">     
         <input type="button" @click="hideForm" value="Відміна">   
    </form>
</template>

<script>
import setInput from "./setInput";
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: "bugaltForm",   
    data(){
        return{            
        }
    },
    components:{
        setInput
    },
    computed:{
        ...mapState({
            bugalt:"formBugalt",
            visible:"formVisible",
            newMode:"formNewMode"
        })
    },
    methods:{
        ...mapActions(["patchBugalt","postBugalt"]),
        ...mapMutations(["hideForm"]),
        async save(){
            if (this.newMode)
                await this.postBugalt(this.bugalt);
            else
                await this.patchBugalt(this.bugalt);    
            this.hideForm();         
        }
    }
}
</script>
<style scoped>
    form{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white ;
    }
</style>