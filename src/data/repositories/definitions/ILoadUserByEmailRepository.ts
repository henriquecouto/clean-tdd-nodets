import User from '../../../domain/entities/User'

export default interface ILoadUserByEmailRepository {
  load: (email: string) => Promise<User>
}
