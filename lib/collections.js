Messages = new Mongo.Collection('messages');
Posts = new Mongo.Collection('posts');
UserFriends = new Mongo.Collection('userFriends');

var Schemas = {};
Schemas.UserFriends = new SimpleSchema({
    userId1: {
        type: String
    },
    userId2: {
        type: String
    },
    timestamp: {
        type: Number
    }
});
UserFriends.attachSchema(Schemas.UserFriends);