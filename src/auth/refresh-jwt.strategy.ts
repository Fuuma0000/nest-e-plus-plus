// refresh-jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          if (req && req.cookies) {
            jwt = req.cookies['x-refresh-token'];
          }
          return jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_JWT_SECRET_KEY, // 別途設定が必要
    });
  }

  async validate(payload: { sub: string }): Promise<{ userId: string }> {
    return { userId: payload.sub };
  }
}
