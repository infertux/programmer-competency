var app = app || {};

(function() {
    'use strict';

    app.Item = Backbone.Model.extend({

        defaults: {
            topic: '',
            title: '',
            levels: [],
            userLevel: null
        },

        selectLevel: function(level) {
            this.save({
                userLevel: level
            });
        },

        completed: function() {
            return !_.isNull(this.get('userLevel'));
        }

    });

}());
