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
      zip.file(`${item.record}.mat`, fetch(`doc/${item.record}.mat`).then(res => res.blob()));
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
        <div className='filer-form-2'>
          <h1>PPG LOG REPOSITORY </h1>
          <p>El repositorio consta de 56 registros de señales PPG, cada uno con una duración de 2 minutos y una frecuencia de muestreo de 100 Hz. Cada registro representa a un individuo que participó en el estudio. Es importante destacar que ninguno de los sujetos incluidos en esta base de datos se encontraba hospitalizado en el momento de la toma de datos. Todas las mediciones se realizaron en un entorno controlado, específicamente en un laboratorio.</p>
          <p>Esta información incluye si el individuo está diagnosticado con hipertensión, si está recibiendo tratamiento y cómo se clasifica según los criterios establecidos por el Comité de Expertos en el Tratamiento de la Hipertensión Arterial (JNC, por sus siglas en inglés). Las clasificaciones incluyen Normotenso (N), Prehipertenso (E) e Hipertenso (H), según los valores de presión arterial sistólica y diastólica.</p>
          <p>Esta base de datos representa una herramienta valiosa para investigadores y profesionales de la salud que buscan desarrollar métodos precisos y no invasivos para la estimación de la presión arterial. Al permitir el acceso a datos clínicamente relevantes y señales fisiológicas detalladas, se espera que esta base de datos contribuya significativamente al avance en el campo de la monitorización y el diagnóstico de la presión arterial, así como en la mejora de las estrategias de tratamiento para pacientes con hipertensión arterial. Aqui podrás filtrar y descargar el registro que necesites para poder visualizar la señal a travez de la plataforma de MATLAB</p>
		<p> A continuación podras observar los 56 registros 

PPG_subj_01	44	M	y	n	124	83	76	E	H
PPG_subj_02	58	M	y	y	115	75	84	N	N
PPG_subj_03	57	F	y	y	121	72	56	E	E
PPG_subj_04	48	F	y	y	125	75	73	E	E
PPG_subj_05	46	F	y	y	97	64	86	N	N
PPG_subj_06	65	F	y	y	119	57	85	N	N
PPG_subj_07	60	F	y	y	161	94	68	H	H
PPG_subj_08	47	M	y	n	148	96	58	H	H
PPG_subj_09	46	F	y	y	122	74	62	E	E
PPG_subj_10	58	F	y	y	114	71	75	N	N
PPG_subj_11	57	M	y	y	112	72	75	N	N
PPG_subj_12	65	M	y	n	111	70	75	N	N
PPG_subj_13	45	F	n	n	144	87	65	H	H
PPG_subj_14	45	F	n	n	130	90	88	H	H
PPG_subj_15	45	F	n	n	103	65	97	N	N
PPG_subj_16	48	F	y	n	152	109	100	H	H
PPG_subj_17	65	F	n	n	133	81	77	E	H
PPG_subj_18	45	F	n	n	135	90	84	H	H
PPG_subj_19	57	F	n	n	120	68	58	N	E
PPG_subj_20	53	F	y	n	154	93	62	H	H
PPG_subj_21	55	F	n	n	125	84	62	E	H
PPG_subj_22	45	F	n	n	106	60	53	N	N
PPG_subj_23	45	M	y	y	127	82	71	E	H
PPG_subj_24	57	F	y	y	110	60	78	N	N
PPG_subj_25	45	F	n	n	115	60	72	N	N
PPG_subj_26	45	F	y	y	137	90	69	H	H
PPG_subj_27	56	F	n	n	135	97	69	H	H
PPG_subj_28	45	F	n	n	120	78	70	N	E
PPG_subj_29	50	F	y	y	135	83	76	E	H
PPG_subj_30	45	M	n	n	111	78	72	N	N
PPG_subj_31	46	M	y	y	129	82	72	E	H
PPG_subj_32	50	M	n	n	129	79	68	E	E
PPG_subj_33	64	M	n	n	125	75	78	E	E
PPG_subj_34	48	M	n	n	130	87	80	E	H
PPG_subj_35	62	M	y	y	153	88	84	H	H
PPG_subj_36	55	M	n	n	122	72	81	E	E
PPG_subj_37	57	M	n	n	127	80	83	E	H
PPG_subj_38	63	M	n	n	121	87	68	E	H
PPG_subj_39	48	M	n	n	132	83	90	E	H
PPG_subj_40	65	F	n	n	116	79	106	N	N
PPG_subj_41	60	M	y	y	140	91	54	H	H
PPG_subj_42	60	F	y	y	144	86	68	H	H
PPG_subj_43	45	F	n	n	154	96	65	H	H
PPG_subj_44	53	F	y	n	164	93	62	H	H
PPG_subj_45	45	F	y	y	142	90	69	H	H
PPG_subj_46	56	F	n	n	145	90	69	H	H
PPG_subj_47	46	F	y	y	118	75	86	N	N
PPG_subj_48	45	F	n	n	107	68	97	N	N
PPG_subj_49	45	F	n	n	118	62	72	N	N
PPG_subj_50	55	M	n	n	119	74	81	N	N
PPG_subj_51	57	M	n	n	114	75	83	N	N
PPG_subj_52	58	F	y	y	128	72	75	E	E
PPG_subj_53	65	M	y	n	121	75	75	E	E
PPG_subj_54	58	M	y	n	134	85	76	E	H
PPG_subj_55	45	M	y	y	128	83	71	E	H
PPG_subj_56	46	F	y	y	128	89	78	E	H
    </p>
        </div>
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
            <th>Time</th>
            <th>Frequency</th>
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
              <td>{item.duration}</td>
              <td>{item.fs}</td>
              {/* <td><a href={`src/assets/doc/${item.record}.mat`} download> Descargar </a></td> */}
              <td><a href={`doc/${item.record}.mat`} download> Descargar </a></td>
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
