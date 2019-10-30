# Fake Authentication

## Overview

A Fake Authentication System Using LocalStorage.

## Features

- Sign Up
- Sign In
- Sign Out
- Check Authenticated State

## Usage

If you're using yarn, `yarn add fake-authentication`

If you're using npm, `npm install fake-authentication`

```javascript
import fakeAuth from "fake-authentication";

// For SignUp
fakeAuth
  .signUp("someone@something.com", "password")
  .then(resp => console.log(resp)) // { message: "User Created Successfully", uid: "some-uid" }
  .catch(err => console.log(err)); // { message: "User Already Exists" }

// For SignIn
fakeAuth
  .signIn("someone@something.com", "password")
  .then(resp => console.log(resp)) // { message: "SignIn Successful", uid: ""some-uid }
  .catch(err => console.log(err)); // { message: "Password Did Not Match || User Doesn't Exist" }

// Check AuthState
fakeAuth
  .isAuthenticated()
  .then(resp => console.log(resp)) // { message: "Authenticated", isAuth: true, data: { email: "someone@something.com", uid: "some-uid" } }
  .catch(err => console.log(err)); // { message: "Not Authenticated", isAuth: false, data: "" }

// For SignOut
fakeAuth.signOut();
```
