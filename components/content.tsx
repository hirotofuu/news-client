import Link from "next/link";
const Content=(props: any)=>{
  return(
    <>
      <section className="w-full  p-2 pt-4  bg-white">
        {props.image_file ? <div className=" w-full aspect-video bg-black mb-3"></div>
        : ''}
        <div className=" leading-normal sm:leading-9 md:leading-9 lg:leading-9 xl:leading-9 leading-8 text-base font-normal">
          <p className="whitespace-pre-wrap">{props.content}
          </p>
        </div>
      </section>

    </>
  )
}

export default Content