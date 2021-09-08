import { Button, Container } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import productList from "../actions/productList";
import productRemove from "../actions/removeProduct";
import "../cart.css";
export default function ManageProducts(props) {
  const pList = useSelector((state) => state.listProducts);
  const { products, loading, error } = pList;
  const deletedProduct = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = deletedProduct;

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(productRemove(id));
  };

  React.useEffect(() => {
    dispatch(productList());
  }, [successDelete]);
  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container style={{ marginTop: "3rem" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          window.location.href = "/manageProducts/Addproduct";
        }}
      >
        Add new Product
      </Button>
      <Table style={{ marginTop: "3rem" }}>
        <Thead>
          <Tr style={{ fontSize: "1.7rem" }}>
            <Td>Product Name</Td>
            <Td>Price</Td>
            <Td>Category</Td>

            <Td>Count in Stock</Td>
            <Td>Action</Td>
          </Tr>
        </Thead>
        <Tbody>
          {products.length === 0
            ? "No data"
            : products.map((x) => (
                <Tr>
                  <Td>{x.title}</Td>
                  <Td>{x.price}</Td>
                  <Td>{x.category}</Td>

                  <Td>{x.inStock}</Td>
                  <Td>
                    <a
                      className="remove"
                      onClick={() => {
                        handleRemove(x._id);
                      }}
                    >
                      <DeleteIcon />
                    </a>

                    <a
                      className="edit"
                      style={{ marginLeft: ".5rem" }}
                      onClick={() => {
                        window.location.href =
                          "/manageProducts/EditProduct/" + x._id;
                      }}
                    >
                      <EditIcon />
                    </a>
                  </Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </Container>
  );
}
