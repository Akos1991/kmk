Template.sidebar.helpers({
    onlineUsers:function(){
        return Meteor.users.find({ 'status.online': true , _id: {$ne: Meteor.userId()} });
    },
    onlineUsersCounter:function(){
        return Meteor.users.find({ 'status.online': true , _id: {$ne: Meteor.userId()} }).count();
    }
});

Template.sidebar.events({
    'click .user':function(){
        Session.set('currentId',this._id);

        var res = Messages.findOne({chatIds:{$all:[this._id,Meteor.userId()]}});
        if(res)
        {
            //conversation already exists
            Session.set('roomid',res._id);
        }
        else{
            //conversation not exists
            var newRoom = Meteor.call('newMsg', this._id);
            Session.set('roomid',newRoom);
        }
    }
});

Template.message.helpers({
    'msgs':function(){
        var result = Messages.findOne({'_id':Session.get('roomid')});
        var result = result.messages.reverse();
        return result;
    },
    'ownMessage':function(msgUserName){
        if(msgUserName == Meteor.user().username) {
            return true;
        }else{
            return false;
        }
    }
});

Template.input.events({
    'submit form': function(event) {
        if(event.target.msg.value !== ''){
            event.preventDefault();
            Meteor.call('updateMsg', event.target.msg.value,Session.get('roomid'));
            event.target.msg.value = '';
        }
    },
    'keypress textarea': function(event) {
        if(event.keyCode == 13) {
            if(event.target.value !== ''){
                event.preventDefault();
                Meteor.call('updateMsg', event.target.value,Session.get('roomid'));
                event.target.value = '';
            }
        }
    }
});