import React,{button} from 'react'
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
// import firebase from 'firebase';
function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn =() =>{
        // auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        auth.signInWithPopup(provider).then(result =>
            {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            }
            ).catch(
                (e)=>alert(e.message)
            );
    }
    return (
        <div className="login">
        <div className="login_container">
       
        <div className="login_text">
        <h1>Welcome</h1>
        <h1>Sign in to Question Paper App</h1></div>
        <button onClick={signIn}>
                <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-vector-graphic-pixabay-15.png"
                height="50px"
                alt="logo"/>
        </button>
        </div>
        </div>
    )
}

export default Login
