import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

import AuthorItem from "../components/AuthorItem";

function Authors() {
  const [authorList, setAuthorList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthorList((authorList) => [...authorList, data]);
      });
  }, []);

  return (
    <div class="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>User Name</th>
            <th>Email</th>
            <th>Post Count</th>
          </tr>
        </thead>
        <tbody>
          {authorList.length > 0 &&
            authorList.map((author) => (
              <div class="author-row">
                <AuthorItem authorList={author} />
              </div>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Authors;
