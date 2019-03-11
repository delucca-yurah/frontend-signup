import * as Sentry from '@sentry/browser'

const sentry = (store) => {
  Sentry.configureScope( (scope) =>
    scope.addEventProcessor( (event) => {
      const { nome, ...state } = store.getState();

      return {
        ...event,
        extra: { ...event.extra, 'redux:state': state },
        user: { ...event.user, nome }
      };
    })
  )

  return (next) => (action) => {
    const isError = action.type.includes('FAIL');

    Sentry.addBreadcrumb({
      category: 'redux-action',
      message: action.type,
      data: action.payload,
      level: isError ? 'error' : 'info',
      type: isError ? 'error' : 'default',
    })

    if(isError)
      Sentry.captureException(action.payload);

    return next(action)
  }
}

export default sentry
