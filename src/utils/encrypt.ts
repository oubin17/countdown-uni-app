// 公钥加密工具类（依赖 jsencrypt）
import JSEncrypt from 'jsencrypt'
import { defaultPublicKey } from './public_key'

// 传入明文和公钥，返回加密后的密文
export function encryptWithPublicKey(plainText: string, publicKey?: string): string {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey || defaultPublicKey)
  return encryptor.encrypt(plainText) || ''
}
