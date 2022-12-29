import type { NextPage } from 'next';
import axios from '../libs/axios';
import { AxiosError, AxiosResponse} from 'axios';
import Axios from 'axios';
import { ChangeEvent, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useUserState } from '../atoms/userAtom';



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
    const { setUser } = useUserState();


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
              .then((response: AxiosResponse) => {
                setUser(response.data.data);
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
      

    return (
        
        <>

                <div className="container mx-auto mb-5">
                    <div className="max-w-xl p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700">Nite</h1>
                        <p className="text-gray-400 mb-6">ログインして記事を投稿したりコメントを共有しよう！</p>
                    </div>

                    <div>
                        <div className="mb-6">
                                <label id="email" className="text-sm text-gray-600">メールアドレス</label>
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
                            <label id="phone" className="text-sm text-gray-600">パスワード</label>
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

                            <Link href="/register"><a className="text-blue-500 hover:underline">新規登録はこちら</a></Link>

                            <div className="mb-6 mt-2">
                                {validation.loginFailed ? <p className="text-sm  text-red-500">{validation.loginFailed}</p> : ''}
                                <button
                                type="submit"
                                className="w-full p-2  text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                                onClick={login}
                                >
                                Send
                                </button>
                            </div>
                    </div>
                    </div>
                </div>


        </>
    )
}
 
export default Login

