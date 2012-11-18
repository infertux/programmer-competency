var RANKS = [
    "Your programming skills are asymptotic to /dev/null (and you might not get this joke).",
    "You've got interesting programming skills but there's still plenty of things to learn, keep it up!",
    "You're probably an experienced programmer but there are a few things you still need to learn to get the hacker rank.",
    "You seem to be a true hacker. I bet you got alien technology to make the rainbow tables with." // bonus point if you know where this comes from :)
]

var app = app || {};

$(function() {
    'use strict';

    app.MatrixView = Backbone.View.extend({

        el: '#table',

        tagName: 'table',

        initialize : function() {
            _.bindAll(this, 'render', 'renderOne');

            $('#reset').click(function() {
                // app.Items.reset(); // can't get it working so I nuke the localStorage :P
                localStorage.clear();
                location.reload();
            });
        },

        render: function() {
            $('#matrix').show();

            $('#score').text(Math.round(this.collection.averageLevel() * 10) / 10);
            $('#rank').text(RANKS[parseInt(this.collection.averageLevel() + 0.5)]);

            this.$el.append("<tr><th></th>"
              + _(4).times(function(n) { return "<th>Level " + n + "</th>"; })
              + "</tr>");

            this.collection.each(this.renderOne);

            return this;
        },

        renderOne: function(model) {
            var row = new RowView({model: model});
            this.$el.append(row.render().$el);
            return this;
        }
    });

    var RowView = Backbone.View.extend({
        render: function() {
            var model = this.model.toJSON();

            var levels = "<% _.each(levels, function(level, id) { %> <td class='<%= id > userLevel ? 'dunno' : 'know' %>'><%= level %></td> <% }); %>"; // yuk

            var html = "<tr>"
              + _.template("<td class='item'><%= title %></td>")(model)
              + _.template(levels, {levels: model.levels, userLevel: model.userLevel})
              + "</tr>";

            this.setElement($(html));
            return this;
        }
   });

});

