export default interface IHashVerifier {
  compare: (value: string, hashedValue: string) => Promise<boolean>
}
