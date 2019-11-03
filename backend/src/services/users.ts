import createHttpError from "http-errors";
import bcryptjs from "bcryptjs";
import { db } from "../models";

interface SignUpArg {
    email: string;
    nickname: string;
    password: string;
}

const signUp = async (args: SignUpArg) => {
    const { email, nickname, password } = args;
    const [duplicatedEmailUser, duplicatedNicknameUser] = await Promise.all([
        db.Users.findOne({ email }),
        db.Users.findOne({ nickname }),
    ]);
    if (duplicatedEmailUser) {
        throw createHttpError(400, { code: 100, message: "이미 존재하는 이메일" });
    }
    if (duplicatedNicknameUser) {
        throw createHttpError(400, { code: 101, message: "이미 존재하는 닉네임" });
    }

    const passwordHash = await bcryptjs.hashSync(password);
    const user = new db.Users({
        email,
        nickname,
        passwordHash,
    });
    await user.save();
    return user;
};

export default {
    signUp,
};
