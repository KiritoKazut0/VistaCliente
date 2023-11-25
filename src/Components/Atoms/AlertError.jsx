import Alert from '@mui/material/Alert';

function AlertError({  messageError, primary, addProduct, show}) {

  return (
    <Alert
      sx={{
        position: "absolute",
        top: primary ? "75%" : addProduct? "80%": "80%",
        width: primary? "33%":addProduct? "33%": "80%",
        left: primary? "10%": addProduct? "10%": "10%",
        fontSize: "15px",
        background: primary?"none": addProduct? "none": "#ee2b2b",
        color: primary? "red": addProduct? "red": "white",
        overflow: "hidden",
        display:primary ? "": addProduct? "": `${show}`,
        "& .MuiSvgIcon-root": {
          color: primary? "red": addProduct? "": "white"
        }
       
      }}
      severity="error"
       >
     {messageError}
    </Alert>
  );
}




export default AlertError;
