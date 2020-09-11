export default interface IUpdateUserAccessTokenRepository {
  update: (userId: string, token: string) => Promise<void>
}
