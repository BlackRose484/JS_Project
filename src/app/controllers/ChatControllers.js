

class ChatController{
    chatRoom(req,res,next){
        res.render('chat/chatRoom');
    }
}

module.exports = new ChatController;