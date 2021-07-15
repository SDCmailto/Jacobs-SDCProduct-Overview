select * from (select * from products where product_id = 2839483) as p left join (select * from forms where product_id = 2839483) as f on p.product_id = f.product_id;

select * from other_sellers where id in (select id_other_sellers_foreign from products_and_other_sellers as ps where ps.product_id = 2839483);


