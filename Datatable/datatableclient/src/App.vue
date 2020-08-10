<template>
  <div id="app">
    <v-app id="inspire">

      <!-- Design/Layout -->
      <v-app-bar fixed absolute color="white">
        <v-toolbar-title>Datatable Customer</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn to="/" text> Home </v-btn>
      </v-app-bar>

      <v-content class="mt-5">
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <!-- Event handling & Props übergeben -->
            <router-view v-on:addUser="addUser" :customers="customers" :headers="headers" v-on:deleteItem="deleteCustomer"></router-view>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app>
        <span>&copy; 2020</span>
      </v-footer>

    </v-app>
  </div>

</template>

<script>
// Alternative Vuex
  export default {
    name: "App",
    components: {

    },
    data() {
      return {
        //Zentrale Sammlung von Kunden
        customers: [],
headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
          filterable: false,
        },
        { text: 'ID', value: 'id', filterable: false, },
        { text: 'E-Mail', value: 'email', filterable: false, },
        { text: 'Address', value: 'address', filterable: false, },
        { text: 'City', value: 'city' , filterable: false,},
        { text: 'ZIP', value: 'zip', filterable: true, },
        { text: 'State', value: 'state', filterable: false, },
        { text: 'Actions', value: 'actions', sortable: false },
      ]     };
    },
    methods: {
      //Modifikation der zentralen Sammlung
      addUser: function(user){
        this.customers.push(user);
      },
      deleteCustomer: function(selected){
        this.customers.splice(this.customers.indexOf(selected), 1)
      }
    },
  };
</script>