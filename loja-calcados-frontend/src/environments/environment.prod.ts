export const environment = {
  production: true
  , versao: '1.0.0-SNAPSHOT'
  , apiUri: 'http://localhost:8080/loja-calcados/'
  , ssoUri: 'https://keycloak.larapr.webredirect.org/auth'
  , endPointAutomacao: 'http://localhost:8080/loja-calcados/'

  , roles: ['SIMPF_ADMINISTRADOR']
  , permissoes: [
      { state: '/acesso-negado', roles: null },
      { state: '/', roles: ['SIMPF_ADMINISTRADOR'] },
      { state: '/home', roles: ['SIMPF_ADMINISTRADOR'] },
      { state: '/consulta-historico', roles: ['SIMPF_ADMINISTRADOR'] },
      { state: '/configuracao', roles: ['SIMPF_ADMINISTRADOR'] },
      { state: '/mensagens-recebidas', roles: ['SIMPF_ADMINISTRADOR'] },
        ]
};