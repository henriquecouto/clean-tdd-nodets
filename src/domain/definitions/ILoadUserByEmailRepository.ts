import User from '../entities/User'

export default interface ILoadUserByEmailRepository {
  email: string
  load: (email: string) => Promise<User>
}
