curl -X POST -d '{"selector": { "_id": {"$eq": "set11:10000018"}},"execution_stats": true, "use_index": ["_design/82219eb34590ad93a8e1a969ba4d0aa2ce71f6df", "id-json-index"]}' -H 'Content-Type: application/json' 'http://<login>:<password>@localhost:5984/partitioned-product-overview/_find'

//get with index ^^
//change
//change for github

curl 'http://<login>:<password>@localhost:5984/partitioned-product-overview/_index'

// ^ get indexes

curl -X PUT -d '{"_id":"set11:10000018","_rev":"3-3fcd344585362910c106625804ce04e6","product_name":"TastyTastyTasty Plastic Mouse","package_name":"Wooden","list_price":24,"price":22,"sellers":[{"id":7336351,"discs":36,"price":34,"newfrom":30,"usedfrom":25,"edition":"Limited Edition","form":"4K","release_date":"2021-02-02T07:39:33.738Z"}],"forms":[{"id":2661392,"price":15,"form":"DVD"},{"id":6966730,"price":32,"form":"Blu-ray"},{"id":1841684,"price":12,"form":"4K"},{"id":8019290,"price":37,"form":"Prime Video"}],"prime":true,"sold_by":"Koelpin - Wunsch","ships_from":"Koelpin - Wunsch","in_stock":true,"inventory":5536}' -s -w "%{time_total}\n" 'Content-Type: application/json' 'http://<login>:<password>@localhost:5984/partitioned-product-overview/set11:10000018'

