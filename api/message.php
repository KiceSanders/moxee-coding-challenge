<?php

class message {

  public function __construct($mysqli) {
    $this->mysqli = $mysqli;
  }

  /**
   *
   * @param $arguments [message_id, chat_room_id]
   *
   * @return [type] [description]
   */
  
  public function read($arguments) {
    $messages = array();
    $msg_id = $this->mysqli->real_escape_string($arguments['message_id']);
    $chat_room_id = $this->mysqli->real_escape_string($arguments['chat_room_id']);
    
    $query = '
      select
        *
      from
        `message`
      where
        `message_id` > ' . "'". $msg_id ."'" . '&& `chat_room_id` ='."'" .$chat_room_id. "'";
    ;
    
    $result = $this->mysqli->query($query) or die($this->mysqli->error);
    
    while($r = $result->fetch_assoc()) {
      $messages[] = $r;
    }
    
    return $messages;
  }

  /**
   * Create a new message.
   *
   * @param array $arguments [name, message]
   *
   * @return array The newly created message.
   */
  public function create($arguments) {
    $query = '
      insert into
        `message`(
          `name`,
          `message`,
          `chat_room_id`
        )
        values(
          "' . $this->mysqli->real_escape_string($arguments['name']) . '",
          "' . $this->mysqli->real_escape_string($arguments['message']) . '",
          "' . $this->mysqli->real_escape_string($arguments['chat_room_id']) . '"
        )
    ';
    $this->mysqli->query($query) or die($this->mysqli->error);
    $message_id = $this->mysqli->insert_id;

    $query = '
      select
        *
      from
        `message`
      where
        `message_id` = ' . $message_id
    ;
    $result = $this->mysqli->query($query) or die($this->mysqli->error);
    $message = $result->fetch_assoc();

    return $message;
  }

}
