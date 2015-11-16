Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.redirect('loginPage');
  } else {
    this.next();
  }
});

Router.route('/', {
  name:     'posts',
  template: 'posts',
  subscriptions: function() {
    return [
      Meteor.subscribe('posts'),
      Meteor.subscribe('userIds'),
      Meteor.subscribe('onlineUsers')
    ];
  }
});

Router.route('/messages', {
  name:     'messages',
  template: 'messages',
  subscriptions: function() {
    return [
      Meteor.subscribe('chatMessages'),
      Meteor.subscribe('onlineUsers')
    ];
  }
});

Router.route('/userprofile', {
  name:     'userProfile',
  template: 'userProfile'
});