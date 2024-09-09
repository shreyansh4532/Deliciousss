import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  margin: 0rem 20rem;

  div {
    position: relative;
    width: 100%;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem;
    width: 100%;
  }

  svg {
    position: absolute;
    color: white;
    /* font-size: 1.5rem; */
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
  }
`;

function Search() {
  const [inputVal, setInputVal] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searched/${inputVal}`);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <FaSearch />
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </div>
    </Form>
  );
}

export default Search;
