import io from 'socket.io-client'//package for client

// connect sever, get a connection object
const socket = io('ws://localhost:4000')
// receive data from server
socket.on('receiveMsg', function (data) {
  console.log('The client receives the message sent by the server:', data)
})

// send data 
socket.emit('sendMsg', {name: 'abc'})
console.log('The client sends a message to the server:', {name: 'abc'}) 