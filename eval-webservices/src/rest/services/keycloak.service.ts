import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakService {
  private keycloakAdmin: KeycloakAdminClient;

  constructor(private configService: ConfigService) {
    this.keycloakAdmin = new KeycloakAdminClient({
      baseUrl: this.configService.get<string>('KEYCLOAK_URL'),
      realmName: this.configService.get<string>('KEYCLOAK_REALM'),
    });
  }

  async login(email: string, password: string): Promise<string> {
    const token = await this.keycloakAdmin.auth({
      username: email,
      password: password,
      grantType: 'password',
      clientId: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
      clientSecret: this.configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
    });
    return token.access_token;
  }

  async createUser(userData: { email: string; password: string }) {
    const user = await this.keycloakAdmin.users.create({
      realm: this.configService.get<string>('KEYCLOAK_REALM'),
      username: userData.email,
      email: userData.email,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: userData.password,
          temporary: false,
        },
      ],
    });
    return user;
  }
}
