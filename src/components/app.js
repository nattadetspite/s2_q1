import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  align-items: center;

  overflow: hidden;
  @media screen and (max-width: 600px) {
    overflow: scroll;
  }
`;

const Left = styled.section`
  width: 200px;
  height: 100%;
  border: 1px solid black;
`;
const Middle = styled.section`
  min-width: 100px;
  height: 100%;
  width: 100%;
  border: 1px solid black;
`;
const Right = styled.section`
  width: 300px;
  height: 100%;
  border: 1px solid black;
`;

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [cycleState, updateCycleState] = useState(false);
  const handleInput = (e) => {
    let input = e.target.value;
    // check is number that can contain - and float
    if (!/^-?\d*\.?\d*$/.test(input)) {
      setInputValue(inputValue);
      updateCycleState(!cycleState);
    } else {
      // console.log(input);
      if (input) {
        // check negative
        if (parseInt(input) < 0) {
          updateCycleState(!cycleState);
          setInputValue(1);
          return;
        }
        // check int
        if (Number.isInteger(input)) {
          setInputValue(parseInt(input));
        } else {
          // check is enter negative string
          if (input === "-" || input[input.length - 1] === ".") return;
          else {
            // round float
            let roundNum = Math.round(parseFloat(input));
            if (roundNum === inputValue && inputValue.toString() !== input) {
              updateCycleState(!cycleState);
            } else {
              setInputValue(roundNum);
            }
          }
        }
      }
    }
  };

  const [result, updateResult] = useState(false);

  const [dropdownSelect, updateDropdownSelect] = useState("isPrime");

  const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
    return num > 1;
  };

  const isSquare = (num) => {
    let s = parseInt(Math.sqrt(num));
    return s * s == num;
  };

  const isFibonacci = (num) => {
    if (isSquare(5 * (num * num) - 4) || isSquare(5 * (num * num) + 4)) return true;
    else return false;
  };

  const handleChangeDropdown = (e) => {
    console.log(e.target.value);
    updateDropdownSelect(e.target.value);
  };

  const handleCheck = () => {
    if (dropdownSelect === "isPrime") {
      console.log("check isPrime: ", inputValue);
      updateResult(isPrime(inputValue));
    } else {
      console.log("check isFibonacci: ", inputValue);
      updateResult(isFibonacci(inputValue));
    }
  };

  useEffect(() => {
    if (inputValue && /^\d+$/.test(inputValue)) {
      handleCheck();
    }
  }, [inputValue, dropdownSelect]);

  return (
    <Container>
      <Left>
        <input type="text" onChange={handleInput} value={inputValue}></input>
      </Left>
      <Middle>
        <select value={dropdownSelect} onChange={handleChangeDropdown}>
          <option value={"isPrime"}>isPrime</option>
          <option value={"isFibonacci"}>isFibonacci</option>
        </select>
      </Middle>
      <Right>{result.toString()}</Right>
    </Container>
  );
};

export default App;
