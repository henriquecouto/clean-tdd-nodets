export default interface IEncrypter {
  isValid: boolean
  compare: (value: string, hashedValue: string) => Promise<boolean>
}
