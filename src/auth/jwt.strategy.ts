import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['x-access-token'];
          }
          return jwt;
        },
      ]),
      ignoreExpiration: false, // 期限切れのトークンは無視しない
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: { sub: string }): Promise<{ userId: string }> {
    return { userId: payload.sub };
  }
}
