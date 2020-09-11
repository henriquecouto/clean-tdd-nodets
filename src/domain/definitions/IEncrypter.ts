export default interface IEncrypter {
  compare: (value: string, hashedValue: string) => Promise<boolean>
}
