import {useState ,useEffect} from 'react'
import bookMarkProperty from "@/app/actions/bookmarkProperty";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import checkBookmarkStatus from '@/app/actions/checkBookMarkStatus';

const BookMark = ({ property }) => {
  
  const { data: session } = useSession();
  const userId=session?.user?.id;
const [isBookMarked,setIsBookMarked] = useState(false);     
const [loading,setLoading] = useState(true);

useEffect(()=>{
if(!userId){
  setLoading(false);
  return
}
checkBookmarkStatus(property._id).then((res)=>{
  if(res.error) return toast.error(res.error);
  if(res.isBookMarked) setIsBookMarked(res.isBookMarked);
  setLoading(false);
})
},[property._id,userId,checkBookmarkStatus])

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please Login to bookmark property");
      return;
    }
    bookMarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookMarked(res.isBookMarked)
      toast.success(res.message);
    });
  };
if(loading) {
  return<p className='text-center'>Loading.....</p>
}
  return  isBookMarked ? (
    <div className="space-y-4">
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        <FaBookmark className=" mr-2" onClick={handleClick} />
         Remove Bookmark
      </button>
    </div>
  ):(
    <div className="space-y-4">
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaBookmark className=" mr-2" onClick={handleClick} />
      Bookmark Property
    </button>
  </div>
  )
};

export default BookMark;
