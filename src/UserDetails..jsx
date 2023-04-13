import React, { useState,useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ReactPaginate from 'react-paginate';


 const  UserDetails=()=> {

const[data,setData]=useState([])
const[error,seterror]=useState(false)
const[searchquery,setSearchQuery]=useState("")
const[currentPage,setcurrentPage]=useState(1);
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city:'',
    postcode:'',
    age:''
  })
 
  // Fetch API data and update state
   useEffect(() => {
    fetch('https://randomuser.me/api/?inc=email,phone,name,dob,location')  
      .then(response => response.json())
      .then(data => setData(data.results))
      .catch(error => console.error(error));
  }, []);
  console.log(data)
 
  // search bar logic
 const filterdata=data.filter((user)=>{
  const fullname=`${user.name.first}`.toLowerCase();
  return fullname.includes(searchquery.toLowerCase())
 })


 // adding data using post request 
const AddDetails=async(e)=>{
e.preventDefault()
 const{firstName,lastName,city,postcode,age,email,phone}=formData
const postdata={
  name:{
    first:firstName,
    last: lastName
  },
  location:{
    city: city,
    postcode:postcode
  },
  dob:{
    age:age
  },

 email:email,
  phone:phone
}
 
await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(postdata),
  headers: {
     'Content-type': 'application/json; charset=UTF-8',
  },
})
.then((response) => response.json())
     .then((datas) => {
        setData((data) => [datas, ...data]);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city:'',
            postcode:'',
            age:''
        })
     })
     .catch((err) => {
        console.log(err.message);
     });

}

//handling error
const handlechange=(e)=>{
    const{name,value}=e.target
    if (value <= 18) {
      seterror('Age must be greater than 18');
    } else {
      seterror('');
    }

 
    setFormData({...formData,[name]:value})

}


// React paging 

const itemsPerPage = 1;
const pageCount = Math.ceil(data.length / itemsPerPage);
const offset = currentPage * itemsPerPage;

const handlePageClick = event => {
  setcurrentPage(event.selected);
};
  return (
    <div className='main border border-pink-500'>
      <div className='search flex justify-center mt-8'>

     <SearchIcon className='bg-pink-500 text-white'/> 
     <input value={searchquery} onChange={(e)=>setSearchQuery(e.target.value)}
      className='w-80 border border-pink-600 outline-none  rounded ' 
       placeholder='Enter the first name to search' />
      </div>
    <div className='form'>
   <form onSubmit={AddDetails}>
<div className='fields m-20 ml-80'>

<div className='flex '>

<h1 className='ml-6 font-bold'>First Name</h1>
<PersonIcon className=' ml-2 bg-pink-500 text-white rounded' />
<input onChange={handlechange} name='firstName'
value={formData.firstName}
required type='text' className='ml-2 border border-pink-500 rounded outline-none '
placeholder='enter first name' />

 <h1 className='ml-6 font-bold'>Last Name</h1>
 <PersonIcon className='ml-2 bg-pink-500 text-white rounded' />
 <input onChange={handlechange} name='lastName'  
 value={formData.lastName}  required type='text'
 className='ml-2 border border-pink-500 rounded outline-none ' 
placeholder='enter   last name'/>

 <h1 className='ml-6 font-bold'>DOB</h1>
 <CakeIcon className='ml-2 bg-pink-500 text-white rounded' />
 <input onChange={handlechange} name='age' value={formData.age} required type='number'
 className=' ml-2 border border-pink-500 rounded outline-none ' placeholder='enter  DOB' 
 pattern="[1-9][0-9]?" title="Age must be greater than 18!"/>

{ error && <span className='text-red-600 font-bold'>age  greater then 18</span>
}
 </div>

<div className='flex mt-10'>

<h1 className='ml-6 font-bold'>City Name</h1> 

 <LocationCityIcon className=' ml-2 bg-pink-500 text-white rounded' /> 
<input onChange={handlechange}
 name='city' value={formData.city}  
  required  type='text' 
  className='ml-2 border border-pink-500 rounded outline-none ' 
  placeholder='enter   City Name'/>

 <h1 className='ml-6 font-bold'>Phone NO</h1>
 <LocalPhoneIcon className='ml-2 bg-pink-500 text-white rounded' />
  <input name='phone' 
  pattern='[0-9]{10}'
  onChange={handlechange} 
  value={formData.phone}   
  type='tel' className=' ml-2 border border-pink-500 rounded outline-none '
  placeholder='enter  Phone'/>
 
  
 <h1 className='ml-6 font-bold'>Email</h1>
 <EmailIcon className='ml-2 bg-pink-500 text-white rounded' />
  <input name='email' onChange={handlechange}
  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" 
  value={formData.email} 
  required type='email' className='ml-2 border border-pink-500 rounded outline-none '
  placeholder='enter Email'/>

</div>
<div className='flex ml-80 mt-8'>

<h1 className='ml-6 font-bold'>passcode/zip</h1>

 <FolderZipIcon className='ml-2 bg-pink-500 text-white rounded' /> 
 <input name='postcode'
  onChange={handlechange}
  value={formData.postcode}  
   required type='number' 
   className='ml-2 border border-pink-500 rounded outline-none ' placeholder='enter passcode'/>

</div>
<button type='submit' className='  ml-80 mt-10 bg-pink-500 rounded text-white font-bold w-40 h-10'>submit</button>



</div>
   </form>
   <div className='flex flex-wrap'>

   {filterdata.slice(offset, offset+itemsPerPage).map(card=>(

<div className=" flex bg-white shadow-md rounded-md p-6 max-w-sm mx-auto border  border-pink-500 mt-4" key={card.email} >
      <div className='card ' >
          <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mx-auto">
              <p className="text-3xl text-gray-600">{card.name.first}</p>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4"><PersonIcon className=' mr-2 bg-pink-500 text-white rounded' />  {card.name.last}</h2>
          <p className="text-gray-600 mt-1  font-bold ">  <EmailIcon className=' mr-2 bg-pink-500 text-white rounded' /> Email :: {card.email}</p>
          <p className="text-gray-600 mt-1 font-bold"><LocalPhoneIcon className=' mr-2 bg-pink-500 text-white rounded' />Phone :: {card.phone}</p>
          <p className="text-gray-600 mt-1 font-bold"><FolderZipIcon className=' mr-2 bg-pink-500 text-white rounded' /> Postcode :: {card.location.postcode}</p>
          <p className="text-gray-600 mt-1 font-bold"> <LocationCityIcon className=' mr-2 bg-pink-500 text-white rounded' /> City :: {card.location.city}</p>
          <p className="text-gray-600 mt-1 font-bold"><CakeIcon className=' mr-2 bg-pink-500 text-white rounded' />age :{card.dob.age}</p>
      </div>
 
  </div>
   ))}
    
      </div>
       <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
         containerClassName={'flex justify-center items-center space-x-2'}
        activeClassName={'active bg-gray-300'}
        previousClassName={'flex items-center bg-gray-200 px-4 py-2 rounded-md cursor-pointer'}
        nextClassName={'flex items-center bg-gray-200 px-4 py-2 rounded-md cursor-pointer'}
        pageClassName={'bg-gray-200 px-4 py-2 rounded-md cursor-pointer'}
        pageLinkClassName={'text-black'}
        previousLinkClassName={'text-black'}
        nextLinkClassName={'text-black'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
      
      </div>      
    </div>
  )
}

export default UserDetails


// First name, Last name, Date of birth, email, mobile number, city and pincode/zipcode
