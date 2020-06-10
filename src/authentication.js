const {AuthenticationService, JWTStrategy} = require('@feathersjs/authentication');
const {LocalStrategy} = require('@feathersjs/authentication-local');
const {expressOauth, OAuthStrategy} = require('@feathersjs/authentication-oauth');

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.name,
      // The user email address (if available)
      email: profile.email,
      phone: profile.phone,
    };
  }
}

class FacebookStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);
    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    };
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app, 'userAuthentication');

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('github', new GitHubStrategy());
  authentication.register('facebook', new FacebookStrategy());
  app.use('/authentication/users', authentication).hooks({
    before: {
      create: [
        (hook) => {
          if (hook.path !== 'authentication/users')
            return;

          hook.params.payload = hook.params.payload || {};
          hook.params.payload['authType'] = 'users';
        }
      ]
    }
  });

  const authentication2 = new AuthenticationService(app, 'doctorAuthentication');

  authentication2.register('jwt', new JWTStrategy());
  authentication2.register('local', new LocalStrategy());
  authentication2.register('github', new GitHubStrategy());
  authentication2.register('facebook', new FacebookStrategy());
  app.use('/authentication/doctors', authentication2).hooks({
    before: {
      create: [
        (hook) => {
          if (hook.path !== 'authentication/doctors')
            return;

          hook.params.payload = hook.params.payload || {};
          hook.params.payload['authType'] = 'doctors';
        }
      ]
    }
  });

  app.configure(expressOauth());
};
