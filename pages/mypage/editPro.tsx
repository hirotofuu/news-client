import { NextPage } from 'next';

import Meta from "../../components/meta"
import axios from '../../libs/axios';
import Axios from 'axios';
import { AxiosError, AxiosResponse } from 'axios';
import React, { ChangeEvent, useCallback, useRef, useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { currentUserState } from '../../atoms/userAtom';
import { useRouter } from 'next/router';
import Avatar from 'react-avatar';
import { IconEditor } from '../../components/IconEditor';

type CreateForm={
  id: any;
  name: string;
  profile: string;
};

type Validation={
  name?: string,
  profile?: string,
};

const EditPro: NextPage = () => {
  const router=useRouter()
  const { isAuthChecking, currentUser } = useCurrentUser();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [icon, setIcon] = useState<File | null>(null);
  const [previewIcon, setPreviewIcon] = useState<File | null>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const [editForm, setEditForm]=useState<CreateForm>({
    id: '',
    name: '',
    profile: '',

  })

  const [validation, setValidation] = useState<Validation>({});


  const updateCreateForm=(e: ChangeEvent<HTMLInputElement>)=>{
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    } 

    const updateCreateTextForm=(e: ChangeEvent<HTMLTextAreaElement>)=>{
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  
  const handleClickChangeIcon = useCallback(() => {
    if (!iconInputRef || !iconInputRef.current) return;
      iconInputRef.current.click();
  }, []);

  const handleChangePreviewIcon = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;
      setPreviewIcon(e.target.files[0]);
      e.currentTarget.value = '';
    },
    [],
  );


  const handleChangeIcon = (
    (nextIcon: File | null) => {
      setIcon(nextIcon);
      

      const PicData = new FormData();
      PicData.append("file", nextIcon);
      PicData.append("id", String(currentUser.id));


          axios
            .post(`/api/editProfile`, PicData,)
            .then((response: AxiosResponse) => {
              console.log("success")
              console.log(response.data)
              setCurrentUser( {...currentUser, avatar_image: response.data.img})
          })
            .catch((err: AxiosError) => {
              console.log(err)
              return
            });
        });

  

  const edit = () => {
    console.log(editForm)
        axios
          .post(`/api/editTextProfile`, editForm)
          .then((response: AxiosResponse) => {
            console.log('seccess');
            setCurrentUser( {...currentUser, name: editForm.name, profile: editForm.profile})
            router.push(`/mypage/articles`)
            
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


  useEffect(
    () => {
      if(!isAuthChecking && currentUser)
      setEditForm({profile: currentUser.profile ? currentUser.profile : '', name: currentUser.name, id: currentUser.id});
    },[currentUser])

    if(isAuthChecking) return (<div>ログイン情報を確認中…</div>);
  
    if(!currentUser) return (<div>ログインしていません</div>);
  return (
    <>
      <Meta pageTitle={`edit profile - newsbyte`} pageDesc="you can edit your profile here"></Meta>
      <div>
        

        <main >
        <div className="container mx-auto mb-5">
          <div className="max-w-xl p-5 mx-auto xl:border-4 lg:border-4 md:border-4 my-2 xl:my-10 lg:my-10 md:my-10   bg-white rounded-md">

          <div className="text-center mb-10">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">profile</h1>
          </div>


              <Avatar
                onClick={handleClickChangeIcon}
                size="160"
                round
                className="mb-4 cursor-pointer"
                src={icon!==null ? URL.createObjectURL(icon) : `https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${currentUser.avatar_image}`}
              />
              <div>
                <div className="mb-6">
                  <label id="title" className="text-sm text-gray-600">name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder=""
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    value={editForm.name}
                    onChange={updateCreateForm}
                  />
                  {validation.name && (<p className="text-sm  text-red-500">{validation.name}</p>)}
                </div>

                <div className="mb-6">
                <div className="flex gap-10 text-sm text-gray-600 mb-2">
                  <label id="profile" className="">profile</label>
                  <h1 className="">{`${editForm.profile.length}/250`}</h1>
                </div>
                  <textarea
                    name="profile"
                    placeholder="your profile"
                    className="h-36 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    value={editForm.profile}
                    onChange={updateCreateTextForm}

                  ></textarea>
                  {validation.profile && (<p className="text-sm  text-red-500">{validation.profile}</p>)}
                </div>

                <div className="mb-6">
                  <button
                    className="w-full p-2 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                    onClick={edit}
                  >
                    update
                  </button>
                </div>

              </div>

            </div>

            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={iconInputRef}
              onChange={handleChangePreviewIcon}
            />
          </div>
          <IconEditor
            previewIcon={previewIcon}
            onChangePreviewIcon={setPreviewIcon}
            onChangeIcon={handleChangeIcon}
            />

        </main>
            </div>

    
    </>
  )
}

export default EditPro