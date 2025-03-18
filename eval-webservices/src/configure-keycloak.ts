// configure-keycloak.ts
import KcAdminClient from '@keycloak/keycloak-admin-client';

export default async function configureKeycloak() {
  const kcAdminClient = new KcAdminClient();

  // Variables that might change
  const KEYCLOAK_URL = 'http://localhost:8080';
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin';
  const REALM_NAME = 'myrealm';
  const CLIENT_ID = 'myclient';
  const CLIENT_SECRET = 'mysecret';
  const REDIRECT_URI = 'http://localhost:3000/callback';
  const LOGOUT_REDIRECT_URI = 'http://localhost:3000/';

  const users = [
    {
      username: 'LordHugo02',
      email: 'hugo@example.com',
      firstName: 'Hugo',
      lastName: 'Flinois',
      password: 'HFlinois',
    },
    {
      username: 'Blewkse',
      email: 'jules@example.com',
      firstName: 'Jules',
      lastName: 'Bloux',
      password: 'JBloux',
    },
  ];

  // Configure the client
  kcAdminClient.setConfig({
    baseUrl: KEYCLOAK_URL,
    realmName: 'master',
  });

  // Authenticate with admin credentials
  await kcAdminClient.auth({
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
    grantType: 'password',
    clientId: 'admin-cli',
  });

  // Create the realm
  try {
    await kcAdminClient.realms.create({
      realm: REALM_NAME,
      enabled: true,
    });
    console.log(`Realm ${REALM_NAME} created.`);
  } catch (err: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.error('Error creating realm:', err?.response?.data || err);
  }

  // Set the realm
  kcAdminClient.setConfig({
    realmName: REALM_NAME,
  });

  // Create the client
  await kcAdminClient.clients.create({
    clientId: CLIENT_ID,
    secret: CLIENT_SECRET,
    redirectUris: [REDIRECT_URI, LOGOUT_REDIRECT_URI],
    standardFlowEnabled: true,
    directAccessGrantsEnabled: true,
    publicClient: false,
    serviceAccountsEnabled: true,
  });
  console.log(`Client ${CLIENT_ID} created.`);

  // Create the role
  await kcAdminClient.roles.create({
    name: 'user',
  });
  console.log(`Role user created.`);
  // Create the role
  await kcAdminClient.roles.create({
    name: 'admin',
  });
  console.log(`Role user created.`);

  const usersCreated: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }[] = [];
  // Create the user
  for (const user of users) {
    const u = await kcAdminClient.users.create({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      credentials: [
        {
          type: 'password',
          value: user.password,
          temporary: false,
        },
      ],
      enabled: true,
    });
    console.log(`User ${user.username} created.`);
    console.log(u);
    usersCreated.push({ ...u, ...user });
  }

  // Get the role
  const roleUser = await kcAdminClient.roles.findOneByName({ name: 'user' });
  const roleAdmin = await kcAdminClient.roles.findOneByName({ name: 'admin' });

  // Assign role to user
  if (roleUser && roleUser.id && roleUser.name) {
    await kcAdminClient.users.addRealmRoleMappings({
      id: usersCreated[0].id,
      roles: [
        {
          id: roleUser.id,
          name: roleUser.name,
        },
      ],
    });
    console.log(
      `Role ${roleUser.name} assigned to user ${usersCreated[0].email}.`,
    );
  }

  if (roleAdmin && roleAdmin.id && roleAdmin.name) {
    // Assign role to user
    await kcAdminClient.users.addRealmRoleMappings({
      id: usersCreated[1].id,
      roles: [
        {
          id: roleAdmin.id,
          name: roleAdmin.name,
        },
      ],
    });
    console.log(
      `Role ${roleAdmin.name} assigned to user ${usersCreated[1].email}.`,
    );
  }
}
