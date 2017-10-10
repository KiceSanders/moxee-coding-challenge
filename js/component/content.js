/**
 * Content area that displays all sent and received messages.
 */
component.content = function() {
  var self = this;

  component.apply(this, arguments);

  setInterval(
    function() {
      self.get_new_messages();
    },
    1000
  );
};
assessment.extend(component.content, component);

/**
 * Draw all of the messages.
 *
 * @param {HTMLDivElement} parent
 */
component.content.prototype.decorate = function(parent) {
  this.content_ = document.createElement('div');
  this.content_.className = 'content';
  parent.appendChild(this.content_);
};

/**
 * Check the server for new messages. When received, display them.
 */
component.content.prototype.get_new_messages = function() {
  assessment.api(
    'message',
    'read',
    {
      // [ Your argument(s) here ]
    },
    function(response) {

      /** TODO 3
       * -------------------------------------------------------------------------
       *
       * The function you just wrote in PHP is already being called for you
       * once every second (check your development tools in the "net" tab).
       * The results of that function call are made available to you here in
       * the "response" variable. Take those messages and display them on the
       * screen. There are many different ways you can do this, so have fun
       * with it!
       *
       * -------------------------------------------------------------------------
       */

      // [ Your code here ]
    }
  );
};
