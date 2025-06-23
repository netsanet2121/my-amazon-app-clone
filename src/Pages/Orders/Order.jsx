import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "../Orders/Order.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [minTotal, setMinTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(doc(db, "users", user.uid), "orders");
    const q = query(ordersRef, orderBy("created", sortOrder));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setOrders(allOrders);
    });

    return () => unsubscribe();
  }, [user, sortOrder]);

  const filteredOrders = orders.filter((order) => {
    const total = order.data.amount / 100;

    // Convert timestamp to Date object
    const createdDate = new Date(order.data.created * 1000);

    // Date range filter
    const inStart = startDate ? createdDate >= new Date(startDate) : true;
    const inEnd = endDate ? createdDate <= new Date(endDate) : true;

    // Search in product names
    const matchSearch = searchTerm
      ? order.data.basket?.some((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    return total >= minTotal && inStart && inEnd && matchSearch;
  });

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Orders</h2>

          {/* Filter Controls */}
          <div className={classes.filter__controls}>
            <label>
              Sort by Date:
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </label>

            <label>
              Min Total $:
              <input
                type="number"
                min="0"
                value={minTotal}
                onChange={(e) => setMinTotal(Number(e.target.value))}
              />
            </label>

            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>

            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>

            <label>
              Search Product:
              <input
                type="text"
                placeholder="e.g. iPhone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>

          {/* Display orders or messages */}
          {orders.length === 0 ? (
            <div>
              <p>You have no orders yet.</p>
              <a
                href="/"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#f0c14b",
                  border: "1px solid #a88734",
                  textDecoration: "none",
                  color: "#111",
                  borderRadius: "5px",
                  fontWeight: "600",
                }}
              >
                🛒 Place your first order
              </a>
            </div>
          ) : filteredOrders.length === 0 ? (
            <p>No orders match your current filters.</p>
          ) : (
            filteredOrders.map((eachOrder) => (
              <div key={eachOrder.id} className={classes.order__item}>
                <hr />
                <p>
                  <strong>Order ID:</strong> {eachOrder.id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(eachOrder.data.created * 1000).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total:</strong> $
                  {(eachOrder.data.amount / 100).toFixed(2)}
                </p>
                {eachOrder?.data?.basket?.map((product) => (
                  <ProductCard flex={true} product={product} key={product.id} />
                ))}
              </div>
            ))
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
