import React, { useState } from 'react';
import Header from "./Header";
import { Link, } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
function Register() {
// const navigate = useNavigate();
 
const [values,setvalue] = useState({
    email: "",
    password: "",
  })
const [isOpen,setIsOpen] = React.useState(false)
const [resStatus,setResStats] = React.useState(false)

const handelSubmit =(e)=>{
    e.preventDefault();
          const {email ,  password} = values
          auth.register(email ,  password).then((res) => {
                setIsOpen(true);
                setResStats(true);
               // navigate("/signin");
        
          }).catch((res) => {
            if (res.status === 400) {
              console.log("one of the fields was filled in incorrectly ") 
            }
           
            setIsOpen(true);
            setResStats(false);
          })
        }
       

const closePopup =()=>{
    setIsOpen(false)
}


const handleChange=(e)=> {
        const { name, value } = e.target;
      setvalue({...values,
          [name]: value,});
      }

    return (  
        <div>
        <Header navTo={'signin'} title={"Log in"}/>
        <InfoTooltip isOpen={isOpen} closePopup={closePopup} resStatus={resStatus}/>

        <div className='register'>

            <div>
                <h2 className={"popup__title_them_black"}>Signup</h2>
                <form onSubmit={handelSubmit}
                    action="#"
                    method="POST"
                    name={"Login"}
                    className={`popup__content popup__form `}
                >

                    <input type="email"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        required
                        minLength="5"
                        maxLength="40"
                        onChange={handleChange}
                        autoComplete="on"
                        className='login__input'>
                    </input>
                    <input type="password"
                        placeholder="password"
                        name="password"
                        required
                        value={values.password}
                        onChange={handleChange}
                        minLength="8"
                        autoComplete="on"
                        maxLength="40"
                        className='login__input'>
                    </input>

                    <button className={" popup__button  popup__button_them_black"} type="submit">
                    Sign up
                    </button>
                </form>

            </div>


            </div> 
        <p className='signup__subtitle'>Already a member? <Link to="/signin" className="signup__link">Log in</Link> here!</p>
        </div>
    )
};

export default Register



