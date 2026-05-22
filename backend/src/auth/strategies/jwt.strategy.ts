import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ↑ looks for token in Authorization: Bearer <token> header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
      // ↑ same secret used to sign = used to verify
    });
  }

  async validate(payload: any) {
    // payload = decoded JWT content
    return { id: payload.sub, email: payload.email, role: payload.role };
    // ↑ this gets attached to request.user on every protected route
  }
}