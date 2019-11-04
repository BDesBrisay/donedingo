import React from './node_modules/react';

import { AppContext } from './AppProvider';

export default function withContext(WrappedComponent) {
  return (props) => (
    <AppContext.Consumer>
      {(context) => (
        <WrappedComponent
          context={context}
          {...props}
        />
      )}
    </AppContext.Consumer>
  );
};
