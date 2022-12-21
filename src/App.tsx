import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {useState} from 'react';

function App() {
  const [display, setDisplay] = useState(false);

  const hideDialog = () => {
    setDisplay(false);
  };

  const renderFooter = () => {
    return (
        <div>
          <Button label="No" icon="pi pi-times" onClick={hideDialog} className="p-button-text"/>
          <Button label="Yes" icon="pi pi-check" onClick={hideDialog} autoFocus/>
        </div>
    );
  };

  return (
      <>
        <Button label="Show" icon="pi pi-external-link" onClick={() => setDisplay(true)}/>
        <Dialog header="Header"
                visible={display}
                style={{width: '50vw'}}
                footer={renderFooter()}
                onHide={hideDialog}
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.</p>
        </Dialog>
      </>
  );
}

export default App;
