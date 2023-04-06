
// import the nessasary compoenents
import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate, NavLink} from 'react-router-dom';

// import the nessasary logos
import Logo from '../../assets/spasm.png';
import Wallpaper from '../../assets/wallpaper2.png';

import './App.css';

const Signin = () => { //create the signin feature
  const { user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => { //google authentication sign in
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  return ( // the constrution of the signin page
    <div className='SignInBody'>
      <div className="Image" style={{
        flex: 1,
      }}>
          <img 
            src={Wallpaper} 
            alt="my image"
            style={{
                width: '100%',
                height: '100%',
                right: 0,
                objectFit: 'fill',
            }}/>
      </div> 
      <div className="LoginPage"> // login button
          <img src={Logo} className="LogoImg" alt="Labby Logo"></img> 

          <div className="LoginContainer">
            <div className="LoginForm">
              <div className="LoginTitle">
                <h2>Log in</h2>
              </div>
              <form>
                <input
                  className="LoginInput"
                  placeholder="Email"
                  type={"email"}
                ></input>
                <input
                  className="LoginInput"
                  placeholder="Password"
                  type={"password"}
                ></input>
                
                {/* <div className="ForgotPassword">
                              Forgot Password
                          </div> */}
                <div className="SignInBtn"> 
                  <button>
                    Log in
                  </button>
                </div>
              </form>
            </div>
            <div className="CreateAccount">
              <div>Not a user? Create an account&nbsp;</div>
              <NavLink to={`/signin`}>here.</NavLink>
            </div>
            
        </div>
          <GoogleButton onClick={handleGoogleSignIn} />
      </div>

    </div>
  );
};

export default Signin;
