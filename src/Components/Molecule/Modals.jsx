import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Items from '../Atoms/Items';
import MyButton from '../Atoms/Button';
import { useContext } from 'react';
import ChangePassword from '../../Context/ChangePassword';
import AlertError from '../Atoms/AlertError';
import { Alert } from '@mui/material';
import { Navigate } from 'react-router-dom';

function FormDialog({ value }) {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const Password = useContext(ChangePassword);
  const [activeAlert, setActiveAlert] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    console.log("Cambio en Password", Password.SavePassword);
  }, [Password.SavePassword]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveAlert(false);
  };

  const handlerChange = async () => {
    setActiveAlert(false);

    // Validación de la contraseña actual
    if (currentPassword !== Password.SavePassword) {
      setMessageError("La contraseña actual no coincide con los valores del campo ingresado");
      setActiveAlert(true);
      return null;
    }

    // Validación de la nueva contraseña
    if (Password.NewPassword === Password.SavePassword) {
      setMessageError("La nueva contraseña no debe ser igual a la anterior");
      setActiveAlert(true);
      return null;
    }

    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "contraseña": Password.SavePassword }),
      };
      // JSON.stringify({"contrasenia":Password.SavePassword})
      console.log (Password.IdCliente);
      console.log(Password.NewPassword);

      const response = await fetch('http://localhost:8080/api/cliente/1', requestOptions);

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      Alert("Contraseña actualizada con éxito");
      Navigate("/");

    } catch (error) {

    }
  };

  return (
    <React.Fragment>
      <MyButton singOf onClick={handleClickOpen}>
        <Items> {value} </Items>
      </MyButton>

      <Dialog open={open} onClose={handleClose} fullWidth sx={{

      }}>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <br />
          <TextField
            autoFocus
            id="current-password"
            label="Contraseña Actual"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="new-password"
            label="Nueva Contraseña"
            type="password"
            fullWidth
            onChange={(e) => Password.setNewPassword(e.target.value)}
          />
        </DialogContent>


        <DialogActions>

          {activeAlert && <AlertError messageError={messageError} password ></AlertError>}
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handlerChange}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog;
