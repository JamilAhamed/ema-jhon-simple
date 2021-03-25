


import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignin, handleGoggleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

// firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })

  initializeLoginFramework();

  const [loggedInUser, setloggedInuser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn =()=>{
    handleGoggleSignIn()
    .then(res =>{
      handleResponse(res, true);
    })
  }

  const fbSignIn =()=>{
    handleFbSignin()
    .then(res =>{
      handleResponse(res, true);
  })
}
  const signOut =() =>{
    handleSignOut()
    .then(res =>{
      handleResponse(res, false);
    })
  }
  const handleResponse = (res,redirect)=>{
      setUser(res);
      setloggedInuser(res);
      if(redirect){
        history.replace(from);
      }
  }
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordhasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = (isPasswordValid && passwordhasNumber)
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if (user.email && user.password) {
      // console.log(user.email)
      createUserWithEmailAndPassword(user.name,user.email, user.password)
      .then(res =>{
        console.log(res)
        handleResponse(res, true);
      })
    }
    if (!newUser && user.email && user.password) {
      // console.log(user.email, user.password)
      signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        // console.log(res)
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }
  
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign In </button>
      }
      <br/>
      <button onClick={handleFbSignin}>Sign in using facebook</button>
      {
        user.isSignIn && <div>
          <p>Welcome: {user.name}</p>
          <h3>Your Email: {user.email}</h3>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your Name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Adress" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
        <br />
        <input type="submit" value={newUser ? 'sign up': 'sign in'}/>
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
    </div>
  );
}

export default Login;