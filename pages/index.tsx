import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { itemInfo } from "../interface/itemInfo";
import { v4 as uuidv4 } from "uuid";
import Item from "../components/Item";
import Spinner from "../components/Spinner";

export default function Home() {
  const [search, updateSearch] = useState<string | number>("");
  const [results, setResults] = useState<itemInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const url = `https://fast-everglades-41365.herokuapp.com/api/?q=${search}`;

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setLoading(false);
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>

      <main>
        <h1 className={styles.title}>
          Product-<span>Hunt</span>
        </h1>

        <form onSubmit={onSubmit} className="row g-3 mt-2">
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="search"
              value={search}
              onChange={onchange}
              placeholder="Search for product"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Search
            </button>
          </div>
        </form>
      </main>

      <div className="container">
        {loading && results ? (
          <Spinner />
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {results.map((items) => (
              <Item
                key={uuidv4()}
                imageUrl={items.imageUrl}
                name={items.name}
                itemUrl={items.itemUrl}
                price={items.price}
                source={items.source}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
