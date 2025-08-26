import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;

export class BcryptEncryption {
  static async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
