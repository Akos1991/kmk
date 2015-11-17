Meteor.publish('posts',function(){
    return Posts.find({}, { sort: {createdAt: -1}, limit: 8 });
});

Meteor.publish('chatMessages',function(){
    return Messages.find({});
});

Meteor.publish('onlineUsers',function(){
    return Meteor.users.find({'status.online':true},{username:1});
});

Meteor.publish('userIds', function () {
    return Meteor.users.find({}, {fields: {_id: 1, username: 1, profile: 1}});
});

Meteor.methods({
    addPost: function(post) {
        if(Meteor.user()) {
            Posts.insert({
                userId:  Meteor.user()._id,
                post: post,
                createdAt: new Date()
            });
        }
    },
    updateMsg: function(msg,session_id){
        if(Meteor.user()){
            Messages.update({"_id":session_id},{$push:{messages:{
                name: Meteor.user().username,
                text: msg,
                createdAt: new Date()
            }}})
        }
    },
    newMsg: function(id){
        if(Meteor.user()){
            Messages.insert({chatIds:[id , Meteor.userId()],messages:[]});
        }
    }
});