import User from '../entities/User'

export default interface ILoadUserByEmailRepository {
  load: (email: string) => Promise<User>
}
