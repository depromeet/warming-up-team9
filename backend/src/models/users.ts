import * as mongoose from "mongoose";

export type Users = {
    email: string;
    nickname: string;
    passwordHash: string;
};

export type UsersDocument = mongoose.Document & Users;

export type TokenPayload = {
    uid: string;
    email: string;
    nickname: string;
};

const schema = new mongoose.Schema(
    {
        email: { type: String },
        nickname: { type: String },
        passwordHash: { type: String },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    },
);

class UsersClass {}

schema.loadClass(UsersClass);

export default mongoose.model("Users", schema);
