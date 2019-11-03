import mongoose from "mongoose";

export type UsersDocument = mongoose.Document & {
    email: string;
    nickname: string;
    passwordHash: string;
};

export type TokenPayload = {
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
