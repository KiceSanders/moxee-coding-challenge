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
  let content = document.querySelector(".content");
  let childCt = content.childNodes.length;
  if (childCt > 0 && content.childNodes[0].getAttribute('data-chat-id') !== localStorage.chat_room) {
    while (content.hasChildNodes()) {
      content.removeChild(content.lastChild);
    }
    childCt = 0;
  }
  let lastID = (childCt === 0) ? 0 : content.childNodes[childCt-1].getAttribute('data-msg-id');
  assessment.api(
    'message',
    'read',
    {
      message_id: lastID,
      chat_room_id: localStorage.chat_room
    },
    function(response) {

      /**
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
      
      if(response.length > 0) {
        for(var i = 0; i < response.length; i++) {
          let ele = document.createElement('p');
          ele.innerHTML = response[i].name+": "+response[i].message;
          ele.setAttribute('data-msg-id', response[i].message_id);
          ele.setAttribute('data-chat-id', response[i].chat_room_id);
          content.appendChild(ele);
        };
        content.scrollTop = content.scrollHeight;
      }
    }
  );
};
