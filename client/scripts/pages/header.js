Template.header.onRendered(function() {
    Meteor.typeahead.inject();
    $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
        console.log('Selection: ', suggestion.value);
        Router.go('userProfile', { username: suggestion.value });
    });
});

Template.header.helpers({
    usernames: function () {
        return Meteor.users.find().fetch().map(function(user) {
            return user.username;
        });
    }
});
