<template>
 <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-dialog v-model="dialog" persistent scrollable max-width="800px">
                <v-card>
                    <v-card-title>{{modalTitle}}
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="search" label="Suchen ..." single-line hide-details clearable @input="clearSearch"></v-text-field>
                        <v-btn class="ma-2" tile icon @click="dialog = false">
                            <v-icon color="red">fas fa-window-close</v-icon>
                        </v-btn>

                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <!-- DataTable für Hausschlüssel -->
                        <v-data-table v-if="this.house == true"
                        :headers="hHeaders" 
                        :items="hKeys"
                        :search="search"
                        >

                        <!-- DataTable für Fahrzeugschlüssel -->
                        </v-data-table>
                        <v-data-table v-if="this.vehicle == true"
                        :headers="vHeaders" 
                        :items="vKeys"
                        :search="search">                    
                        </v-data-table>

                        <!-- DataTable für Lagerraumschlüssel -->
                        <v-data-table v-if="this.storage == true"
                        :headers="sHeaders" 
                        :items="sKeys"
                        :search="search">                        
                        </v-data-table>

                        <!-- Buttons für Business und Entfernen (Business-Button wird nur bei Fahrzeugen angezeigt) -->
                        <div class="text-center pt-2">
                            <v-btn color="success" class="mr-2" v-if="this.vehicle == true">Ins Business</v-btn>
                            <v-btn color="error">Entfernen</v-btn>
                        </div>
                    </v-card-text>
                </v-card>    
            </v-dialog>

                <v-flex xs12 sm8 md4>
                    <div class="keymenu"> 
                        <div class="content">
                            <v-layout row wrap>
                            <v-flex md6>
                                <v-btn style="min-height:100px" class ="x-large" block tile v-on:click="changeTitle(1); clearSearch()" @click.stop="dialog = true">
                                    <v-icon left size="50px" class="pr-10">fas fa-home</v-icon>
                                    Häuser
                                </v-btn> 
                            </v-flex>
                            <v-flex md6>
                                <v-btn style="min-height:100px" block tile v-on:click="changeTitle(2); clearSearch()" @click.stop="dialog = true">
                                    <v-icon left size="50px" class="pr-10">fas fa-car</v-icon>
                                    Fahrzeuge
                                </v-btn> 
                            </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                            <v-flex md12>
                                <v-btn style="min-height:100px" block tile v-on:click="changeTitle(3); clearSearch()" @click.stop="dialog = true">
                                    <v-icon left size="50px" class="pr-10">fas fa-warehouse</v-icon>
                                    Lagerräume
                                </v-btn> 
                            </v-flex>
                            </v-layout>
                        </div> 
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data () {
        return {
            dialogm1: '',
            dialog: false,
            modalTitle: '',
            storage: false,
            vehicle: false,
            house: false,
            vKeys: [],
            hKeys: [],
            sKeys: [],
            search: '',
            selected: [],
            hHeaders: [
                { text: 'ID', value: 'ID', align: 'left' },
                { text: 'Gekauft am', value: 'bought', align: 'left' },
            ],
            vHeaders: [
                { text: 'ID', value: 'ID', align: 'left' },
                { text: 'Fahrzeug', value: 'vehicle', align: 'left' },
                { text: 'Kennzeichen', value: 'numberplate', align: 'left' },
                { text: 'Gekauft am', value: 'bought', align: 'left' },
            ],
            sHeaders: [
                { text: 'ID', value: 'ID', align: 'left' },
                { text: 'Gekauft am', value: 'bought', align: 'left' },
            ]
        }
    },
    methods:{
        changeTitle: function(value){
            if (value == 1){
                this.modalTitle = "Hausschlüssel";
                this.house = true;
                this.vehicle = false;
                this.storage = false;
                console.log("Title: Haus");
                return this.modalTitle;
            }
            else if (value == 2){
                this.modalTitle = "Fahrzeugschlüssel";
                this.vehicle = true;
                this.house = false;
                this.storage = false;
                console.log("Title: Fahrzeug");
                return this.modalTitle;
            }
            else if(value == 3){
                this.modalTitle = "Lagerraumschlüssel";
                this.storage = true;
                this.house = false;
                this.vehicle = false;
                console.log("Title: Lagerraum");
                return this.modalTitle;
            }
        },
        clearSearch: function(){
            if(this.dialog == true)
            {
                this.search.value = '';
            }
        }
        
    },
    created() {
        //Fetch JSON (Hausschlüssel)
        fetch("https://api.myjson.com/bins/pwxu3")
                .then(response => response.json())
                .then(data => (this.hKeys = data));
        //Fetch JSON (Fahrzeugschlüssel)
        fetch("https://api.myjson.com/bins/jm697")
                .then(response => response.json())
                .then(data => (this.vKeys = data));
        //Fetch JSON (Lagerschlüssel)
        fetch("https://api.myjson.com/bins/a5t63")
                .then(response => response.json())
                .then(data => (this.sKeys = data));
    }
}
</script>

<style scoped>
.keymenu{
    background-color:#36464E;
    width: 600px;
    height: 300px;

    border-radius: 5px;
    border-top: 15px solid #DA7200;
    border-bottom: 5px solid #DA7200;

    display: flex;
    align-items: center;
    justify-content: center;
}
.content{
    width:90%;
}

.category{
    width: 100%;
}
</style>


