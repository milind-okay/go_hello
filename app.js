// creating the websocket connection
var socket = new WebSocket("ws://localhost:8010/ws");

// when an update is received via ws connection, we update the model
socket.onmessage = function(evt){
    var newData = JSON.parse(evt.data);
    console.log(evt.data); //TODO: Remove in production
    tictactoe.gameState = newData;
};


// vuejs debug mode
Vue.config.debug = true; //TODO: Remove in production


// transistions
Vue.transition('board', {
    enterClass: 'bounceInDown',
    leaveClass: 'bounceOutDown'
});

var tictactoe = new Vue({
    el: '#tictactoe',
    data: {
        gameState: {
            GameOn: false,
            fields: [],
        },
        //Special Move coding scheme
        RESTART: 10,
    },
    computed: {
        row1: function() {
            return this.gameState.fields.slice(0,3);
        },
        row2: function() {
            return this.gameState.fields.slice(3,6);
        },
        row3: function() {
            return this.gameState.fields.slice(6,9);
        },
    },
    methods: {
        makeMove: function(fieldNum){
            socket.send(fieldNum);
        },
    }
});