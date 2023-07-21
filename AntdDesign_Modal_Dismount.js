/*
  to fully dismount modal or other component from react to reset all the states in it
  use logicall condistion &&
  isOpen just for displaying/showing/hiding the component on the screen, not fully dismount it in the DOM
*/
const Component = () => {
  return (<div>
      {modalIsOpen && <Modal
        isOpen={modalIsOpen}
        style={customStyles}
      > ..... </Modal>}
    </div>)
}
