-- drop database rankMyProfessor;
-- create database rankMyProfessor;
-- use rankMyProfessor;
use sicool;

set character_set_client=utf8;
set character_set_connection=utf8;
set character_set_database=utf8;
set character_set_results=utf8;
set character_set_server=utf8;
set collation_connection=utf8_general_ci;
set collation_database=utf8mb4_general_ci;
set collation_server=utf8mb4_general_ci;

create table university(
    name varchar(20) not null,
    province varchar(6) not null,
    primary key(name, province)
);
create table professor(
    id int(0) unsigned auto_increment not null,
    name varchar(10) not null,
    university varchar(20) not null,
    college varchar(20) not null,
    score float4 default 0.0,
    studentNums int unsigned default 0,
    callRate float4 default 0.0,
    primary key(id),
    foreign key (university) references university(name) on update cascade
);
create table course(
    university varchar(20) not null,
    courseCode varchar(10) not null,
    courseName varchar(20) not null,
    primary key(university, courseCode),
    foreign key (university) references university(name) on update cascade
);
create table gpa(
    profId int unsigned not null,
    courseCode varchar(10) not null,
    studentNums int unsigned default 0,
    grade float default 0,
    primary key(profId, courseCode),
    foreign key(profId) references professor(id) on update cascade
);
create table comments(
    profId int unsigned not null,
    content varchar(140),
    date date,
    score tinyint not null,
    callOrNot boolean,
    foreign key(profId) references professor(id) on update cascade
);

-- grant all privileges on sicool.* to 'sicool-access' @'localhost' identified by '123';
