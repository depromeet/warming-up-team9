import mongoose from "mongoose";

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

class Users {}

schema.loadClass(Users);

export default mongoose.model("Users", schema);
