import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { CardRow, Container, Footer, Header } from "./styles/elements";
import Wilder from "./Wilder";
import AddWilder from "./AddWilder";
import { Button } from "./styles/form-elements";
import { WilderInterface } from "./interfaces";


function App(): JSX.Element {
  const [wilders, setWilders]: [WilderInterface[], Function] = useState<WilderInterface[]>([]);
  const [showForm, setShowForm]: [boolean, Function] = useState<boolean>(false);

  const fetchWilders = async (): Promise<void> => {
    try {
      const result = await axios("http://localhost:3552/api/wilders");
      console.log(result.data)
      setWilders(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    fetchWilders();
  }, []);

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        {showForm === true && <AddWilder onWilderCreated={() => fetchWilders()} />}
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide' : 'Show'}</Button>
      </Container>
      <Container>
        <h2>Wilders</h2>
        <CardRow>
          {wilders.map((wilder: WilderInterface): JSX.Element => (
            <Wilder key={wilder._id} {...wilder} />
          ))}
        </CardRow>
      </Container>
      <Footer>
        <Container>
          <p>&copy; 2020 Wild Code School</p>
        </Container>
      </Footer>
    </div>
  );
}

export default App;
