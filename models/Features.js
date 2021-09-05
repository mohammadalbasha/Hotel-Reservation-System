const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hotel=require('./Hotel');

const featureSchema = new Schema({
//   type: {
//     type: String,
//     enum:['Hotel','Room'],
//     required: true
//   },

  HotelId : {
    type : Schema.Types.ObjectId,
    ref : ('Hotel')
  },

  hotelFeatures : {

      hasRestaurant : {
          type : Schema.Types.Boolean
      },

      hasCinema : {
        type : Schema.Types.Boolean
    },
    
      hasSwimmingPool : {
        type : Schema.Types.Boolean
    },

      hasGamesHall : {
        type : Schema.Types.Boolean
    },

     hasParking : { 
         type : Schema.Types.Boolean
     },

     hasSmookingRooms : { 
      type : Schema.Types.Boolean
  },


      description : {
          type : String
      }
    
  
    },

  offers : {
    
    hotelDiscount : {
      type : Number
    },

    websiteDiscount : {
      type : Number
    },

    extra : {

        type : String
      
    }
  },  


  roomFeatures : {

          vip : {

                  hasCoffeeMachine : {
                      type : Schema.Types.Boolean
                  },

                  hasBalcony : {
                    type : Schema.Types.Boolean
                  },

                  hasJacuzzi : {
                    type : Schema.Types.Boolean
                  },

                  description : {
                      type : String
                  }


              },

          

          normal : {

                hasCoffeeMachine : {
                    type : Schema.Types.Boolean
                },

                hasBalcony : {
                  type : Schema.Types.Boolean
                },

                hasJacuzzi : {
                  type : Schema.Types.Boolean
                },

                description : {
                    type : String
                }


            },

        sweet : {

            hasCoffeeMachine : {
                type : Schema.Types.Boolean
            },

            hasBalcony : {
                type : Schema.Types.Boolean
            },

            hasJacuzzi : {
                type : Schema.Types.Boolean
            },

            description : {
                type : String
            }


            },

      }
  
  
});

module.exports = mongoose.model('Feature', featureSchema);
