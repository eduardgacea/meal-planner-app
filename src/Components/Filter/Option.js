import classes from './Option.module.css';

const Option = (props) => {
  return (
    <option disabled={props.isDisabled} className={`${classes.option} ${props.className ? props.className : ''}`}>
      {props.children}
    </option>
  );
};

export default Option;
