/**
 * Application sidebar.
 */
component.sidebar = function() {
  component.apply(this, arguments);
};
assessment.extend(component.sidebar, component);

/**
 * Draw the sidebar.
 *
 * @param {HTMLDivElement} parent
 */
component.sidebar.prototype.decorate = function(parent) {
  var sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  parent.appendChild(sidebar);
  
  var button = document.createElement('button');
  button.className = 'create_chat_room';
  button.innerHTML = 'Create New Chatroom';
  sidebar.appendChild(button);
  
  let addChatRoomToSidebar = (chat_room) => {
      let sidebar = document.querySelector('.sidebar');
      let create_button = document.querySelector('.create_chat_room');
      let ele = document.createElement('button');
      ele.innerHTML = chat_room.name
      ele.setAttribute('data-chat-id', chat_room.chat_room_id);
      sidebar.insertBefore(ele,create_button);
      
      ele.addEventListener('click', function() {
        localStorage.chat_room = chat_room.chat_room_id;
      });
  }
  
  let createChatRoom = (name) => {
    assessment.api(
      'chat_room',
      'create',
      {
        'name': name
      },
      function(resp) {
        addChatRoomToSidebar(resp);
      }
    );
  }
  
  button.addEventListener('click', function() {
    let chat_room_name = prompt('Chatroom Name?', '');
    if (chat_room_name && chat_room_name !== '') {
      createChatRoom(chat_room_name);
    }
  });
  
  assessment.api(
    'chat_room',
    'read',
    {},
    function(response) {
      for(var i = 0; i < response.length; i++) {
        addChatRoomToSidebar(response[i]);
      }
    });
};