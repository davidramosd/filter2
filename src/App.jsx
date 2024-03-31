import { useState } from 'react'
import jsonData from "./list/document.json";
import JSZip from 'jszip';
import './App.css'

function App() {
  const [formData, setFormData] = useState(
    {
      record: "PPG_subj_01",
      Age: 44,
      Age_max: 46,
      Gender: "M",
      Diagnosed: "y",
      Treatment: "n",
      Systolic_BP: 124,
      Systolic_BP_max: 125,
      Diastolic_BP: 83,
      Diastolic_BP_max: 84,
      Heart_Rate: 76,
      Heart_Rate_max: 77,
      JNC: "E",
      AHA: "H"
    });
  const [filteredData, setFilteredData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const clearFilter = () => {
    setFormData({
      record: "",
      Age: '',
      Age_max: '',
      Gender: "",
      Diagnosed: "",
      Treatment: "",
      Systolic_BP: '',
      Systolic_BP_max: '',
      Diastolic_BP: '',
      Diastolic_BP_max: '',
      Heart_Rate: '',
      Heart_Rate_max: '',
      JNC: "",
      AHA: ""
    })
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(showForm){
      const filtered2 = jsonData.items.filter(item => (
        (!formData.Age || item.Age >= formData.Age) &&   
        (!formData.Age_max || item.Age <= formData.Age_max) &&
        (!formData.Gender || item.Gender === formData.Gender) &&
        (!formData.Diagnosed || item.Diagnosed === formData.Diagnosed) &&   
        (!formData.Treatment || item.Treatment === formData.Treatment) &&   
        (!formData.Systolic_BP || item.Systolic_BP >= formData.Systolic_BP) &&   
        (!formData.Systolic_BP_max || item.Systolic_BP <= formData.Systolic_BP_max) &&   
        (!formData.Diastolic_BP || item.Diastolic_BP >= formData.Diastolic_BP) &&   
        (!formData.Diastolic_BP_max || item.Diastolic_BP <= formData.Diastolic_BP_max) &&   
        (!formData.Heart_Rate || item.Heart_Rate >= formData.Heart_Rate) &&   
        (!formData.Heart_Rate_max || item.Heart_Rate <= formData.Heart_Rate_max) &&   
        (!formData.JNC || item.JNC === formData.JNC) &&   
        (!formData.AHA || item.AHA === formData.AHA) 
      ));
      console.log("filtered2", filtered2)
      setFilteredData(filtered2);
    } else {
      console.log("data", formData)
      const filtered = jsonData.items.filter(item => (
        (!formData.Age || item.Age == formData.Age) &&
        (!formData.Gender || item.Gender == formData.Gender) &&
        (!formData.Diagnosed || item.Diagnosed == formData.Diagnosed) &&   
        (!formData.Treatment || item.Treatment == formData.Treatment) &&   
        (!formData.Systolic_BP || item.Systolic_BP == formData.Systolic_BP) &&         
        (!formData.Diastolic_BP || item.Diastolic_BP == formData.Diastolic_BP) &&   
        (!formData.Heart_Rate || item.Heart_Rate == formData.Heart_Rate) &&   
        (!formData.JNC || item.JNC === formData.JNC) &&   
        (!formData.AHA || item.AHA === formData.AHA) 


        // item.Gender === formData.Gender &&   
        // item.Diagnosed === formData.Diagnosed && 
        // item.Treatment === formData.Treatment &&  
        // item.Systolic_BP === formData.Systolic_BP && 
        // item.Diastolic_BP === formData.Diastolic_BP && 
        // item.Heart_Rate === formData.Heart_Rate  && 
        // item.JNC === formData.JNC  && 
        // item.AHA === formData.AHA 
      ));
      console.log("filtered", filtered)
      setFilteredData(filtered);
    }
  };


  function downloadFilesAsZip() {
    const zip = new JSZip();
  
    // Agregar los archivos al ZIP
    filteredData.forEach((item, index) => {
      console.log(`Elemento ${index + 1}: ${item}`);
      zip.file(`${item.record}.mat`, fetch(`src/doc/${item.record}.mat`).then(res => res.blob()));
    }); 
    // Agregar más archivos según sea necesario
  
    // Crear el archivo ZIP y descargarlo
    zip.generateAsync({ type: 'blob' }).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'archivos.zip');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }


  return (
    <div className='filter-fields'>
      
      {
        showForm
        ?
        <form onSubmit={handleSubmit} className='filer-form'>
        <label className="label-text" htmlFor="name">Age (min- max):</label>
        <input className="input-text" type="number" id="name" name="Age" value={formData.Age} onChange={handleChange}/>
        <input className="input-text" type="number" id="Age_max" name="Age_max" value={formData.Age_max} onChange={handleChange}/>

        <label  className="label-text"  htmlFor="Gender">Gender:</label>

        <select className="select" name="Gender" value={formData.Gender} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="M">Masculino</option> 
          <option  value="F">Femenino</option>
        </select> 

        
        {/*
        <input type="Gender" id="Gender" name="Gender" value={formData.Gender} onChange={handleChange}/> */}

        <label  className="label-text"  htmlFor="Diagnosed">Diagnosed:</label>
         {/* <textarea id="Diagnosed" name="Diagnosed" value={formData.Diagnosed} onChange={handleChange}/> */}

        <select  className="select" name="Diagnosed" value={formData.Diagnosed} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="y">YES</option> 
          <option  value="n">NO</option>
			  </select>

        <label  className="label-text"  htmlFor="Treatment">Treatment:</label>
        {/* <<textarea id="Treatment" name="Treatment" value={formData.Treatment} onChange={handleChange}/> */}
        <select  className="select"  name="Treatment" value={formData.Treatment} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="y">YES</option> 
          <option  value="n">NO</option>
			  </select>



        <label  className="label-text"  htmlFor="Systolic_BP">Systolic_BP (min- max):</label>
        <input  className="input-text"  type='number' id="Systolic_BP" name="Systolic_BP" value={formData.Systolic_BP} onChange={handleChange}/>
        <input  className="input-text"  type='number' id="Systolic_BP_max" name="Systolic_BP_max" value={formData.Systolic_BP_max} onChange={handleChange}/>
            
        <label  className="label-text"  htmlFor="Diastolic_BP">Diastolic_BP (min- max):</label>
        <input  className="input-text"  type='number' id="Diastolic_BP" name="Diastolic_BP" value={formData.Diastolic_BP} onChange={handleChange}/>
        <input  className="input-text"  type='number' id="Diastolic_BP_max" name="Diastolic_BP_max" value={formData.Diastolic_BP_max} onChange={handleChange}/>

        <label  className="label-text"  htmlFor="Heart_Rate">Heart_Rate (min- max):</label>
        <input  className="input-text"  type='number' id="Heart_Rate" name="Heart_Rate" value={formData.Heart_Rate} onChange={handleChange}/>
        <input  className="input-text"  type='number' id="Heart_Rate_max" name="Heart_Rate_max" value={formData.Heart_Rate_max} onChange={handleChange}/>

       <label  className="label-text"  htmlFor="JNC">JNC:</label>
         {/* <textarea id="JNC" name="JNC" value={formData.JNC} onChange={handleChange}/> */}
        <select  className="select" id="JNC"  name="JNC" value={formData.JNC} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="E">E</option> 
          <option  value="N">N</option>
          <option  value="H">H</option>
			  </select>

       <label  className="label-text"  htmlFor="AHA">AHA:</label>
        {/*  <textarea id="AHA" name="AHA" value={formData.AHA} onChange={handleChange}/> */}
        <select   className="select" id="AHA"  name="AHA" value={formData.AHA} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="E">E</option> 
          <option  value="N">N</option>
          <option  value="H">H</option>
			  </select>

        <button className="button-search" type="submit">Buscar</button>
        </form>
        :
        <form onSubmit={handleSubmit} className='filer-form'>
        <label className="label-text" htmlFor="name">Age :</label>
        <input className="input-text" type="number" id="name" name="Age" value={formData.Age} onChange={handleChange}/>

        <label  className="label-text"  htmlFor="Gender">Gender:</label>

        <select className="select" name="Gender" value={formData.Gender} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="M">Masculino</option> 
          <option  value="F">Femenino</option>
        </select> 

        
        {/*
        <input type="Gender" id="Gender" name="Gender" value={formData.Gender} onChange={handleChange}/> */}

        <label  className="label-text"  htmlFor="Diagnosed">Diagnosed:</label>
         {/* <textarea id="Diagnosed" name="Diagnosed" value={formData.Diagnosed} onChange={handleChange}/> */}

        <select  className="select" name="Diagnosed" value={formData.Diagnosed} onChange={handleChange}>
         <option  value="">-</option> 
          <option  value="y">YES</option> 
          <option  value="n">NO</option>
			  </select>

        <label  className="label-text"  htmlFor="Treatment">Treatment:</label>
        {/* <<textarea id="Treatment" name="Treatment" value={formData.Treatment} onChange={handleChange}/> */}
        <select  className="select"  name="Treatment" value={formData.Treatment} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="y">YES</option> 
          <option  value="n">NO</option>
			  </select>



        <label  className="label-text"  htmlFor="Systolic_BP">Systolic_BP :</label>
        <input  className="input-text"  type='number' id="Systolic_BP" name="Systolic_BP" value={formData.Systolic_BP} onChange={handleChange}/>
      
            
        <label  className="label-text"  htmlFor="Diastolic_BP">Diastolic_BP :</label>
        <input  className="input-text"  type='number' id="Diastolic_BP" name="Diastolic_BP" value={formData.Diastolic_BP} onChange={handleChange}/>

        <label  className="label-text"  htmlFor="Heart_Rate">Heart_Rate :</label>
        <input  className="input-text"  type='number' id="Heart_Rate" name="Heart_Rate" value={formData.Heart_Rate} onChange={handleChange}/>

       <label  className="label-text"  htmlFor="JNC">JNC:</label>
         {/* <textarea id="JNC" name="JNC" value={formData.JNC} onChange={handleChange}/> */}
        <select  className="select" id="JNC"  name="JNC" value={formData.JNC} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="E">E</option> 
          <option  value="N">N</option>
          <option  value="H">H</option>
			  </select>

       <label  className="label-text"  htmlFor="AHA">AHA:</label>
        {/*  <textarea id="AHA" name="AHA" value={formData.AHA} onChange={handleChange}/> */}
        <select   className="select" id="AHA"  name="AHA" value={formData.AHA} onChange={handleChange}>
          <option  value="">-</option> 
          <option  value="E">E</option> 
          <option  value="N">N</option>
          <option  value="H">H</option>
			  </select>

        <button className="button-search" type="submit">Buscar</button>
        </form>
      }


      <div className='filer-form-2'>
        <button onClick={ () => setShowForm(!showForm)}>{showForm ? 'Ocultar Rangos' : 'Mostra Rangos'}</button>
        <button onClick={ () => clearFilter()}> Limpiar Filtros </button>
      </div>
      
      <table id="customers">
       <thead>
          <tr>
            <th>index</th>
            <th>record</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Diagnosed</th>
            <th>Treatment</th>
            <th>Systolic_BP</th>
            <th>Diastolic_BP</th>
            <th>Heart_Rate</th>
            <th>JNC</th>
            <th>AHA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item,index) => (
            <tr key={item.record}>
              <td>
                {index}
              </td>
              <td>
                {item.record}
              </td>
              <td > {item.Age}</td>
              <td>{item.Gender}</td>
              <td>{item.Diagnosed}</td>
              <td>{item.Treatment}</td>
              <td>{item.Systolic_BP}</td>
              <td>{item.Diastolic_BP}</td>
              <td> {item.Heart_Rate} </td>
              <td>{item.JNC}</td>
              <td>{item.AHA}</td>
              <td><a href={`src/doc/${item.record}.mat`} download> Descargar </a></td>
              </tr>
          ))}
       </tbody>
      </table>
      {
        filteredData.length > 1 
        ?
         <div className='filer-form-2'>
          <h1>Archivos para descargar:</h1>
          <button onClick={downloadFilesAsZip}>Descargar archivos como ZIP</button>
        </div>
        :
        <></>
      }

    </div>
  )
}

export default App
