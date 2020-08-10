<template>
    <div id="editview">

        <v-card-title>
            <v-text-field v-model="search" label="ZIP Code" single-line hide-details autocomplete="no"
                append-icon="mdi-search">
            </v-text-field>
        </v-card-title>

        <v-data-table :search="search" :headers="headers" :items="customers" :items-per-page="5"
            class="elevation-1 m-5"> <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Customer Data</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" min-width="350px" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Customer</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="Name"
                                                :rules="[() => !!editedItem.name || 'Please enter your name']"
                                                :error-messages="errorMessages" required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.id" label="ID"
                                                :rules="[() => !!editedItem.id || 'This field is required']"
                                                :error-messages="errorMessages" required></v-text-field>
                      
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.email" label="E-Mail" v-text-field
                                        
                                                :rules="[() => !! editedItem.email || 'Please enter your email']"
                                                :error-messages="errorMessages" required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.address" label="Address"
                                                :rules="[() => !!editedItem.address || 'Please enter your address']"
                                                :error-messages="errorMessages" required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.city" label="City"
                                                :rules="[() => !!editedItem.city || 'Please enter your city']"
                                                :error-messages="errorMessages" required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.zip" label="ZIP"
                                                :rules="[() => !!editedItem.zip || 'Please enter your ZIP']"
                                                :error-messages="errorMessages" required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.state" label="Country"
                                                :rules="[() => !!editedItem.state || 'Please enter your state']"
                                                :error-messages="errorMessages" required>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">

                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

    </div>
</template>
<script>
    export default {
//Props erhalten
        name: "EditView",
        props: {
            customers: {
                type: Array,
                required: true
            },
            headers: {
                type: Array,
                required: true
            }
        }

        ,
        data: () => ({
            //variablen
            search: '',
            dialog: false,
            editedIndex: -1,
            editedItem: {
                name: '',
                id: 0,
                email: '',
                address: '',
                city: '',
                zip: 0,
                state: ''
            },
            defaultItem: {
                name: '',
                id: 0,
                email: '',
                address: '',
                city: '',
                zip: 0,
                state: ''
            },
        }),

        computed: {
            formTitle() {
                //Titel inm Modal geändert
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },


        methods: {

            editItem(item) {
                //Die Werte des ausgewählten Customers werden automatisch eingesetzt
                this.editedIndex = this.customers.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                //nachfragen ob der Benuter den Customer löschen will
                confirm('Are you sure you want to delete this item?') && this.$emit("deleteItem", item);
            },

            close() {
                //Modal schließen
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save() {
                // Änderungen speichern
                if (this.editedIndex > -1) {
                    Object.assign(this.customers[this.editedIndex], this.editedItem)
                } else {
                    this.$emit("addUser", this.editedItem)
                }
                this.close()
                this.search = '';
            },
        },
    }
</script>
<style></style>