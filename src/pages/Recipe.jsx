import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  margin-right: 2rem;
  font-weight: 600;
  border: 2px soild black;
`;

const Info = styled.div`
  margin-left: 5rem;
`;

function Recipe() {
  let params = useParams();

  const [details, setDetails] = useState([]);
  const [activeBtn, setActiveBtn] = useState("instructions");

  useEffect(() => {
    fetchDetails(params.name);
  }, [params.name]);

  const fetchDetails = async (id) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API}`
    );
    const detailData = await api.json();
    setDetails(detailData);
    console.log(detailData);
  };

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>

      <Info>
        <Button
          className={activeBtn === "instructions" ? "active" : undefined}
          onClick={() => setActiveBtn("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeBtn === "ingredients" ? "active" : undefined}
          onClick={() => {
            console.log("Hello");
            setActiveBtn("ingredients");
          }}
        >
          Ingredients
        </Button>
        {activeBtn === "instructions" && (
          <div>
            <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4>
            <h4 dangerouslySetInnerHTML={{ __html: details.instructions }}></h4>
          </div>
        )}
        {activeBtn === "ingredients" && (
          <ul>
            {
              details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

export default Recipe;
