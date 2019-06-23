-- drop trigger updateProfScore;
delimiter |

create trigger updateProfScore after insert 
on comments FOR EACH ROW
begin
	declare newScore float;
	declare stuNums int;
	declare newCall float;

	select avg(score)into newScore from comments 
        where profId = NEW.profId;
	update professor 
		set studentNums=studentNums+1, score = newScore
	where id = NEW.profId;

	select count(*) into stuNums from comments
		where profId = NEW.profId 
        and callOrNot is not null;

	select count(*) into newCall from comments
	where profId = NEW.profId and callOrNot = true;
	set newCall = newCall/stuNums;
	update professor set callRate=newCall
		where id = NEW.profId;

end;
|

-- delimiter |
-- create trigger updateProfCall after insert
-- on comments FOR EACH ROW
-- begin
-- 	declare stuNums int;
-- 	declare newCall float;

-- 	select count(*) into stuNums from comments
-- 		where profId = NEW.profId 
--         and callOrNot is not null;

-- 	select count(*) into newCall from comments
-- 	where profId = NEW.profId and callOrNot = true;
-- 	set newCall = newCall/stuNums;
-- 	update professor set callRate=newCall
-- 		where id = NEW.profId;
-- end
-- |