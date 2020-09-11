export default interface ITokenGenerator {
  generate: (value: string) => Promise<string>
}
