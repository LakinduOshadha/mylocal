import 'nonstate/atoms/XButton.css';

export default function XButton(props) {
  return (
    <div
      className="div-x-button"
      onClick={props.onClick}
    >
      ✕
    </div>
  );
}
