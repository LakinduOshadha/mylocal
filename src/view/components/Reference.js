import './Reference.css';
export default function Reference(props) {
  const {title, label, link} = props;
  return (
    <div className="div-reference">
      ({`${title}: `}
      <a href={link}>
        {label}
      </a>)
    </div>
  )
}
