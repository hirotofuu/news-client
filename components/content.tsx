import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { useUserState } from 'atoms/userAtom';
import {Article} from "../types/article"
import {getTruth, deleteTruth, getFake, deleteFake} from "../libs/goodFunction"

interface Props {
  content: Article | null;
}

const Content: React.FC<Props> =(props: Props)=>{
  const article=props.content;
  const router=useRouter();
  const {user}=useUserState();
  const [isTruth, setIsTruth]=useState<boolean>(false);
  const [isFake, setIsFake]=useState<boolean>(false);
  const [TruthNumber, setTruthNumber]=useState<number>(article.truth_number);
  const [FakeNumber, setFakeNumber]=useState<number>(article.fake_number);

  const goLogin=()=>{
    router.push("/login");
  }

  const truthClick= async ()=>{
      if(!isTruth && !isFake){
        const a=await getTruth(article.id, user.api_token);
        setTruthNumber(TruthNumber+1);
        setIsTruth(true);
      }else if(!isTruth && isFake){
        const a=await getTruth(article.id, user.api_token);
        const b=await deleteFake(article.id, user.api_token);
        setTruthNumber(TruthNumber+1);
        setIsTruth(true);
        setFakeNumber(FakeNumber-1);
        setIsFake(false);
      }else if(isTruth){
        const b=await deleteTruth(article.id, user.api_token);
        setTruthNumber(TruthNumber-1);
        setIsTruth(false);
      }

  }

  const FakeClick= async ()=>{
      if(!isTruth && !isFake){
        const a=await getFake(article.id, user.api_token);
        setFakeNumber(FakeNumber+1);
        setIsFake(true);
      }else if(!isFake && isTruth){
        const a=await getFake(article.id, user.api_token);
        const b=await deleteTruth(article.id, user.api_token);
        setFakeNumber(FakeNumber+1);
        setIsFake(true);
        setTruthNumber(TruthNumber-1);
        setIsTruth(false);
      }else if(isFake){
        const b=await deleteFake(article.id, user.api_token);
        setFakeNumber(FakeNumber-1);
        setIsFake(false);
      }

  }
 


  useEffect(()=>{
    if(user.id){
      article.is_truth.map((truth :any)=>{
        if(truth===user.id){
          setIsTruth(true);
          return;
        }
      })
      article.is_fake.map((fake :any)=>{
        if(fake===user.id){
          setIsFake(true);
          return;
        }
      })
    }
    }, [user])
  return(
    <>
      <section className="w-full  p-2 pt-4  bg-white">
        {article.image_file ? <Image src={`https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${article.image_file}`} className="" objectFit="cover"   width={800}  height={475} /> : ''}
        <div className="mt-3 leading-normal sm:leading-9 md:leading-9 lg:leading-9 xl:leading-9 leading-8 text-base font-normal">
          <p className="whitespace-pre-wrap">{article.content}</p>
        </div>
        <div className="flex justify-between mt-6 mb-4">
          <div></div>
          <div>
            <button onClick={user.id ? truthClick : goLogin} className={!isTruth ? "p-1  border-2 border-red-600 text-red-600 rounded-lg" : "p-1 border-2 bg-red-600 border-red-600 text-white rounded-lg"}>truth {TruthNumber}</button>
            <button onClick={user.id ? FakeClick : goLogin}  className={!isFake ? "p-1 ml-2 border-2 border-blue-800 text-blue-800 rounded-lg" : "p-1 ml-2 border-2 border-blue-800 bg-blue-800 text-white rounded-lg"}>fake {FakeNumber}</button>
          </div>
        </div>
      </section>

    </>
  )
}

export default Content