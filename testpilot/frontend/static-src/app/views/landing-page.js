import app from 'ampersand-app';
import PageView from './page-view';
import template from '../templates/landing-page';
import ExperimentListView from './experiment-list-view';

// TODO back out this commit (78bd0a93a1q) before launch.
import queryString from 'query-string';

export default PageView.extend({
  _template: template,

  pageTitle: 'Firefox Test Pilot - Help build Firefox',
  pageTitleL10nID: 'pageTitleLandingPage',

  render() {
    const isLoggedIn = !!app.me.user.id;
    const query = queryString.parse(location.search);
    this.isMoz = query.hasOwnProperty('butimspecial');
    this.loggedIn = isLoggedIn;
    this.downloadUrl = isLoggedIn && app.me.user.addon.url;
    this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    PageView.prototype.render.apply(this, arguments);

    if (!this.loggedIn && this.isMoz) {
      this.renderSubview(new ExperimentListView({
        loggedIn: this.loggedIn,
        isFirefox: this.isFirefox
      }),
        '[data-hook="experiment-list"]');
    }
  },

  remove() {
    PageView.prototype.remove.apply(this, arguments);
  }
});
