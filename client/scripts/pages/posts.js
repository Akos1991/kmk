Template.posts.events({
    'submit form': function(event) {
        event.preventDefault();
        if(event.target.post.value !== '') {
            Meteor.call('addPost', event.target.post.value);
            event.target.post.value = '';
        }
    },
    'keypress textarea': function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            if(event.target.value !== ''){
                Meteor.call('addPost', event.target.value);
                event.target.value = '';
            }
        }
    },
    'click .remove':function(event){
        event.preventDefault();
        Meteor.call('removePost',this._id);
    },
    'click .edit':function(event){
        event.preventDefault();
        $('#post .editable').editable('toggleDisabled');
    }
});


Template.posts.helpers({
    getPosts: function() {
        return Posts.find({}, { sort: {createdAt: -1}});
    },
    getUsername: function() {
        var user = Meteor.users.findOne(this.userId);
        if (user) {
            return user.username;
        }
    },
    updatePost: function() {
        var id = this._id;
        return function (res, val) {
            Meteor.call('editPost',id,val);
        }
    },
    getDisplayName: function(userId) {
        var user = Meteor.users.findOne({_id: userId});
        if(user) {
            return user.profile.displayName ? user.profile.displayName : user.username;
        }
        return 'A ghost...';
    },
    ownPost: function(postUserId) {
        if(Meteor.user() && Meteor.user()._id == postUserId) {
            return true;
        }
        return false;
    }
});
