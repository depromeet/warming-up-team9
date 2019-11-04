import { TokenPayload } from "../models/users";

declare global {
    namespace Express {
        interface Request {
            user: TokenPayload;
        }
    }
}
