import { UserDocument } from '../../src/models/User.model';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

