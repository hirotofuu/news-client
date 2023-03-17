import type { NextPage } from 'next'
import axios from '../../../libs/axios';
import Image from 'next/image'
import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useState, useRef} from 'react';
import { useRouter } from 'next/router';
import {getShowArticle, getEditPicArticle} from "../../../libs/fetchFunction";
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import {GetServerSideProps} from 'next'
import {useGetUserinfo} from '../../../hooks/useGetUserinfo'
import nookies from 'nookies'
import type {Article} from "../../../types/article"
import { useIsMyInfoPage } from "../../../hooks/useMypageRoute"
import Meta from '../../../components/meta'


export const getServerSideProps: GetServerSideProps= async (context) => {
  const id=context.params.id;
  const IndexArticle: Article | null=await getEditPicArticle(id);
  const cookies = nookies.get(context)
  return{
    props: {
     article: {id, IndexArticle, cookies}
    },
  };
}

type CreateForm={
  id: any;
  image_file?: File;
};




const Create: NextPage = ({article}: any) => {

  const router=useRouter()
  const {getUserinfo}=useGetUserinfo()
  const { currentUser } = useCurrentUser();

  const [createForm, setCreateForm]=useState<CreateForm>({
    id: article.id,
    image_file: article.image_file,

  })


  const [fileImage, setFileImage] = useState(article.IndexArticle.image_file ? `https://s3.us-east-1.amazonaws.com/newsbyte/${article.IndexArticle.image_file}` : '');

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

 

 



  const reset=()=>{
    setCreateForm({...createForm, image_file: null});
    setFileImage("");
  }


  getUserinfo(article.cookies.uid)

  useIsMyInfoPage(article.IndexArticle.user_id)




  const edit = () => {
    const config = {
      headers: {
      'content-type': 'multipart/form-data'
      }
    };
    const formData = new FormData();
    formData.append("file", createForm.image_file);
    formData.append("id", createForm.id);
        axios
          .post(`/api/editArticlePic?api_token=${currentUser.api_token}`, formData,)
          .then((response: AxiosResponse) => {
            router.push('/mypage/articles')
            
        })
          .catch((err: AxiosError) => {
            console.log(err);
          });

  };

  return (
    <>
      <Meta pageTitle={`editting ${article.IndexArticle.title} picture - newsbyte`} pageDesc={`editting ${article.IndexArticle.title} picture`}></Meta>
      <div className="container mx-auto">
        <div className="w-full xl:w-1/2 lg:w-[600px] md:w-[600px] sm:w-full p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">edit an article image</h1>
            <p className="text-gray-400 mb-6">Share knowledge, know the world</p>
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


              <h1>image preview</h1>
              <div className="relative w-full h-96">
                <Image src={fileImage} alt="image" className="bg-gray-300" objectFit="cover" layout="fill" />
              </div>


              <div className="mb-6 mt-6">
                <button
                  className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                  onClick={edit}
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