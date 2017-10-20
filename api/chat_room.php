<?php

class chat_room {

  public function __construct($mysqli) {
    $this->mysqli = $mysqli;
  }

  /**
   * @return array of all chat rooms
   */
  
  public function read($arguments) {
    $chat_rooms = array();
    
    $query = '
      select
        *
      from
        `chat_room` '
    ;
    
    $result = $this->mysqli->query($query) or die($this->mysqli->error);
    
    while($r = $result->fetch_assoc()) {
      $chat_rooms[] = $r;
    }
    
    return $chat_rooms;
  }

  /**
   * Create a new message.
   *
   * @param array $arguments [name]
   *
   * @return array The newly created message.
   */
  public function create($arguments) {
    $query = '
      insert into
        `chat_room`(
          `name`
        )
        values(
          "' . $this->mysqli->real_escape_string($arguments['name']) . '"
        )
    ';
    $this->mysqli->query($query) or die($this->mysqli->error);
    $chat_room_id = $this->mysqli->insert_id;

    $query = '
      select
        *
      from
        `chat_room`
      where
        `chat_room_id` = ' . $chat_room_id
    ;
    $result = $this->mysqli->query($query) or die($this->mysqli->error);
    $chat_room = $result->fetch_assoc();

    return $chat_room;
  }

}
