create database FingerMarket
use FingerMarket

create table MobilePhones (
MobilePhonesID int identity(1,1),
Brand varchar (50),
Performance varchar (5000),
Price varchar (50),
Photo varchar (max)
)



insert into MobilePhones values ('test','test','test','test')

select * from MobilePhones



create table Laptops(
LaptopsID int identity(1,1),
Brand varchar (70),
Performance varchar (4000),
Price varchar (70),
Photo varchar (max)
)


insert into Laptops values ('test','test','test','test')
select * from Laptops


