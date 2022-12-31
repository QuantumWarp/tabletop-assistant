import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
import UserRepository from 'src/user/user.repository';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(
  BearerStrategy,
  'microsoft',
) {
  constructor(
    configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      identityMetadata: configService.get('MICROSOFT_OPENID_CONFIG_URL'),
      clientID: configService.get('MICROSOFT_OPENID_CLIENT_ID'),
    });
  }

  async validate(data) {
    const user = this.userRepository.getAndUpsert({
      iss: data.iss,
      sub: data.sub,
      email: data.email,
      name: data.name,
    });
    console.log(data);
    return user;
  }
}

export const MicrosoftGuard = AuthGuard('microsoft');
