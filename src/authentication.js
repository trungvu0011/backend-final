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
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('github', new GitHubStrategy());
  authentication.register('facebook', new FacebookStrategy());
  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
