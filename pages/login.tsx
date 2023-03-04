import type { NextPage } from 'next';
import axios from '../libs/axios';
import Axios from 'axios';
import Link from "next/link";
import { AxiosError, AxiosResponse} from 'axios';
import { fetchCurrentUser } from '../libs/account';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../atoms/userAtom';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';



type LoginForm={
    email: string;
    password: string;
};

type Validation={
    email?: string,
    password?: string,
    loginFailed?: string 
};


const Login: NextPage = () => {
    const router = useRouter();

    const setCurrentUser = useSetRecoilState(currentUserState);


    const [loginForm, setLoginForm]=useState<LoginForm>({
        email: '',
        password: '',
    })

    const [validation, setValidation] = useState<Validation>({});


    const updateLoginForm=(e: ChangeEvent<HTMLInputElement>)=>{
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }



    const login = () => {
        setValidation({});
        axios
          .get('/sanctum/csrf-cookie')
          .then((res: AxiosResponse) => {
            axios
              .post('/api/login', loginForm)
              .then(async(response: AxiosResponse) => {
                try {
                    const currentUser = await fetchCurrentUser(); 
                    setCurrentUser(currentUser);
                  } catch {
                    setCurrentUser(null);
                  }
                router.push('/')
            })
              .catch((err: AxiosError) => {
                if (Axios.isAxiosError(err) && err.response && err.response.status === 422) {
                    const errors=err.response?.data.errors;
                    const validationMessages: { [index: string]: string } = {}  as Validation;
                    Object.keys(errors).map((key: string) => {
                      validationMessages[key] = errors[key][0];
                    });
                    setValidation(validationMessages);
                }
                if(Axios.isAxiosError(err) && err.response && err.response.status === 500){
                    setValidation({ loginFailed: "アドレスまたはパスワードが間違っています" });
                }
              });
          });
      };

      const googleLogin  = async() => {
        axios.get ( '/sanctum/csrf-cookie', { withCredentials: true } )
        await axios
          .get ( '/auth/redirect' )
          .then ( ( response ) => {
            window.location.href = response.data.redirect_url
          } )
          .catch ( ( err ) => {
            console.log ( err )
            console.log ( err.response )
          } )
      }
      

    return (
        
        <>

            <div className="container mx-auto mb-5">
                    <div className="max-w-xl p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700">newsbyte</h1>
                        <p className="text-gray-400 mb-6">Share knowledge, know the world</p>
                    </div>
                    <div className=" border-b pb-10">
                            <button onClick={googleLogin} id="googleSignIn" className="flex justify-center w-full  text-lg border-2 p-2 rounded-lg btn ">
                                <div className="flex gap-3">
                                    <svg aria-hidden="true" className="native svg-icon iconGoogle" width="30" height="30" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z" fill="#34A853"></path><path d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" fill="#FBBC05"></path><path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z" fill="#EA4335"></path></svg>
                                    Log in with Google
                                </div>
                            </button>
                        </div>


                        <div className="mb-6 mt-8">
                                <label id="email" className="text-sm text-gray-600">mail address</label>
                            <input
                            type="mail"
                            name="email"
                            placeholder=""
                            required
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            value={loginForm.email}
                            onChange={updateLoginForm}
                            />
                            {validation.email && (<p className="text-sm  text-red-500">{validation.email}</p>)}
                        </div>

                        <div className="mb-6">
                            <label id="phone" className="text-sm text-gray-600">password</label>
                            <input
                            type="password"
                            name="password"
                            placeholder=""
                            required
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            onChange={updateLoginForm}
                            value={loginForm.password}
                            />
                            {validation.password && (<p className="text-sm  text-red-500">{validation.password}</p>)}
                        </div>

                            <Link href="/register"><a className="text-blue-500 hover:underline">Don't have an account?</a></Link>

                            <div className="mb-6 mt-4">
                        <button
                            type="submit"
                            className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                            onClick={login}
                        >
                            login 
                        </button>
                </div>
                        </div>

                </div>


        </>
    )
}
 
export default Login

