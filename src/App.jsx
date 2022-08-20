import { useState } from 'react';
import { Dropdown } from './components/DropDown';
import { SearchBy } from './components/SearchBy';
import UserForm from './components/UserForm';
import { useUser } from './hooks/useUser';

const ATTRIBUTES = ['nit', 'nombre', 'razon_social', 'telefono'];

const DEFAULT_ATTRIBUTE = 'nit';

export const App = () => {
  const { isLoading, searchUser } = useUser();
  const [attrSelected, setAttrSelected] = useState(DEFAULT_ATTRIBUTE);
  const [showForm, setShowForm] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const openForm = (user) => {
    setShowForm(true);
    setDefaultValues(user);
  };
  const onChange = (value) => {
    setAttrSelected(value);
  };

  // uncomment code to initialize the data

  //useEffect(() => {
  //setInitialData();
  //}, []);

  return (
    <main>
      <h1>DropDown</h1>
      <SearchBy attributes={ATTRIBUTES} onChange={onChange} />
      <Dropdown
        searchBy={attrSelected}
        search={searchUser}
        isLoading={isLoading}
        openForm={openForm}
      />
      {showForm && <UserForm closeForm={() => setShowForm(false)} defaultValues={defaultValues} />}
    </main>
  );
};
