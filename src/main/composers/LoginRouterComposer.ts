import MongoLoadUserByEmailRepository from '@/data/repositories/MongoLoadUserByEmailRepository'
import MongoUpdateUserAccessTokenRepository from '@/data/repositories/MongoUpdateUserAccessTokenRepository'
import AuthUseCase from '@/domain/useCases/AuthUseCase'
import LoginRouter from '@/presentation/routers/LoginRouter'
import EmailValidator from '@/utils/helpers/EmailValidator'
import HashVerifier from '@/utils/helpers/HashVerifier'
import TokenGenerator from '@/utils/helpers/TokenGenerator'
import env from '../config/env'

class LoginRouterComposer {
  static compose() {
    const loadUserByEmailRepository = new MongoLoadUserByEmailRepository()
    const updateAccessTokenRepository = new MongoUpdateUserAccessTokenRepository()
    const encrypter = new HashVerifier()
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const authUseCase = new AuthUseCase(
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encrypter,
      tokenGenerator
    )
    const emailValidator = new EmailValidator()
    return new LoginRouter(emailValidator, authUseCase)
  }
}

export default LoginRouterComposer
