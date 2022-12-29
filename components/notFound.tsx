const NotFound=(props: any)=>{
  return(
  <>
    <div className="w-full p-5 pb-10 bg-white">
      <h1 className="mb-5 mt-4 text-center text-6xl">😿</h1>
      <p className="text-center">{`we couldn't find any ${props.what} for “ ${props.keyword} ”`}<br/>let's post articles and share your information</p>
    </div>
  </>
  )
}


export default NotFound