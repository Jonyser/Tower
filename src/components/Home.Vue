<template>
    <div class="hello">
        <h1>Home Page</h1>
        <v-app-bar color="purple" elevation="7" shaped>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Hi, I'm an AppBar</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="GoToMap" prepend-icon="$vuetify" variant="tonal" style="margin: 10px;">
                Go to Map
            </v-btn>
        </v-app-bar>
        <hr>

    </div>
</template>
  
<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    methods: {
        GoToMap() {
            this.$router.push('/Map')
        }
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