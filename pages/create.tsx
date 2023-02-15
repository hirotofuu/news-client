import type { NextPage } from 'next'
import axios from '../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useState, useEffect, useLayoutEffect, useRef} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useUserState } from 'atoms/userAtom';



type CreateForm={
  title: string;
  content: string;
  category: string;
  image_file?: File;
  comments_open: string;
  day_time: string;
};

const Create: NextPage = () => {
  const router = useRouter();

  const [createForm, setCreateForm]=useState<CreateForm>({
    title: '',
    content: '',
    category: '',
    image_file: null,
    comments_open: 'true',
    day_time: '',
  })

  const [fileImage, setFileImage] = useState('');

  const inputRef = useRef(null);

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    if (fileObject) {
      setCreateForm({ ...createForm, [e.target.name]: fileObject });
      setFileImage(window.URL.createObjectURL(fileObject));
      console.log(fileObject);
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

  const {user}=useUserState();

  useEffect(()=>{
    const now = new Date();
    setCreateForm({ ...createForm, day_time: `${now.getFullYear()}/${(now.getMonth() + 1)}/${now.getDate()}` })
  }, [])



  const create = () => {
    const config = {
      headers: {
      'content-type': 'multipart/form-data'
      }
    };
    const formData = new FormData();
    formData.append("title", createForm.title );
    formData.append("content", createForm.content );
    formData.append("category", createForm.category );
    formData.append("file", createForm.image_file);
    formData.append("comments_open", createForm.comments_open );
    formData.append("day_time", createForm.day_time );
    console.log(createForm);
    axios
      .get('/sanctum/csrf-cookie')
      .then((res: AxiosResponse) => {
        axios
          .post(`/api/create?api_token=${user.api_token}`, formData,)
          .then((response: AxiosResponse) => {
            console.log('seccess');
            
        })
          .catch((err: AxiosError) => {
             if(err.response.status===401){
              router.push("/login")
             }
             console.log(err);
          });
      });
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full xl:w-1/2 lg:w-[600px] md:w-[600px] sm:w-full p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">記事投稿</h1>
            <p className="text-gray-400 mb-6">特定の人への誹謗中傷や性的な表現は控えましょう。あまりに過激なものや報告があった記事は削除の対象となります。</p>
          </div>

              <div className="mb-6">
                <label id="title" className="text-sm text-gray-600">タイトル</label>
                <input
                  type="text"
                  name="title"
                  placeholder=""
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  value={createForm.title}
                  onChange={updateCreateForm}
                />
              </div>
              <div className="mb-6">
                <label id="content" className="block mb-2 text-sm text-gray-600"
                  >記事内容</label>
                <textarea
                  name="content"
                  placeholder="Your Message"
                  className="h-96 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  value={createForm.content}
                  onChange={updateCreateTextForm}
                ></textarea>
              </div>

              <div>
                <label id="category" className="block mb-2 text-sm text-gray-600">カテゴリー</label>
                <select name="category" className=" border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 block w-full p-2.5 "
                value={createForm.category}
                onChange={updateSelectTextForm}
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="ネット">ネット</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
              <div>
                <label id="image_file" className="block mb-2 text-sm text-gray-600">画像</label>
              </div>
              <div className="flex ">
                <button className="block w-36 text-sm text-black rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" 
                onClick={fileUpload}
                >画像をアップロード</button>
                <button onClick={reset} className="ml-3 border-2 rounded p-1 bg-gray-200 text-blue-500">reset</button>
              </div>
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
                <Image src={fileImage} className="bg-gray-300" objectFit="cover" layout="fill" />
              </div>



              <div>
                <label id="comment" className="block mb-2 text-sm text-gray-600">コメント</label>
                <select id="comment" className=" border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 block w-full p-2.5"
                name="comments_open"
                onChange={updateSelectTextForm}
                >
                  <option value='true'>公開</option>
                  <option value='false'>非公開</option>
                </select>
              </div>

              <div className="mb-6">
                <button
                  className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                  onClick={create}
                >
                  投稿
                </button>
              </div>

          </div>

      </div>
    </>
  )
}

export default Create