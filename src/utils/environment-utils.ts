export enum EndpointHandler {
    MOCK = 'MOCK',
    PROXY = 'PROXY',
    DEV = 'DEV',
    PROD = 'PROD'
}

export const getEndpointHandlerType = (): EndpointHandler => {
  return import.meta.env.VITE_ENDPOINT_HANDLER || EndpointHandler.PROD
}

export const deltakerBffApiBasePath = (): string => {
  switch (getEndpointHandlerType()) {
  case EndpointHandler.MOCK:
    return '/mock'
  case EndpointHandler.PROXY:
    return 'http://localhost:58080'
  default:
    if(isDev()) {
      return 'https://amt-deltaker-flate.intern.dev.nav.no/amt-deltaker-bff'
    }

    return 'PROD_LINK'
  }
}

const isDev = (): boolean => {
  return window.location.hostname.includes('intern.dev.nav.no')
}

export const getCurrentMode = () => {
  return import.meta.env.VITE_MODE
}
