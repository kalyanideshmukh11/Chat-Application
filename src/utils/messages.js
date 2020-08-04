const emoji= require('node-emoji')
const generateMessage = (username, textContent) => {
    return {
        username,
        text: emoji.emojify(textContent) ,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (username, url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}