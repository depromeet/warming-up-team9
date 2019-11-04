import createHttpError from "http-errors";
import bcryptjs from "bcryptjs";

import { db } from "../models";
import { auth } from "../controllers";
import { UsersDocument } from "../models/users";

export interface SignUpArg {
    email: string;
    nickname: string;
    password: string;
}

export interface LoginArg {
    email: string;
    password: string;
}

export interface GetUserArg {
    uid: string;
}

export const signUp = async (args: SignUpArg) => {
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
    }) as UsersDocument;
    await user.save();
    return auth.makeJWT({
        uid: user._id,
        email,
        nickname,
    });
};

export const login = async (args: LoginArg) => {
    const { email, password } = args;
    const user = (await db.Users.findOne({ email })) as UsersDocument;
    if (!user) {
        throw createHttpError(400, { code: 102, message: "존재하지 않는 이메일" });
    }

    const isCorrectPassword = bcryptjs.compareSync(password, user.passwordHash);
    if (!isCorrectPassword) {
        throw createHttpError(400, { code: 103, message: "일치하지 않는 비밀번호" });
    }

    return auth.makeJWT({
        uid: user._id,
        email: user.email,
        nickname: user.nickname,
    });
};

export const getUser = async (args: GetUserArg) => {
    const { uid: _id } = args;
    const user = (await db.Users.findOne({ _id })) as UsersDocument;
    if (!user) {
        throw createHttpError(404, { code: 105, message: "존재하지 않는 유저" });
    }

    return user;
};
