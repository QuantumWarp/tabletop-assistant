import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import { UserService } from '@/user/user.service';

interface MicrosoftStrategyData {
  iss: string;
  sub: string;
  email: string;
  name: string;
}

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(
  BearerStrategy,
  'microsoft',
) {
  constructor(configService: ConfigService, private userService: UserService) {
    super({
      identityMetadata: configService.get('MICROSOFT_OPENID_CONFIG_URL'),
      clientID: configService.get('MICROSOFT_OPENID_CLIENT_ID'),
    });
  }

  async validate(data: MicrosoftStrategyData) {
    const user = this.userService.getAndUpsert({
      iss: data.iss,
      sub: data.sub,
      email: data.email,
      name: data.name,
    });
    return user;
  }
}

export const MicrosoftGuard = AuthGuard('microsoft');
