import React, {useEffect} from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/css/fontawesome.min.css';
import './theme/css/style.css';
import './theme/css/facebook.css';
import './theme/css/custom-progress-bar.css';
import './theme/css/app-style.css';
import './theme/css/responsive.css';
/* Theme variables */
//import './theme/variables.css';
import LoginPage from "./pages/LoginPage/LoginPage";
import {AppEnterMainPage} from "./pages/AppEnterMainPage";
import {useDispatch} from "react-redux";
import {actionToGetUserProfileData, actionToSetWindowSizeCount} from "./actions/CommonAction";
import $ from "jquery";
import useAuth from "./hooks/useAuth";
import {useEffectOnce} from "./hooks/useEffectOnce";
import {setHeaderForAuthorization} from "./hooks/api/ApiConfig";
import {parseJwt} from "./hooks/jwtUtils";
import {USER_SIGNIN_SUCCESS} from "./constants/CommonConstants";
setupIonicReact();


const PublicRoutes = () => {
  return (
      <IonReactRouter basename={"/app"}>
        <Route path="/login" exact={true} component={LoginPage} />
        <Redirect  exact from="/"  to="/login" />
        <Route render={() => <Redirect to="/login" />} />
      </IonReactRouter>
  );
};


const App = () => {
    const { setAuth,auth } = useAuth();
    const dispatch = useDispatch();
    const authorized = async()=>{
        if(localStorage.getItem('accessToken')){
            const data =localStorage.getItem('accessToken');
            if (data ) {
                setHeaderForAuthorization(data);
                let user =  await parseJwt(data);
                dispatch(actionToGetUserProfileData());
                setAuth({...user});
            }
        }
    }

    useEffectOnce(() => {
        authorized();
    });
    useEffect(() => {
        dispatch(actionToSetWindowSizeCount($(window).width()));
        window.addEventListener('resize', function() {
            dispatch(actionToSetWindowSizeCount($(window).width()));
        });
    }, []);
    /*------ Pages-----*/

  return (
      <IonApp>
          { localStorage.getItem('accessToken') ? <AppEnterMainPage/> : <PublicRoutes/>}
      </IonApp>
  )
}

export default App;

