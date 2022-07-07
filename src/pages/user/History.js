import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import LoadingToRedirect from "../../components/LoadingToRedirect";
import UserNav from "../../components/nav/UserNav";
import { toast } from "react-toastify";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";

const History = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  let userOk = user.currentUser;
  let token = user.currentUser.authToken;

  useEffect(() => {
    getUserOrders(token);
  }, []);

  const getUserOrders = async (token) => {
    await axios
      .get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
      });
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered table-light">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <strong>{p.product.title}</strong>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = () => {};
  // <PDFViewer>
  //   <Document>
  //     <Page size="A4">
  //       <View>
  //         <Text>Section 1</Text>
  //       </View>
  //     </Page>
  //   </Document>
  // </PDFViewer>

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink()}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      {userOk ? (
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col text-center">
            <h3>
              {orders.length > 0
                ? "User Purchase Orders"
                : "No Purchase orders"}
            </h3>

            {showEachOrders()}
          </div>
        </div>
      ) : (
        <LoadingToRedirect />
      )}
    </div>
  );
};

export default History;
