import jsforce from 'jsforce';

class SfdcConnector {
  constructor() {
    this._cache = {};
  }

  get username() {
    return process.env.SF_USERNAME;
  }

  get password() {
    return process.env.SF_PASSWORD;
  }

  get url() {
    return process.env.SF_URL;
  }

  get accessToken() {
    return window['__ACCESS_TOKEN'];
  }

  get isInsideSalesforce() {
    return !!this.accessToken;
  }

  get isOutsideSalesforce() {
    return !this.isInsideSalesforce;
  }

  get connection() {
    if (!this._cache.connection) {
      const connection = this.isInsideSalesforce
        ? new jsforce.Connection({ accessToken: this.accessToken })
        : new jsforce.Connection({ loginUrl : this.url });

        this._cache.connection = connection;
        window.connection = connection;
    }
    return this._cache.connection;
  }

  init() {
    return new Promise((resolve, reject) => {
      if (this.isInsideSalesforce) {
        resolve(this.connection);
      } else {
        this.connection.login(this.username, this.password, (err) => {
          if (err) { reject(err); }
          resolve(this.connection);
        });
      }
    });
  }

  query(...args) {
    return this.connection.query(...args);
  }
}

export default SfdcConnector;
