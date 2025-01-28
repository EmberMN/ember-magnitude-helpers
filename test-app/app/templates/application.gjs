import Route from 'ember-route-template';
import { pageTitle } from 'ember-page-title';
import { mgPrefix } from 'ember-magnitude-helpers';

export default Route(
  <template>
    {{pageTitle "TestApp"}}

    <h2 id="title">Welcome to Ember</h2>

    {{mgPrefix 1024 unit="B" useName=false}}

    {{outlet}}
  </template>,
);
