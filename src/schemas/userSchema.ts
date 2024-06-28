import { Schema, Document, mongoose, mongoosePaginate } from "../helpers/path";

let options = {
    versionKey: false,
    timestamps: true
}

interface IUser extends Document {
    username: string,
    email: string,
    password: string

}

const UserSchema = new Schema<IUser>({
    username: String,
    email: String,
    password: String


}, options);

UserSchema.plugin(mongoosePaginate)
const UserModel = mongoose.model("user", UserSchema);

export { IUser, UserModel };

