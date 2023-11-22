import Alert from '@mui/material/Alert';

function AlertError({ show, messageError, top, left, width, background, color }) {

  return (
    <Alert
      sx={{
        position: "absolute",
        top: top,
        width: width,
        left: left,
        fontSize: "15px",
        background: background,
        color: color,
        overflow: "hidden",
        display: `${show}`,
        "& .MuiSvgIcon-root": {
          color: color
        }
       
      }}
      severity="error"
       >
     {messageError}
    </Alert>
  );
}

// width: "80%",
// topo: 80%, left:10%, #ee2b2b


export default AlertError;
