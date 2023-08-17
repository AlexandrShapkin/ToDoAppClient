import ModalContainer from "../UI/ModalContainer/ModalContainer";
import AddTaskForm from "../UI/AddTaskForm/AddTaskForm";


type Props = {
  showModal: boolean;
  hideModal: () => void;
};

function AddTaskModal({ showModal, hideModal }: Props) {
  return (
    <ModalContainer
      showModal={showModal}
      hideModal={hideModal}
      title={"Добавить задачу"}
    >
      <AddTaskForm hideModal={hideModal} />
    </ModalContainer>
  );
}

export default AddTaskModal;