var app = app || {};

$(function() {
    'use strict';

    app.ItemView = Backbone.View.extend({
        render: function () {
            var model = this.model;

            $("#title").text(model.get('topic') + ": " + model.get('title'));

            $('#levels').empty();
            _.each(model.get('levels'), function(text, id) {
                var level = new app.LevelView({ item: model, text: text, level: id });

                $('#levels').append(level.render());
            });
        }
    });

    // define a nested view so click events are binded to this sub-view
    app.LevelView = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click': 'selectLevel'
        },

        render: function() {
            this.$el.text(this.options.text);
            return this.$el;
        },

        selectLevel: function() {
            this.options.item.selectLevel(this.options.level);
            app.Items.trigger('next'); // get a new item
        },
    });
});
