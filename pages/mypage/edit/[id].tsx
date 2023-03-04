import type { NextPage } from 'next'
import axios from '../../../libs/axios';
import Head from 'next/head'
import Image from 'next/image'
import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useState} from 'react';
import {getShowArticle} from "../../../libs/fetchFunction";
import {GetServerSideProps} from 'next'
import type {Article} from "../../../types/article"
import { useIsMyInfoPage } from "../../../hooks/useMypageRoute"

export const getServerSideProps: GetServerSideProps= async (context) => {
  const id=context.params.id;
  const IndexArticle: Article | null=await getShowArticle(id);

  return{
    props: {
     article: {id, IndexArticle}
    },
  };
}

type CreateForm={
  id: number,
  title: string;
  content: string;
  category: string;
  comments_open: string;
};

const Create: NextPage = ({article}: any) => {
  const factor=article.IndexArticle
  const [createForm, setCreateForm]=useState<CreateForm>({
    id: factor.id,
    title: factor.title,
    content: factor.content,
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


  useIsMyInfoPage(factor.user_id)





  const create = () => {
    const config = {
      headers: {
      'content-type': 'multipart/form-data'
      }
    };
    console.log(createForm);
        axios
          .post(`/api/editArticleText`, createForm)
          .then((response: AxiosResponse) => {
            console.log('seccess');
            
        })
          .catch((err: AxiosError) => {
            console.log(err.response);
          });
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="-full xl:w-1/2 lg:w-[600px] md:w-[600px] sm:w-full p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">edit page</h1>
            <p className="text-gray-400 mb-6">Refrain from slanderous or sexual expressions directed at specific people. Articles that are too extreme or have been reported will be subject to deletion</p>
          </div>
          <div>
              <div className="mb-6">
                <label id="title" className="text-sm text-gray-600">title</label>
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
                  >content</label>
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
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="ネット">ネット</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
      

              <div>
                <label id="comment" className="block mb-2 text-sm text-gray-600">comment open</label>
                <select id="comment" className=" border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 block w-full p-2.5"
                name="comments_open"
                onChange={updateSelectTextForm}
                >
                  <option value='true'>open</option>
                  <option value='false'>close</option>
                </select>
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