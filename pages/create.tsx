import type { NextPage } from 'next'
import axios from '../libs/axios';
import Axios from 'axios';
import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useState, useEffect, useRef} from 'react';
import { useRequireLogin } from "../hooks/useRequireLogin"
import {category_contents} from "../libs/category_contents"
import { useCurrentUser } from "../hooks/useCurrentUser"
import Meta from '../components/meta'
import Image from 'next/image'
import { useRouter } from 'next/router';



type CreateForm={
  title: string;
  content: string;
  source: string;
  category: string;
  image_file?: File;
  comments_open: string;
  day_time: string;
};

type Validation={
  title?: string,
  content?: string,
  source?: string,
  file?: string ,
  category?: string, 
};

const Create: NextPage = () => {
  const router = useRouter();
  const { isAuthChecking, currentUser } = useCurrentUser();
  const [createForm, setCreateForm]=useState<CreateForm>({
    title: '',
    content: '',
    source: '',
    category: '',
    image_file: null,
    comments_open: 'true',
    day_time: '',
  })

  const [validation, setValidation] = useState<Validation>({});

  const [fileImage, setFileImage] = useState('');

  const inputRef = useRef(null);

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    if (fileObject) {
      setCreateForm({ ...createForm, [e.target.name]: fileObject });
      setFileImage(window.URL.createObjectURL(fileObject));
    }
  };

  const fileUpload = () => {
    inputRef.current.click();
  };

  const updateCreateForm=(e: ChangeEvent<HTMLInputElement>)=>{
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
    } 

  const updateCreateTextForm=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  }

  const updateSelectTextForm=(e: ChangeEvent<HTMLSelectElement>)=>{
    const files = e.target.value
    if (files) {
      setCreateForm({ ...createForm, [e.target.name]: files });
      console.log(files);
    }
  }


  const reset=()=>{
    setCreateForm({...createForm, image_file: null});
    setFileImage("");
  }


  useEffect(()=>{
    const now = new Date();
    setCreateForm({ ...createForm, day_time: `${now.getFullYear()}/${(now.getMonth() + 1)}/${now.getDate()}` })
  }, [])



  const create = () => {
    setValidation({});
    const config = {
      headers: {
      'content-type': 'multipart/form-data'
      }
    };
    const formData = new FormData();
    formData.append("title", createForm.title );
    formData.append("content", createForm.content );
    formData.append("source", createForm.source );
    formData.append("category", createForm.category );
    formData.append("file", createForm.image_file);
    formData.append("comments_open", createForm.comments_open );
    formData.append("day_time", createForm.day_time );
    formData.append("user_id ", currentUser.id );
    console.log(createForm);
        axios
          .post(`/api/create?api_token=${currentUser.api_token}`, formData,)
          .then((response: AxiosResponse) => {
            router.push(`/mypage/articles`)
            
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
             if(err.response.status===401){
              router.push("/login")
             }
             console.log(err);
          });
  };



  useRequireLogin()

  return (
    <>
      <Meta pageTitle="create - newsbyte" pageDesc="newsbyte create page. you can share your knowledge, view and know world "></Meta>

      <div className="container mx-auto">
        <div className="w-full xl:w-1/2 lg:w-[600px] md:w-[600px] sm:w-full p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">upload article</h1>
            <p className="text-gray-400 mb-6">Share knowledge, know the world</p>
          </div>

              <div className="mb-6">
                <div className="flex gap-10 text-sm text-gray-600 mb-2">
                  <label id="title" className="">title</label>
                  <h1 className={createForm.title.length>240? `text-red-500`: ''}>{`${createForm.title.length}/240`}</h1>
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder=""
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  value={createForm.title}
                  onChange={updateCreateForm}
                />
                {validation.title && (<p className="text-sm  text-red-500">{validation.title}</p>)}
              </div>
              <div className="mb-6">
                <div className="flex gap-10 text-sm text-gray-600 mb-2">
                  <label id="title" className="">content</label>
                  <h1 className={createForm.content.length>10000? `text-red-500`: ''}>{`${createForm.content.length}/10000`}</h1>
                </div>
                <textarea
                  name="content"
                  placeholder="Your Message"
                  className="h-96 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  value={createForm.content}
                  onChange={updateCreateTextForm}
                ></textarea>
                {validation.content && (<p className="text-sm  text-red-500">{validation.content}</p>)}
              </div>

              <div className="mb-6">
                <label id="category" className="block mb-2 text-sm text-gray-600">category</label>
                <select name="category" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 block w-full p-2.5 "
                value={createForm.category}
                onChange={updateSelectTextForm}
                >
                  {category_contents.map((category: string, index: any)=>
                  <option key={index} value={category}>{category}</option>
                  )}

                </select>
                {validation.category && (<p className="text-sm  text-red-500">{validation.category}</p>)}
              </div>
              <div>
                <label id="image_file" className="block mb-2 text-sm text-gray-600">image</label>
              </div>
              <div className="flex ">
                <button className="block w-36 text-sm text-black rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                onClick={fileUpload}
                >upload image</button>
                <button onClick={reset} className="ml-3 border-2 rounded p-1 bg-gray-200 text-blue-500">reset</button>
              </div>
              {validation.file && (<p className="text-sm  text-red-500">{validation.file}</p>)}
              <h1 className="mb-6">{createForm.image_file && createForm.image_file.name }</h1>

              <input
              hidden
              ref={inputRef}
              type="file"
              accept="image/*"
              name="image_file"
              onChange={onFileInputChange}/>


              <h1>selected pic</h1>
              <div className="relative w-full h-96">
                <Image src={fileImage} alt="image" className="bg-gray-300" objectFit="cover" layout="fill" />
              </div>

              <div className="mb-6 mt-6">
                <div className="flex gap-10 text-sm text-gray-600 mb-2">
                  <label id="source" className="">source</label>
                  <h1 className={createForm.source.length>1000? `text-red-500`: ''}>{`${createForm.source.length}/1000`}</h1>
                </div>
                <textarea
                  name="source"
                  placeholder="write url or other information"
                  className="h-30 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  value={createForm.source}
                  onChange={updateCreateTextForm}
                ></textarea>
                {validation.content && (<p className="text-sm  text-red-500">{validation.source}</p>)}
              </div>


              <div className="mb-6 mt-6">
                <button
                  className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                  onClick={create}
                >
                  upload
                </button>
              </div>

          </div>

      </div>
    </>
  )
}

export default Create