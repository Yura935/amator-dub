const Toastr = (props: { itemName: string; message: string }) => (
  <>
    <h3>{props.itemName}</h3>
    <p>{props.message}</p>
  </>
);

export default Toastr;
