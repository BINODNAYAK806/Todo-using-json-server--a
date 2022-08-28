import React from 'react'
import styles from './list.module.css'

export const Todo = () => {

const [page,setPage]=React.useState(1)
const [input,setInput] = React.useState("");
const [data,setSetdata] = React.useState([]);
const [loding,setLoding] = React.useState(false);
const [error,setError] = React.useState(false);
const [npage,setNpage] =React.useState(0);

const getitem =()=>{

   setLoding(true);
   
   fetch(`http://localhost:3004/todo?_page=${page}&_limit=2`) 
   
.then((res)=>res.json())
    .then((res)=>{
        // console.log(res.headers["x-total-count"])
        // let total = ;
        // setNpage(res.headers.get('X-Total-Count'))
        setSetdata(res)
        setLoding(false)
        

    })
    .catch((err)=>{

        setError(true)
        setLoding(false)
        setSetdata([])
    })
}
React.useEffect(()=>{

    getitem()

},[page])

const addtodo =()=>{

    const alldata = {
        "item": input,
        "imp": true,
        "status": false,
        

    }
    fetch(`http://localhost:3004/todo`,{

        method : "POST",
        body :JSON.stringify(alldata),
        headers:{

            
            "content-type":"application/json"
        }

    })
    .then((res)=>res.json())
    .then((res)=>{getitem()})
    .catch((err)=>console.log("error"))
    


}

const deletitem=(id)=>{
    let res=fetch(`http://localhost:3004/todo/${id}`,{
        method:"DELETE"
    })
    getitem(res)
 }


// loding?(<h1>loding....</h1> ) :error?(<h1>some error</h1>):
  return (

    <>
    
    <label  htmlFor="">Ental all todo</label>
    
    <input type="text" value={input} id="" placeholder='enter the todo name' onChange={(e)=>setInput(e.target.value)} />
    
    <button onClick={addtodo}>ADD</button>


    <div className={styles.newdev}>
    { data.map((e)=>(

<div key={e.id} className={styles.first} >
    
    <b>{e.item}</b>
    <br />
    <b>imp:{e.status?"no": "yes" }</b>
    <hr />
    <button onClick={()=>{deletitem(e.id)}}>delet</button>
     </div>

    ))}
    <br />
    </div>
    
    <div>
        
    <button disabled={page===1} onClick={()=>{setPage(page-1)}} >prev{page}</button>
    <button disabled={page===7} onClick={()=>{setPage(page+1)}}>next</button>
    </div>
    </>


  )
}
