<template>
  <div id="app">    
    <messageSystem></messageSystem>
    <searchString></searchString>
    <hr>
    <queryForm></queryForm>
    <hr>
    <input type="button" @click="showAddForm" value=" Додати персонал" />
    <bugaltTable></bugaltTable>
    <bugaltForm></bugaltForm>
  </div>
</template>

<script>
import Vue from "vue";
import bugaltTable from "./components/bugaltTable";
import bugaltForm from "./components/bugaltForm";
import searchString from "./components/searchString";
import queryForm from "./components/queryForm";
import messageSystem from "./components/messageSystem";
import axios from "axios";
import { mapActions } from 'vuex';

export default {
  //назва компоненту, співпадає із назвою файла  
  name: "app",
  //компоненти які використовуються в додатку
  components: {
    bugaltTable,
    bugaltForm,
    searchString,
    queryForm,
    messageSystem
  },
  //дані компонента на початку
  data() {
    return {        
    };
  },

  mounted() {    
    this.getBugalts(); 
  },  //методи 
  methods: {
    ...mapActions(["showMessageForTime", "getBugalts", "showAddForm"]),   
  },
  
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>