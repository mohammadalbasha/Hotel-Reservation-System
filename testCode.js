var i=3;

const fetch = text => {

    const promise = new Promise ((res,rej) => {
        setTimeout ( ()=> {
            console.log('woooow');
            res(text);
        },'2000');
    });
    
return promise;

};

fetch('ozil')
.then(text => {
    console.log(text);
    return fetch('ronaldo');
})
.then (text2=> {
    console.log(text2);
});


/*
    const io = require('./socket/socket').init(server);


 
    
      

    app.get('/kaka2',(req,res,next) => {
      User.findById(mongodb.ObjectID('60915b4cf05759407c67b147'))
      .select('-orders')
      .then (user => {
        console.log(user);
      return Order.find({userId:mongodb.ObjectID('60915b4cf05759407c67b147'),hotel : mongodb.ObjectID('60893d271167ba092c20bf51')})
                  .then (orders => {
                    console.log(orders);
                    return {user,orders : orders}
                  })
     
      })
    
      .then (result => {
        return Note.find ({userId:mongodb.ObjectID('60915b4cf05759407c67b147'),hotelId : mongodb.ObjectID('60893d271167ba092c20bf51')})
                    .then (notes => {
                      const {user} = result;
                      const {orders}= result;
                      return {user,orders,notes : notes};
                    })
      })
      .then (finalResult => {
        res.json(finalResult)
      })    
  });
 
    app.get('/kaka',(req,res,next) => {
      Order
      .aggregate([
        
        {
          $match : {hotel : mongodb.ObjectID('60893d271167ba092c20bf51'),
                    'room.number' : 1}
        },
        { 
          $project:
            {
              _id: 0,
              checkIn2: { $month: "$checkIn" }
            }
        },
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$checkIn2',
            count: { $sum: 1 }
          }
        }
      ]).
      then (re=> {
        return re.map (element => {
          switch (element._id)
        {  case(1) :  return   { label: "jan", x: 0, y: element.count };
            break ;
            case(2) :  return   { label: "feb", x: 1, y: element.count };
            break ;
            case(3) :  return   { label: "mar", x: 2, y: element.count };
            break ;
            case(4) :  return   { label: "apr", x: 3, y: element.count };
            break ;
            case(5) :  return   { label: "may", x: 4, y: element.count };
            break ;
            case(6) :  return   { label: "jun", x: 5, y: element.count };
            break ;
            case(7) :  return   { label: "jul", x: 6, y: element.count };
            break ;
            case(8) :  return   { label: "aug", x: 7, y: element.count };
            break ;
            case(9) :  return   { label: "sep", x: 8, y: element.count };
            break ;
            case(10) :  return   { label: "oct", x: 9, y: element.count };
            break ;
            case(11) :  return   { label: "nov", x: 10, y: element.count };
            break ;
            case(12) :  return   { label: "dec", x: 11, y: element.count };
            break ;
        
        }
        });
        })
        .then (result => {
          res.json(result);
        })
        .catch(err => {
          next(err);
        })
    
      })  */
  
  /*  Notes.insertMany([
      {hotelId:mongodb.ObjectID('609c195168f9a20fa4628f3f'),userId:mongodb.ObjectID('609c195168f8a20fa4628f3f') ,evaluating:4,notes :"blabfgblabla",suggestions:'lcbdmcls' },
      {hotelId:mongodb.ObjectID('609c195168f9a20fa4628f3f'),userId:mongodb.ObjectID('609c195168f8a20fa4628f3f') ,evaluating:1,notes :"blablabgfbla",suggestions:'ldmgbcls' }
    ]);

*/
         
//Hotel.findOne().select('_id').then (res=> {console.log(res)});

/*
Order.find()
.where('hotel').eq(mongodb.ObjectID('60893d271167ba092c20bf51'))

.then (res => {
  console.log(res);
})
*/

// this is invalid because groub should take accumelator attriputes
/*
Order.aggregate([
  {
    $group : {_id : "$userId",
      hotel : "$hotel"}
  }
])
.then (res => {
  console.log(res);
})
*/
    /*
Features.find().then (res =>{ 
  console.log (res);
});
*/

/*
Hotel.find().populate ('features')
.where ('features._id').eq(mongodb.ObjectID('60893d271167ba092c20bf52'))
.then(res => {
  console.log(res);
})

Hotel.aggregate(
  [
    { "$lookup": {
      "from": Features.collection.name,
      "localField": "features",
      "foreignField": "_id",
      "as": "features"
    }},
    { "$unwind": "$features" },
    { "$match": { "features._id": { "$eq":  mongodb.ObjectID('60893d271167ba092c20bf52')} } },
    
  ],
  function(err, result) {
    console.log(result);
    // "tags" is now filtered by condition and "joined"
  }

)
/*
Hotel.find().populate ({ "path": "features",
"match": { "_id": { "$eq":mongodb.ObjectID('609c195168f8a20fa4628f3f') } }})
.then (res =>{
  console.log(res);
})

    Hotel.aggregate ([
      {
        $match : {
          features : mongodb.ObjectID('609c195168f8a20fa4628f3f')
        }
    }
  ])

   

    .then (res=> {
      console.log(res);
    })
    /*io.on('connection',(socket)=> { 

      console.log('sclskdc');
      socket.on('join',channel=> {
        console.log(channel);
        socket.join(channel);
      });
      socket.on ('chat',data => {
        console.log(data);
      io.to(data.to).emit('getmessage',{data:data.data,from:data.from});
      })
      console.log('user connected');
    });
*/
 
    
  //.catch(err => next(err));




