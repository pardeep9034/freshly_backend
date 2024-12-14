const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    phoneno: { type: Number, required: true },
//   email: { type: String, required: true, unique: true }, // Unique for login
    username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed passwords
  role: { type: String, default: "employee" },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Manager" }, // Reference to the manager
  isActive: { type: Boolean, default: true }, // To enable/disable employee access
});
const managerSchema = new mongoose.Schema({
    phoneno:{ type:String,required:true },
    password: { type: String, required: true }, // Store hashed passwords
    role: { type: String, default: "manager" },
});

const userModel = mongoose.model('User', userSchema);
const managerModel = mongoose.model('Manager', managerSchema);


// const manager = new managerModel({
//     phoneno:"1234567890",
//     password: "manager",
    
// });
// const user = new userModel({
//     phoneno: 1234567890,
//     password: "employee",
//     role: "employee",
//     addedBy: manager._id,
// });
// manager.save();
// user.save();

module.exports = {userModel, managerModel};
