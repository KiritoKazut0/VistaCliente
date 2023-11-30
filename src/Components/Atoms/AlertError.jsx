import Alert from '@mui/material/Alert';

function AlertError({  messageError, primary, addProduct, show, password}) {

  return (
    <Alert
      sx={{
        position: "absolute",
        top: primary ? "75%" : addProduct? "80%": password? "": "80%",
        width: primary? "33%":addProduct? "33%": password? "60%":  "80%",
        left: primary? "10%": addProduct? "10%": password? "0":  "10%",
        fontSize: "15px",
        background: primary?"none": addProduct? "none": password? "none":  "#ee2b2b",
        color: primary? "red": addProduct? "red":password? "red":  "white",
        overflow: "hidden",
        display:primary ? "": addProduct? "":password? "":  `${show}`,
        "& .MuiSvgIcon-root": {
          color: primary? "red": addProduct? "": password? "red":  "white"
        }
       
      }}
      severity="error"
       >
     {messageError}
    </Alert>
  );
}




export default AlertError;
