# Moxee Coding Assessment

## MySQL

Run the following queries by copy/pasting into your `mysql>` prompt.

    ```
    create database `moxee`;
    use `moxee`;
    
    create table `chat_room` (
      `chat_room_id` int(10) unsigned not null auto_increment,
      `name` varchar(255) not null,
      primary key (`chat_room_id`)
    );
    
    create table `message` (
      `message_id` int(10) unsigned not null auto_increment,
      `name` varchar(255) not null,
      `message` varchar(1000) not null,
      `chat_room_id` int(10) unsigned,
      `timestamp` timestamp not null default current_timestamp on update current_timestamp,
      primary key (`message_id`),
      FOREIGN KEY (`chat_room_id`) REFERENCES chat_room(`chat_room_id`)
    );
    ```

## Help

How to use: 
1. Set up your database based on the directions above.
2. Create a new chat room, and click on the chat room to select it.
3. Invite your friends to chat with them!
