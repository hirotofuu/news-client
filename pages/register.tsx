import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Axios from 'axios';
import { ChangeEvent, useState } from 'react';
import axios from '../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';


type RegisterForm={
  name: string,
  email: string;
  password: string;
  password_confirmation: string;
};

type Validation={
  name?: string,
  email?: string,
  password?: string,
};

const Register: NextPage = () => {
  const router = useRouter();


  const [registerForm, setRegisterForm]=useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [validation, setValidation] = useState<Validation>({});



  const updateRegisterForm = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };


  const register = () => {
    setValidation({})
        axios
          .post('/api/register', registerForm)
          .then((res: AxiosResponse) => {
            console.log('success');
            router.push("/");
          })
          .catch((err: AxiosError) => {
            console.log(err)
            if (Axios.isAxiosError(err) && err.response && err.response.status === 422) {
              const errors=err.response?.data.errors;
              const validationMessages: { [index: string]: string } = {}  as Validation;
              Object.keys(errors).map((key: string) => {
                validationMessages[key] = errors[key][0];
              });
              setValidation(validationMessages);
          }
          });
  };


  return (

      <div>
        <div className="container mx-auto mb-5">
          <div className="max-w-xl p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">newsbyte</h1>
              <p className="text-gray-400 mb-6">Share knowledge, know the world</p>
            </div>
            <div>
                <div className="mb-6">
                  <label id="phone" className="text-sm text-gray-600">display name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder=""
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    value={registerForm.name}
                    onChange={updateRegisterForm}
                  />
                  {validation.name && (<p className="text-sm  text-red-500">{validation.name}</p>)}
                </div>
                <div className="mb-6">
                  <label id="phone" className="text-sm text-gray-600">mail address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder=""
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    value={registerForm.email}
                    onChange={updateRegisterForm}
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
                    value={registerForm.password}
                    onChange={updateRegisterForm}
                  />
                  {validation.password && (<p className="text-sm  text-red-500">{validation.password}</p>)}
                </div>
                <div className="mb-6">
                  <label id="phone" className="text-sm text-gray-600">password confirm</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder=""
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    value={registerForm.password_confirmation}
                    onChange={updateRegisterForm}
                  />
                  {validation.password && (<p className="text-sm  text-red-500">{validation.password}</p>)}
                </div>
                <Link href="/login"><a className="text-blue-500 hover:underline"> have an account?</a></Link>

                <div className="mb-6 mt-4">
                  <button
                    type="submit"
                    className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                    onClick={register}
                  >
                    register
                  </button>
                </div>
            </div>
          </div>
        </div>

      </div>

  )
}

export default Register