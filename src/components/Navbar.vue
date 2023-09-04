<template>
    <div class="hello">
        <v-app-bar color="purple" elevation="7" shaped>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Tower</v-toolbar-title>
            <v-btn @click="navigate('/')" :disabled="this.currRout === 'Home'" prepend-icon="$vuetify" variant="tonal"
                style="margin: 10px;">
                Home
            </v-btn>
            <v-btn @click="navigate('/Map')" :disabled="this.currRout === 'Map'" prepend-icon="$vuetify" variant="tonal"
                style="margin: 10px;">
                Map
            </v-btn>
            <v-btn @click="navigate('/Charts')" :disabled="this.currRout === 'Charts'" prepend-icon="$vuetify" variant="tonal"
                style="margin: 10px;">
                Statistics
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="GoToMap" prepend-icon="$vuetify" variant="tonal" style="margin: 10px;">
                Login
            </v-btn>
        </v-app-bar>
    </div>
</template>
  
<script>
export default {
    name: "Navbar",
    props: {
        msg: String
    },
    data: function () {
        return {
            currRout: 'Home'
        }
    },
    methods: {
        navigate(url) {
            this.$router.push(url)
            this.currRout = this.$router.currentRoute.name
        },
        currRout() { this.$router.currentRoute.name },
    }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>