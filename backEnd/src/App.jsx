import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'


function App() {

  // const [image,setImage] = useState(null)
  const [load,setLoad] = useState(false)
  const [imagen,setImagen] = useState("")

  //*Obteniendo el cambio de imagen
  // function handleImageChange(e){
  //   setImage(e.target.files[0]);
  // }

  //* Dar click y mostrar
  /*async function handleUpload(e){
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('image',image)
    // console.log(image);

    try {
      const response = await axios.post('http://localhost:3000/api/upload-image',formdata,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      setLoad(true)
      setImagen(response.data.imageUrl)
      
    } catch (error) {
      console.log(error);
    }
  
  }*/

  //* Dejar la imagen encima
  async function handleDrop(e){
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    const data = new FormData()
    data.append('image',file)
    const response = await fetch('http://localhost:3000/api/upload-image',{
      method:'POST',
      body:data
    })

    if(response.ok){
      const res = await response.json()
      setLoad(true)
      setImagen(res.imageUrl)
    }
  }

  function handleDragOver(e){
    e.preventDefault();
  }

  return (
    <div className="App">
      <div onDrop={ handleDrop } 
           onDragOver={ handleDragOver } 
           style={ {width:300,height:200,border:'1px solid #333',display:'flex',justifyContent:'center',alignItems:'center'} }
           className='ancho' >
          Arrastra Imagen Aqui
      </div> 
      {/* <form onSubmit={ handleUpload }>
        <input type="file" onChange={handleImageChange} />
        <br />
        <button type='submit'>Enviar</button>
      </form> */}

       <div style={{marginTop:"16px",width:"250px"}} title='Imagen' >
       { load && <img width="100%" src={imagen} alt="" />}
      </div>

    </div>
  )
}

export default App
