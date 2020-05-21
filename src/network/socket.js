import io from 'socket.io-client'
let socket = {}
const getsocket = () => {
	socket = io('ws://localhost:3001')
}
const sendMsg = function ({from, to, content}) {
  socket.emit('sendmsg', {from, to, content})
}

const recvMsg = function () {
  socket.on('recvmsg', data => {
    console.log(data)
    // socket.emit('sendmsg', data)
  })
}
const getsocketid = () => {
	return socket.id
}

export {
	getsocket,
	getsocketid,
	sendMsg,
	recvMsg
}