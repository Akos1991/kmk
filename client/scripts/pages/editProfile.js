Template.editProfile.events({
    'blur input, blur textarea': function(event) {
        var data = Meteor.user().profile;
        data[event.target.name] = event.target.value;
        Meteor.users.update({_id: Meteor.user()._id}, {$set: {
            profile: data
        }});
    }
});