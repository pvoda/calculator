import './App.css';
import React, { useState } from 'react';
import { useFormik } from 'formik';

function App() {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(0);

  const onSubmit = async (values: any) => {
    console.log(values)
    console.log(values.a === "" || values.b === "" || values.operation === "" )
    if(values.a === "" || values.b === "" || values.operation === "" ){
      console.log("Entre")
      setIsSuccess(false)
      setIsError(true)
    } else {
      setIsSuccess(true)
      setIsError(false)
      switch (values.operation) {
        case "Addition":
          return setResult(values.a+values.b);
        case "Rest":
          return setResult(values.a-values.b);
        case "Multiplication":
          return setResult(values.a*values.b);
        default:
          return setResult(values.a/values.b);
      }
    }
  };


  const formOperation = useFormik({
    initialValues: {
      a: "",
      b: "",
      operation: "",
    },
    onSubmit,
  });

  const ErrorNotification = () => {
    return (<div className="AlertError" role="alert">
      Inappropriate values ​​or you have not chosen an operation, please try again.
    </div>)
  }

  const SuccessNotification = () => {
    return (<div className="AlertSuccess" role="alert">
      The result is: {result}
    </div>)
  }


  return (
    <div className="Container">
      <div className="InnerContainer">
        <form className="Form" onSubmit={formOperation.handleSubmit}>
          <label>Calculator 2023</label>
          <label>Insert values</label>
          <div className="InputWrapper">
            <label>Value 1:</label>
            <input
              className="StyledInput"
              name="a"
              value={formOperation.values.a}
              onChange={formOperation.handleChange}
              placeholder="Value"
              clearOnEscape
              size="large"
              type="number"
            />
            <label>Value 2:</label>
            <input
              className="StyledInput"
              name="b"
              value={formOperation.values.b}
              onChange={formOperation.handleChange}
              placeholder="Another Value"
              clearOnEscape
              size="large"
              type="number"
            />
            <label>Choose an operation:</label>
            <select
              className="Menu"
              name="operation"
              value={formOperation.values.operation}
              onChange={formOperation.handleChange}
            >
              <option value="" label="Operation"/>
              <option value="Addition" label="Addition"/>
              <option value="Rest" label="Rest"/>
              <option value="Multiplication" label="Multiplication"/>
              <option value="Division" label="Division"/>
            </select>
          </div>
          <button className="ButtonLogIn" size="large" kind="primary" isLoading={formOperation.isSubmitting}>
              Calculate
          </button>
          {result === NaN ? ErrorNotification() : null}
          {isError ? ErrorNotification() : null}
          {isSuccess ? SuccessNotification() : null}
        </form>
      </div>
    </div>
  );
}

export default App;
