const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import { compareSync, hashSync } from 'bcryptjs';

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    validate: {
      validator: email => User.doesNotExist({ email }),
      message: "Email already exists"
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, {timestamps: true});

UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field) {
  return await this.where(field).countDocuments() === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

UserSchema.methods.getInitials = function() {
  return this.firstname[0] + this.lastname[0];
};

// export model user with UserSchema
const User = mongoose.model('User', UserSchema);
export default User;
