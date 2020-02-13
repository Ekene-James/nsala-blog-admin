import React from "react";
import Forms from "./Forms";

function CreateUser(props) {
  return (
    <div>
      <Forms history={props.history} />
    </div>
  );
}

export default CreateUser;
