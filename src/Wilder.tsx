import React, { useEffect } from "react";
import { WilderInterface } from "./interfaces";
import blank_profile from "./blank-profile-picture-female.png";
import { Card, List } from "./styles/elements";

function Wilder(props: WilderInterface): JSX.Element {
  return (
    <Card>
      <img src={blank_profile} alt={`${props.name} Profile`} />
      <h3>{props.name}</h3>
      <h4>City</h4>
      <p>{props.city}</p>
      <h4>Wild Skills</h4>
      <List>
        {/*skills.map((skill) => (
          <Skill key={skill._id} {...skill} />
        ))*/}
      </List>
    </Card>
  );
}

export default Wilder;
