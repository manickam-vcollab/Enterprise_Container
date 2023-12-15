import MUICheckBox from '@material-ui/core/Checkbox';

function Checkbox(props:any) {
  
  return (
    <>
      <MUICheckBox 
            style={props.style}
            size='small'
            {...props}
            ></MUICheckBox>
    </>
  )
}

export default Checkbox
