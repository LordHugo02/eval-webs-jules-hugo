import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import queryString from 'query-string';

type UserLoginPayload = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  PORT = 3000;
  KEYCLOAK_URL = 'http://localhost:8080';
  REALM_NAME = 'myrealm';
  CLIENT_ID = 'myclient';
  CLIENT_SECRET = 'mysecret';
  REDIRECT_URI = `http://localhost:${this.PORT}/auth/callback`;

  AUTHORIZATION_ENDPOINT = `${this.KEYCLOAK_URL}/realms/${this.REALM_NAME}/protocol/openid-connect/auth`;
  TOKEN_ENDPOINT = `${this.KEYCLOAK_URL}/realms/${this.REALM_NAME}/protocol/openid-connect/token`;
  USERINFO_ENDPOINT = `${this.KEYCLOAK_URL}/realms/${this.REALM_NAME}/protocol/openid-connect/userinfo`;
  login(userLoginPayload: UserLoginPayload, res: Response) {
    console.log('redirecting user to Keycloak for login');
    const authorizationUrl =
      `${this.AUTHORIZATION_ENDPOINT}?` +
      queryString.stringify({
        client_id: this.CLIENT_ID,
        response_type: 'code',
        redirect_uri: this.REDIRECT_URI,
        scope: 'openid profile email',
      });
    res.redirect(authorizationUrl);
  }

  async callback(req: Request, res: Response) {
    try {
      const code = req.query.code;
      console.log('Authorization code:', code);
      // show full url path
      console.log('Full url path:', req.originalUrl);

      if (!code) {
        res.status(400).send('Authorization code not found');
        return;
      }
      const result = await fetch(this.TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          grant_type: 'authorization_code',
          code: code as string,
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          redirect_uri: this.REDIRECT_URI,
        }),
      });
      const jsonResult = (await result.json()) as {
        access_token: string;
        id_token: string;
      };

      console.log('Setting tokens in cookies');
      // Set access token and id token as cookies
      res.cookie('access_token', jsonResult.access_token, {
        httpOnly: true,
      });
      res.cookie('id_token', jsonResult.id_token, { httpOnly: true });

      res.redirect('/');
      console.log('Fetching tokens');
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async check_authorization(access_token: string): Promise<boolean> {
    try {
      const result = await fetch(this.USERINFO_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(result);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      return false;
    }
  }

  logout(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const idToken = req.cookies['id_token'] as string;

    // Clear the cookies
    res.clearCookie('access_token');
    res.clearCookie('id_token');

    // Construct the logout URL
    const logoutUrl =
      `${this.KEYCLOAK_URL}/realms/${this.REALM_NAME}/protocol/openid-connect/logout?` +
      queryString.stringify({
        id_token_hint: idToken,
        post_logout_redirect_uri: `http://localhost:${this.PORT}/`,
      });

    // Redirect the user to Keycloak's logout endpoint
    res.redirect(logoutUrl);
  }
}
