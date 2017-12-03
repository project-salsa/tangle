import React from 'react'
import { observable, action } from 'mobx'

import EntryPoint from '../entry_point'

export default class NavigationStore {
  @observable headerTitle = "Index"
  @observable.ref navigationState = {
    index: 0,
    routes: [
      { key: "Index", routeName: "Index" },
    ],
  }

  // NOTE: the second param, is to avoid stacking and reset the nav state
  @action dispatch = (action, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null;
    return this.navigationState = EntryPoint
      .router
      .getStateForAction(action, previousNavState);
  }
}