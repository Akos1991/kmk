Template.userProfile.events({
    'blur input, blur textarea': function(event) {
        var data = Meteor.user().profile;
        data[event.target.name] = event.target.value;
        Meteor.users.update({_id: Meteor.user()._id}, {$set: {
            profile: data
        }});
    },
    'click .add-friend': function(e, tpl) {
        var user = tpl.data.user;
        console.log('adding a friend', user.username);
        user.requestFriendship();
    },
    'click .cancel-friendship': function(e, tpl) {
        var user = tpl.data.user;
        friendRequest = Request.collection.findOne();
        if (friendRequest) {
            friendRequest.cancel();
        }
    },
    'click .confirm-friendship': function(e, tpl) {
        var user = tpl.data.user;
        friendRequest = Request.collection.findOne();
        if (friendRequest) {
            friendRequest.accept();
        }
    }
});

Template.userProfile.helpers({
    hasFriendRequest: function() {
        console.log('this.user: ', this.user);
        console.log('Meteor.user().hasRequestFrom(this.user)', Meteor.user().hasRequestFrom(this.user));
        if (Meteor.user() && this.user) {
            return Meteor.user().hasRequestFrom(this.user);
        }
    },
    friends: function() {
        console.log('friends: ', this.user.friends().fetch());
        return this.user.friends().fetch();
    },
    notMyProfile: function(UserId) {
        if(Meteor.user() && Meteor.user()._id == UserId) {
            return false;
        }else{
            return true;
        }
    }
});
