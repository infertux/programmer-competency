var app = app || {};

$(function() {
    'use strict';

    app.AppView = Backbone.View.extend({

        // instead of generating a new element, bind to the existing skeleton of
        // the app already present in the HTML
        el: '#app',

        initialize: function() {
            this.$app = this.$('#app');
            this.$item = this.$('#item');
            this.$footer = this.$('#footer');

            // app.Items.on('reset', this.next, this);
            app.Items.on('next', this.next, this);
            app.Items.on('all', this.render, this);

            app.Items.fetch();
            app.Items.trigger('next');
        },

        // re-rendering the app just means refreshing the footer
        render: function() {
            var completed = app.Items.completed().length;
            var remaining = app.Items.remaining().length;

            if (remaining) {
                this.$footer.show();

                this.$footer.html(
                    completed + " completed, " + remaining + " remaining"
                );
            } else {
                this.$footer.hide();
            }
        },

        next: function() {
            var next = _.first(app.Items.remaining());

            // console.debug("next", next);

            if (!app.Items.length) { return; }

            if (_.isUndefined(next)) {
                $('#app').remove();
                var view = new app.MatrixView({ collection: app.Items });
                view.render();
            } else {
                var view = new app.ItemView({ model: next });
                view.render();
            }
        }
    });
});
