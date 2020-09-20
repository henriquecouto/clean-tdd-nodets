export default interface IAuthUseCase {
  auth: (email: string, password: string) => Promise<string>
}
