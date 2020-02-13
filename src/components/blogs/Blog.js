import React from "react";
import { connect } from "react-redux";
import { Table, Button, Spinner } from "reactstrap";

import { deleteBlog } from "../../redux/actions/blogActions";

function Blog(props) {
  const {
    blog,

    uid,

    buttonLoading
  } = props;
  const {
    id,
    category,

    creatAt,
    title,
    BlogImgUrl
  } = blog;

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>category</th>
            <th>created At</th>
            <th>blog image</th>
            <th>id</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>{title}</td>
            <td>{category}</td>
            <td>{creatAt}</td>
            <td>
              <a href={BlogImgUrl} target="_blanck">
                Url
              </a>
            </td>
            <td>{id}</td>
            <td>
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Delete
              </button>

              <div
                className="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalCenterTitle">
                        Delete Blog
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Are You Sure You Want To Delete This Blog?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      {buttonLoading ? (
                        <Button disabled>
                          <Spinner
                            as="span"
                            animation="border"
                            variant="primary"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Deleting...
                        </Button>
                      ) : (
                        <Button
                          className="ml-auto"
                          onClick={() => props.deleteBlog(id, category, uid)}
                        >
                          Delete Blog
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default connect(null, { deleteBlog })(Blog);
