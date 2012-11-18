var app = app || {};

(function() {
    'use strict';

    // the collection of items is backed by localStorage
    var ItemList = Backbone.Collection.extend({

        model: app.Item,

        // save all of the items under the "programmer-competency" namespace
        localStorage: new Store('programmer-competency'),

        completed: function() {
            return this.filter(function(item) {
                return item.completed();
            });
        },

        remaining: function() {
            return this.without.apply(this, this.completed());
        },

        averageLevel: function() {
            var levels = _.map(this.completed(), function(item) { return item.get('userLevel'); });
            var sum = _.reduce(levels, function(memo, num){ return memo + num; }, 0);

            return sum / levels.length;
        },
    });

    app.Items = new ItemList();

}());
