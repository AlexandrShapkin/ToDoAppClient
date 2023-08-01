import { FiMenu } from "react-icons/fi";

type Props = {
  onClick?: () => void;
}

function MenuButton({onClick}: Props) {
  return (
    <button className="py-1 px-1 transition ease-in-out delay-150 hover:scale-110" onClick={onClick}>
      <FiMenu className="text-white text-3xl md:text-5xl" />
    </button>
  );
}


export default MenuButton;