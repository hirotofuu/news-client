
import type { NextPage } from 'next'
import axios from '../../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useState} from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { getEditTextArticle} from "../../../libs/fetchFunction";
import {GetServerSideProps} from 'next'
import type {Article} from "../../../types/article"
import { useIsMyInfoPage } from "../../../hooks/useMypageRoute"
import {category_contents} from "../../../libs/category_contents"
import Meta from '../../../components/meta'

export const getServerSideProps: GetServerSideProps= async (context) => {
  const id=context.params.id;
  const IndexArticle: Article | null=await getEditTextArticle(id);

  return{
    props: {
     article: {id, IndexArticle}
    },
  };
}

type CreateForm={
  id: string,
  title: string;
  content: string;
  source: string | null;
  category: string;
  comments_open: string;
};

const Create: NextPage = ({article}: any) => {
  const factor=article.IndexArticle
  const router=useRouter()
  const { currentUser } = useCurrentUser();
  const [createForm, setCreateForm]=useState<CreateForm>({
    id: article.id,
    title: factor.title,
    content: factor.content,
    source: factor.source,
    category: factor.category,
    comments_open: "true",
  })



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






  const create = () => {
    const config = {
      headers: {
      'content-type': 'multipart/form-data'
      }
    };
      axios
        .post(`/api/editArticleText?api_token=${currentUser.api_token}`, createForm)
        .then((response: AxiosResponse) => {  
          router.push('/mypage/articles')    
        })
        .catch((err: AxiosError) => {
          console.log(err.response);
          return;
        });
  };
  
  
  
  
  useIsMyInfoPage(factor.user_id)


  return (
    <>
      <Meta pageTitle={`editting ${article.IndexArticle.title} - newsbyte`} pageDesc={`editting ${article.IndexArticle.title} `}></Meta>

      <div className="container mx-auto">
        <div className="-full xl:w-1/2 lg:w-[600px] md:w-[600px] sm:w-full p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">edit an article</h1>
            <p className="text-gray-400 mb-6">Share knowledge, know the world</p>
          </div>
          <div>
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
              </div>

              <div>
                <label id="category" className="block mb-2 text-sm text-gray-600">category</label>
                <select name="category" className=" border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 block w-full p-2.5 "
                value={createForm.category}
                onChange={updateSelectTextForm}
                >
                  {category_contents.map((category: string, index: any)=>
                    <option key={index} value={category}>{category}</option>
                  )}
                </select>



              </div>



              <div className="mb-6 mt-6">
                <div className="flex gap-10 text-sm text-gray-600 mb-2">
                  <label id="source" className="">source (option)</label>
                  {createForm.source!==null ? <h1 className={createForm.source.length>1000? `text-red-500`: ''}>{`${createForm.source.length}/1000`}</h1> : ''}
                </div>
                <textarea
                  name="source"
                  placeholder="write url or other information"
                  className="h-30 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  value={createForm.source}
                  onChange={updateCreateTextForm}
                ></textarea>
              </div>


      

              <div className="mb-6">
                <button
                  className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                  onClick={create}
                >
                  update
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create