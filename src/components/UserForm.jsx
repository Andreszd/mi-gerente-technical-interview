import { useState } from 'react';
import { useUser } from '../hooks/useUser';

const UserForm = ({ defaultValues = {}, closeForm }) => {
  const { isLoading, createUser } = useUser();

  const [body, setBody] = useState({
    nit: defaultValues.nit ?? '',
    nombre: defaultValues.nombre ?? '',
    razon_social: defaultValues.razon_social ?? '',
    telefono: defaultValues.telefono ?? '',
  });

  const { nit, nombre, razon_social, telefono } = body;

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setBody({ ...body, [name]: value });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    if (nit.length && nombre.length && razon_social.length && telefono.length) {
      createUser(body)
        .then(() => {
          closeForm();
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert('Por Favor, llene todos los campos');
    }
  };

  return (
    <div className='modal'>
      <form className='user-form' onSubmit={handleOnSubmit}>
        <h2 className='user-form__title'>Crear Usuario</h2>
        <input placeholder='Nombre' name='nombre' value={nombre} onChange={handleOnChange} />
        <input placeholder='Nit' name='nit' value={nit} onChange={handleOnChange} />
        <input
          placeholder='Razón Social'
          name='razon_social'
          value={razon_social}
          onChange={handleOnChange}
        />
        <input placeholder='Telefono' name='telefono' value={telefono} onChange={handleOnChange} />
        <button className='btn btn--primary' disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
        <button className='btn' type='button' onClick={closeForm}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
