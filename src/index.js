import PBKDF2 from "crypto-js/pbkdf2";
import uuid from "uuid/v4";

const signUp = (email, password) => {
  const getLocalData = localStorage.getItem("users");
  let localAccounts;

  if (getLocalData !== null) {
    localAccounts = JSON.parse(getLocalData);
  } else {
    localAccounts = { users: [] };
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < localAccounts.users.length; i++) {
      if (email === localAccounts.users[i].email) {
        reject({ message: "User Already Exists" });
      }
    }
    const encryptedPassword = PBKDF2(password, "FakeAuthentication");
    const uid = uuid();
    localAccounts = {
      users: [
        ...localAccounts.users,
        { email, password: encryptedPassword.words, uid }
      ]
    };
    localStorage.setItem("users", JSON.stringify(localAccounts));
    resolve({ message: "User Created Successfully", uid });
  });
};

const signIn = (email, password) => {
  const getLocalData = localStorage.getItem("users");
  let usersExist = true;
  let localAccounts;

  if (getLocalData !== null) {
    localAccounts = JSON.parse(getLocalData);
  } else {
    localAccounts = { users: [] };
    usersExist = false;
  }

  return new Promise((resolve, reject) => {
    if (usersExist) {
      for (let i = 0; i < localAccounts.users.length; i++) {
        if (email === localAccounts.users[i].email) {
          const encryptedPassword = PBKDF2(password, "FakeAuthentication");
          for (let j = 0; j < localAccounts.users[i].password.length; j++) {
            if (
              encryptedPassword.words[j] !== localAccounts.users[i].password[j]
            ) {
              reject({ message: "Password Did Not Match" });
            }
          }
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              email: localAccounts.users[i].email,
              uuid: localAccounts.users[i].uid
            })
          );
          resolve({
            message: "SignIn Successful",
            uuid: localAccounts.users[i].uid
          });
        } else {
          reject({ message: "User Doesn't Exist" });
        }
      }
    } else {
      reject({ message: "User Doesn't Exist" });
    }
  });
};

const signOut = () => {
  localStorage.removeItem("currentUser");
};

const isAuthenticated = () => {
  const getLocalData = localStorage.getItem("currentUser");

  return new Promise((resolve, reject) => {
    if (getLocalData != null) {
      resolve({
        message: "Authenticated",
        isAuth: true,
        data: JSON.parse(getLocalData)
      });
    } else reject({ message: "Not Authenticated", isAuth: false, data: "" });
  });
};

const fakeAuth = {
  signUp: (email, password) => signUp(email, password),
  signIn: (email, password) => signIn(email, password),
  signOut: () => signOut(),
  isAuthenticated: () => isAuthenticated()
};

export default fakeAuth;
