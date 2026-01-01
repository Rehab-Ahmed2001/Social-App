import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// حفظ بيانات مشفرة
export function saveCredentials(email, password) {
  const encryptedEmail = CryptoJS.AES.encrypt(email, SECRET_KEY).toString();
  const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  localStorage.setItem("credentials", JSON.stringify({ email: encryptedEmail, password: encryptedPassword }));
}

// استرجاع البيانات وفك التشفير
export function getCredentials() {
  const creds = localStorage.getItem("credentials");
  if (!creds) return null;
  try {
    const { email, password } = JSON.parse(creds);
    const decryptedEmail = CryptoJS.AES.decrypt(email, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(password, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return { email: decryptedEmail, password: decryptedPassword };
  } catch (error) {
    console.log("Error decrypting credentials:", error);
    return null;
  }
}

// مسح البيانات
export function clearCredentials() {
  localStorage.removeItem("credentials");
}
