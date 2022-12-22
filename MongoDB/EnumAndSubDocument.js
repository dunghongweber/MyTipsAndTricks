//creating enum in Mongoose
var RequirementSchema = new mongooseSchema({
   status: {
        type: String,
        enum : ['NEW,'STATUS'],
        default: 'NEW'
    },
})

//subdocument for better organizing schema
//https://mongoosejs.com/docs/subdocs.html
const childSchema = new Schema({ name: 'string' });

const parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments
  child: childSchema
});
